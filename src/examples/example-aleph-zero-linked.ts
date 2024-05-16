import crypto from "crypto";
import RampClient, {AlephZeroSignature, CosmosSignature, Signature} from "../";
import {
    GetAccountInfoRequest,
    Protocol,
    SetBankAccountRequest,
    WhitelistAddressRequest
} from "../gen/ramp/v1/public_pb";
import * as process from "node:process";

import {ApiPromise, WsProvider} from '@polkadot/api';
import {Keyring} from '@polkadot/keyring';
import {blake2AsHex, blake2AsU8a, cryptoWaitReady} from '@polkadot/util-crypto';
import * as secp256k1 from "secp256k1";
import {hexToU8a, u8aToHex} from "@polkadot/util";
import {blake2b} from "@polkadot/wasm-crypto";
import {KeyringPair} from "@polkadot/keyring/types";

const mnemonic = "traffic busy scale flight foam book cotton woman shift robust sound swap";


// Wait for the WASM crypto to be ready
await cryptoWaitReady();

const keyring = new Keyring({type: 'sr25519'});

const privateKey = keyring.addFromMnemonic(mnemonic);
const publicKeyHex = u8aToHex(privateKey.publicKey);
const address = keyring.encodeAddress(privateKey.publicKey, 42);

console.log("Public Key Hex: ", publicKeyHex);
console.log("Address: ", address);

const signPayload = (pk: KeyringPair, payload: string): string => {
    console.log("Signing payload: ", payload);
    // Hash the payload using BLAKE2b-256
    const hashedPayload = blake2AsU8a(payload, 256);
    console.log(`Hashed payload: `, u8aToHex(hashedPayload).toString());
    let sig = u8aToHex(pk.sign(hashedPayload))
    console.log("Signature: ", sig);
    return sig;
}

const ramp = new RampClient(
    // note: this is just a placeholder URL for now, not functioning
    "https://dev-api.harborapps-nonprod.link",
    (payload): Promise<Signature> => {
        const sig = signPayload(privateKey, payload);
        return Promise.resolve({
            signature: sig,
            publicKey: publicKeyHex,
            ...AlephZeroSignature,
        });
    },
);

// this will return an actual response with on- and off- ramping details
const activeAccountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());
console.dir(activeAccountInfo, { depth: null });

// The first time a user connects their wallet and selects and address for on-ramping, they need to whitelist their crypto wallet address.
// Since the endpoint is idempotent, you can repeat the action every time, without worrying about "is it already whitelisted" logic,
// or you can implement such logic to optimize network usage, your choice.
console.log("Signing address to demonstrate ownership")
const addressSig = signPayload(privateKey, address)

console.log("Sending whitelist request")
const whitelistResp = await ramp.whitelistAddress(
    new WhitelistAddressRequest({
        protocol: Protocol.ALEPH_ZERO,
        address: address,
        publicKey: publicKeyHex,
        name: "My Aleph Zero Wallet #1",
        addressSignature: addressSig,
    }),
);

console.log("Whitelist response received")
console.dir(whitelistResp, { depth: null });

// One more step is required for off-ramping: the bank account on which the user is supposed to receive funds has to be set
await ramp.setBankAccount(
    new SetBankAccountRequest({
        bankAccount: {
            case: "iban",
            value: {
                iban: "DE44500105178191381683",
            },
        },
    }),
);

// Note: the above only works for EU (EUR) customers, take a look at our proto definitions for a UK (GBP) customer example