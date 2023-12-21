import {createPromiseClient, PromiseClient} from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { RampService } from "gen/ramp/v1/public_connect";

import {
  GetAccountInfoRequest,
  WhitelistAddressRequest,
  RemoveAddressRequest,
  SetBankAccountRequest,
  GetAccountInfoResponse,
  WhitelistAddressResponse,
  RemoveAddressResponse,
  SetBankAccountResponse,
  SignatureType
} from 'gen/ramp/v1/public_pb';

export class RampClient {
  private client: PromiseClient<typeof RampService>;

  // Harbour endpoint url
  // signer callback to sign message body
  private signatureType: SignatureType;
  private publicKey: any;

  constructor(
    endpoint: string,
    signatureType: SignatureType,
    publicKey: any/*TODO: needs to be clarified*/,
    signer: (body: Uint8Array /*TODO: needs to be clarified*/) => Promise<string>) {
    this.signatureType = signatureType;
    this.publicKey = publicKey;

    //TODO: not implemented yet
    const fetchWithSignature: typeof globalThis.fetch = (r, i) => {
      const signature = signer(new Uint8Array())
      //TODO: add necessary headers: signatureType, publicKey, signature
      return fetch(r, i)
    }

    const transport = createConnectTransport({
      baseUrl: endpoint,
      fetch: fetchWithSignature,
    });
    this.client = createPromiseClient(RampService, transport);
  }

  public async getAccountInfo(request: GetAccountInfoRequest): Promise<GetAccountInfoResponse> {
    return this.client.getAccountInfo(request);
  }

  public async whitelistAddress(request: WhitelistAddressRequest, signer: (address: string) => Promise<string>): Promise<WhitelistAddressResponse> {
    const signature = await signer(request.address)

    if (!signature) {
      throw "signature is required"
    }
    // TODO: may be validate signature?

    request.addressSignature = signature;
    return this.client.whitelistAddress(request);
  }

  public async removeAddress(request: RemoveAddressRequest): Promise<RemoveAddressResponse> {
    return this.client.removeAddress(request);
  }

  public async setBankAccount(request: SetBankAccountRequest): Promise<SetBankAccountResponse> {
    return this.client.setBankAccount(request);
  }
}

export default RampClient;