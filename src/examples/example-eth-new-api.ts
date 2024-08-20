// In this example we demonstrate how an Ethereum wallet will generate the required signature for redirecting to the Harbour Ramp web app.
// Run me with: npx tsx src/examples/example-eth-new-api.ts

import {keccak256, Wallet} from "ethers";

import {AuthClient} from "../";
import {
    AuthenticateWalletRequest,
    AuthenticateWalletRequest_HashingAlgo,
    AuthenticateWalletRequest_PublicKeyType
} from "../gen/auth/v1/public_pb";

const mnemonic = "smooth clump orphan else enjoy blue legend panda waste weapon wire aunt"
const wallet = Wallet.fromPhrase(mnemonic);

console.log("Private key (hex): ", wallet.signingKey.privateKey);
console.log("Public key (hex): ", wallet.signingKey.publicKey);

const signPayload = (payload: Uint8Array): string => {
    const hashed = keccak256(payload);
    console.log("Hashed payload: ", hashed);
    const sig = wallet.signingKey.sign(hashed).serialized;
    console.log("Signature: ", sig);
    return sig;
}

const auth = new AuthClient("https://dev-api.harborapps-nonprod.link");

// The first time a user connects their wallet and selects and address for on-ramping, they need to whitelist their crypto wallet address.
// Since the endpoint is idempotent, you can repeat the action every time, without worrying about "is it already whitelisted" logic,
// or you can implement such logic to optimize network usage, your choice.
const pkBytes = hexToBinary(wallet.signingKey.publicKey);
const timestamp = new Date().getTime();
const timestampBytes = new TextEncoder().encode(timestamp.toString());
const payload = new Uint8Array(pkBytes.length + timestampBytes.length);
payload.set(pkBytes, 0);
payload.set(timestampBytes, pkBytes.length);
const signature = signPayload(payload);

console.log("Sending whitelist request")
console.log("Timestamp: ", timestamp);

const whitelistResp = await auth.authenticateWallet(
    new AuthenticateWalletRequest({
        publicKey: hexToBinary(wallet.signingKey.publicKey),
        publicKeyType: AuthenticateWalletRequest_PublicKeyType.SECP256K1,
        hashingAlgo: AuthenticateWalletRequest_HashingAlgo.KECCAK256,
        signature: hexToBinary(signature),
        timestamp: BigInt(timestamp)
    }),
);

console.log("Auth wallet response received")
console.dir(whitelistResp, {depth: null});

function hexToBinary(hexString: string): Uint8Array {
    // Remove '0x' prefix if present
    const hex = hexString.toLowerCase().startsWith('0x') ? hexString.slice(2) : hexString;

    // Convert the hex string to a Uint8Array
    return new Uint8Array(hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
}

function hexToBase64(hexString: string): string {
    return Buffer.from(hexToBinary(hexString)).toString('base64');
}

function base64ToBinary(base64String: string): Uint8Array { // unused here, but useful for other cases
    return Uint8Array.from(Buffer.from(base64String, 'base64'));
}