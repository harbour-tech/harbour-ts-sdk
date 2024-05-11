import crypto from "crypto";
import * as cosmos from '@cosmostation/cosmosjs';
// import * as bip39 from 'bip39';
import * as secp256k1 from 'secp256k1';

import RampClient, {CosmosSignature, Signature} from "../";
import {GetAccountInfoRequest,} from "../gen/ramp/v1/public_pb";

// const mnemonic = bip39.generateMnemonic();
// console.log("Mnemonic: ", mnemonic);
const mnemonic = "embody scale sign mutual whisper heavy umbrella capital rookie group glad wrap";

const c = new cosmos.Cosmos("https://lcd-cosmos-free.cosmostation.io", "cosmoshub-3");
const privateKey = c.getECPairPriv(mnemonic);
const publicKey = c.getPubKey(privateKey).toString('base64');
const address = c.getAddress(mnemonic);

console.log("Private Key: ", privateKey.toString('base64'));
console.log("Public Key: ", publicKey);
console.log("Address: ", address);

const signPayload = (payload: string): string => {
    console.log("Signing payload: ", payload);
    const hashed = crypto.createHash('sha256').update(payload).digest();
    console.log("Hashed payload: ", hashed.toString('base64'));
    const sig = secp256k1.default.sign(hashed, privateKey).signature.toString('base64');
    console.log("Signature: ", sig);
    return sig;
}
// Note: you can set up unit tests to verify your own code
// given the above mnemonic, if you try signing the payload {}123 you should get the following signature in base64:
// base64 encoded: LAHlnUjzL2WagqHvMddoW6+5AKlzG1x+FjGMIFmjJRciSPYieyRZYagK6VThUYPdiQNKhZhaX9BPTzPfL7A1qw==
// That happens when signing the correct SHA256 digest of {}123, which is expected to be:
// 6pi72sSk4db1+rRfYf17HhMjqWflav1oLN3xEzkHj/k=
// Uncomment to try it with our code:
//signPayload("{}123")

const ramp = new RampClient(
    // note: this is just a placeholder URL for now, not functioning
    "https://dev-api.harborapps-nonprod.link",
    (payload): Promise<Signature> => {
        const sig = signPayload(payload);
        return Promise.resolve({
            signature: sig,
            publicKey: publicKey,
            ...CosmosSignature,
        });
    },
);

const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());
console.log(accountInfo);

// TODO: continue with Cosmos whitelist implementation
//
// await ramp.whitelistAddress(
//   new WhitelistAddressRequest({
//     protocol: Protocol.ETHEREUM,
//     address: wallet.address,
//     publicKey: wallet.signingKey.compressedPublicKey,
//     name: "My Wallet 1",
//     addressSignature: await wallet.signMessage(wallet.address),
//   }),
// );
//
// await ramp.setBankAccount(
//   new SetBankAccountRequest({
//     bankAccount: {
//       case: "iban",
//       value: {
//         iban: "",
//       },
//     },
//   }),
// );
