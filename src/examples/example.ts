import { keccak256, toUtf8Bytes, Wallet } from "ethers";
import crypto from "crypto";

import RampClient, { EthereumSignature, Signature } from "../";
import {
  GetAccountInfoRequest,
  Protocol,
  SetBankAccountRequest,
  WhitelistAddressRequest,
} from "../gen/ramp/v1/public_pb";

const privateKey = "0x" + crypto.randomBytes(32).toString("hex");
const wallet = new Wallet(privateKey);

const ramp = new RampClient(
  // note: this is just a placeholder URL for now, not functioning
  "https://dev-api.harborapps-nonprod.link",
  (data): Promise<Signature> => {
    return Promise.resolve({
      signature: wallet.signingKey.sign(keccak256(toUtf8Bytes(data)))
        .serialized,
      publicKey: wallet.signingKey.publicKey,
      ...EthereumSignature,
    });
  },
);

const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest());

await ramp.whitelistAddress(
  new WhitelistAddressRequest({
    protocol: Protocol.ETHEREUM,
    address: wallet.address,
    publicKey: wallet.signingKey.compressedPublicKey,
    name: "My Wallet 1",
    addressSignature: await wallet.signMessage(wallet.address),
  }),
);

await ramp.setBankAccount(
  new SetBankAccountRequest({
    bankAccount: {
      case: "iban",
      value: {
        iban: "",
      },
    },
  }),
);
