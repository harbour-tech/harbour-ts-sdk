# harbour-ts-sdk

## Flow Diagram
![Flow](docs/ramp-api.png)

## Usage of SDK

1. Make sure following dependencies are installed:
    ```shell
    npm install @bufbuild/protobuf @connectrpc/connect @connectrpc/connect-web
    ```
2. Copy `src/index.ts` and `src/gen/**` to you project
3. Look into example of usage below or in the `examples/example.ts`

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

await ramp.whitelistAddress(new WhitelistAddressRequest({
  ecosystem: Ecosystem.ETHEREUM,
  address: wallet.address,
  name: "My Wallet 1",
}), wallet.signMessage )
```

Use following endpoints:
- TBD

TODO: squash commits to avoid exposing full proto publicly from first commit