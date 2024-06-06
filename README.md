# Harbour Typescript SDK

## Flow Diagram

https://www.figma.com/design/dw4ygEpoyyVBCn27ZH7XvP/Harbour-Wallet-Integration?node-id=0-1&t=cMGSCUtJcd5rVOMk-0

## Usage of SDK

1. Copy `src/index.ts` and `src/gen/**` to you project
2. Look into example of usage below or, for more sophisticated examples, in the `examples/` folder

## Example

Example of SDK initialization and usage

```Typscript
import {Wallet} from 'ethers';
import crypto from 'crypto';

import Ramp from '.'
import {GetAccountInfoRequest, Ecosystem, SignatureType, WhitelistAddressRequest} from "./gen/ramp/v1/public_pb";

const privateKey = "0x"+crypto.randomBytes(32).toString('hex');
const wallet = new Wallet(privateKey);

const ramp = new Ramp(
  "https://...",
  SignatureType.SECP256K1,
  wallet.signingKey.publicKey,
  wallet.signMessage
)

const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest())

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

## Supported regions

We support onboarding customers from any country of the European Union:

- Austria (AT)
- Belgium (BE)
- Bulgaria (BG)
- Croatia (HR)
- Cyprus (CY)
- Czech Republic (CZ)
- Denmark (DK)
- Estonia (EE)
- Finland (FI)
- France (FR)
- Germany (DE)
- Greece (GR)
- Hungary (HU)
- Ireland (IE)
- Italy (IT)
- Latvia (LV)
- Lithuania (LT)
- Luxembourg (LU)
- Malta (MT)
- Netherlands (NL)
- Poland (PL)
- Portugal (PT)
- Romania (RO)
- Slovakia (SK)
- Slovenia (SI)
- Spain (ES)
- Sweden (SE)

## Supported tokens

We support on- and off-ramping of the following tokens:

#### Dev API

- USDC on Avalanche Fuji C-Chain Testnet (`0x5425890298aed601595a70AB815c96711a31Bc65`)
- USDC on Ethereum Sepolia Testnet (`0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`)

#### Production API

- USDC on Ethereum Mainnet (`0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`)
- USDC on Avalanche Mainnet C-Chain (`0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e`)
- USDC on Polygon Mainnet (`0x3c499c542cef5e3811e1192ce70d8cc03d5c3359`)

Coming soon: axlUSDC on Terra, and potentially other Cosmos family chains.
