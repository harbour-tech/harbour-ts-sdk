// In this example we demonstrate how an Ethereum wallet not yet linked to any user will generate a response with the onboarding URL
// Run me with: npx tsx src/examples/example-eth-linked.ts

import {keccak256, toUtf8Bytes, Wallet} from "ethers";

import {AuthClient} from "../";
import {
    AuthenticateWalletRequest,
    AuthenticateWalletRequest_HashingAlgo,
    AuthenticateWalletRequest_PublicKeyType
} from "../gen/auth/v1/public_pb";

const mnemonic = "smooth clump orphan else enjoy blue legend panda waste weapon wire aunt"
const wallet = Wallet.fromPhrase(mnemonic);
const compressedPubKey = wallet.signingKey.compressedPublicKey;

console.log("Private key: ", wallet.signingKey.privateKey);
console.log("Public key: ", wallet.signingKey.publicKey);
console.log("Public key compressed: ", compressedPubKey);
console.log("Address: ", wallet.address);

const signPayload = (payload: Uint8Array): string => {
    console.log("Signing payload: ", payload);
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
const pkPayload = hexToBinary(wallet.signingKey.publicKey);
const signature = signPayload(pkPayload);

console.log("Sending whitelist request")
console.log("Public key: ", hexToBase64(wallet.signingKey.publicKey));
console.log("Signature: ", hexToBase64(signature));
const whitelistResp = await auth.authenticateWallet(
    new AuthenticateWalletRequest({
        publicKey: hexToBinary(wallet.signingKey.publicKey),
        publicKeyType: AuthenticateWalletRequest_PublicKeyType.SECP256K1,
        hashingAlgo: AuthenticateWalletRequest_HashingAlgo.KECCAK256,
        signature: hexToBinary(signature),
    }),
);

console.log("Auth wallet response received")
console.dir(whitelistResp, {depth: null});

function hexToBinary(hexString: string): Uint8Array {
    // Remove '0x' prefix if present
    const hex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;

    // Convert the hex string to a Uint8Array
    return new Uint8Array(hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
}

function hexToBase64(hexString: string): string {
    // Remove '0x' prefix if present
    const hex = hexString.startsWith('0x') ? hexString.slice(2) : hexString;

    // Convert the hex string to a Uint8Array
    const bytes = new Uint8Array(hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);

    // Convert the Uint8Array to a Base64 string
    return Buffer.from(bytes).toString('base64');
}