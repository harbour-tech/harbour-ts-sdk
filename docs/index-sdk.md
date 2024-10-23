# Harbour Typescript SDK

## Flow Diagram

https://www.figma.com/design/dw4ygEpoyyVBCn27ZH7XvP/Harbour-Wallet-Integration?node-id=0-1&t=cMGSCUtJcd5rVOMk-0

## Usage of SDK

1. Copy `src/index.ts` and `src/gen/**` into your project
2. Look into example of usage below or, for more sophisticated examples, in the `examples/` folder

Dev API: https://dev-api.harborapps-nonprod.link
Prod API: https://api.harborapp.link


## Example

Example of SDK initialization and usage

```Typscript
import {Wallet} from 'ethers';
import crypto from 'crypto';

import RampCLient, { EthereumSignature, Signature } from '.'
import {GetAccountInfoRequest, Ecosystem, SignatureType, WhitelistAddressRequest} from "./gen/ramp/v1/public_pb";

const privateKey = "0x"+crypto.randomBytes(32).toString('hex');
const wallet = new Wallet(privateKey);

const signPayload = (payload: string): string => {
    const hashed = keccak256(toUtf8Bytes(payload));
    const sig = wallet.signingKey.sign(hashed).serialized;
    return sig;
}

const ramp = new RampCLient(
  "https://dev-api.harborapps-nonprod.link",
  (payload): Promise<Signature> => {
    const sig = signPayload(payload);
    return Promise.resolve({
      signature: sig,
      publicKey: wallet.signingKey.publicKey,
      ...EthereumSignature,
    });
  },
)

// Get general account info and list of whitelisted wallets 
const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest())

// Get supported assets and blockchains
const assetsResponse = ramp.getAssets(new GetAssetsRequest({fiatAssetId: CurrencyId.EUR}));

// Get whitelisted wallets. On and Off ramp can be done only to and from whitelisted wallets 
await ramp.whitelistAddress(
  new WhitelistAddressRequest({
    protocol: Protocol.ETHEREUM,
    address: wallet.address,
    publicKey: wallet.signingKey.compressedPublicKey,
    name: "My Wallet 1",
    addressSignature: await wallet.signMessage(wallet.address),
  }),
);
```

### List of supported countries and payment methods
List of supported countries can be found [here](./countries-payments.md)