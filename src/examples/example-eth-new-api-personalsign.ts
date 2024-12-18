// In this example we demonstrate how an Ethereum wallet can generate the required signature for redirecting to
// the Harbour Ramp web app, through Ethereum's personal_sign method.
// Run me with: npx tsx src/examples/example-eth-new-api-personalsign.ts

import {Wallet} from "ethers";

import {AuthClient} from "../";
import {AuthenticateWalletRequest_HashingAlgo, AuthenticateWalletRequest_PublicKeyType} from "../gen/auth/v1/public_pb";

const mnemonic = "smooth clump orphan else enjoy blue legend panda waste weapon wire aunt"
const wallet = Wallet.fromPhrase(mnemonic);

console.log("Private key (hex): ", wallet.signingKey.privateKey);
console.log("Public key (hex): ", wallet.signingKey.publicKey);

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
const signature = await wallet.signMessage(payload);

console.log("Sending auth wallet request")
console.log("Signature: ", signature);
console.log("Timestamp: ", timestamp);

const authResp = await auth.authenticateWallet({
  publicKey: hexToBinary(wallet.signingKey.publicKey),
  publicKeyType: AuthenticateWalletRequest_PublicKeyType.SECP256K1,
  hashingAlgo: AuthenticateWalletRequest_HashingAlgo.ETHEREUM,
  signature: hexToBinary(signature),
  timestamp: BigInt(timestamp)
});

console.log("Auth wallet response received")
console.dir(authResp, {depth: null});

function hexToBinary(hexString: string): Uint8Array {
  // Remove '0x' prefix if present
  const hex = hexString.toLowerCase().startsWith('0x') ? hexString.slice(2) : hexString;

  // Convert the hex string to a Uint8Array
  return new Uint8Array(hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
}
