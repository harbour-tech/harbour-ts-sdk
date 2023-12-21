import {Wallet} from 'ethers';
import crypto from 'crypto';

import RampClient from '../'
import {
  GetAccountInfoRequest,
  Network,
  SetBankAccountRequest,
  SignatureType,
  WhitelistAddressRequest
} from "../gen/ramp/v1/public_pb";

const privateKey = "0x"+crypto.randomBytes(32).toString('hex');
const wallet = new Wallet(privateKey);

const ramp = new RampClient(
  "https://dev-api.harborapps-nonprod.link",
  SignatureType.SECP256K1,
  wallet.signingKey.publicKey,
  wallet.signMessage
)

const accountInfo = await ramp.getAccountInfo(new GetAccountInfoRequest())

await ramp.whitelistAddress(new WhitelistAddressRequest({
  network: Network.ETHEREUM,
  address: wallet.address,
  name: "My Wallet 1",
}), wallet.signMessage )

await ramp.setBankAccount(new SetBankAccountRequest({
  bankAccount : {
    case: "iban",
    value: {
      iban: "",
    }
  }
}))