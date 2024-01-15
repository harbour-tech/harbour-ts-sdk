import {createPromiseClient, PromiseClient} from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { RampService } from "./gen/ramp/v1/public_connect";

import {
  GetAccountInfoRequest,
  WhitelistAddressRequest,
  RemoveAddressRequest,
  SetBankAccountRequest,
  GetAccountInfoResponse,
  WhitelistAddressResponse,
  RemoveAddressResponse,
  SetBankAccountResponse,
} from './gen/ramp/v1/public_pb';
import {PartialMessage} from "@bufbuild/protobuf";

export class RampClient {
  public client: PromiseClient<typeof RampService>;

  constructor(
    endpoint: string,
    signatureType: string,
    encoding: string,
    signer: SignerFunction) {

    //TODO: not implemented yet
    const fetchWithSignature: typeof globalThis.fetch = async (r, init) => {
      if (!(init?.body instanceof Uint8Array)) {
        throw "unsupported body type"
      }
      const bodyText = new TextDecoder().decode(init.body);
      const timestamp = Date.now().toString();
      const data = bodyText + timestamp
      const signature = await signer(data)

      const headers = new Headers(init?.headers);
      headers.append("X-Signature", signature.signature);
      headers.append("X-Signature-Type", signatureType);
      headers.append("X-Signature-PublicKey", signature.publicKey);
      headers.append("X-Encoding", encoding);
      headers.append("X-Signature-Timestamp", timestamp);

      const modifiedInit: RequestInit = { ...init, headers };
      return fetch(r, modifiedInit)
    }

    const transport = createConnectTransport({
      baseUrl: endpoint,
      fetch: fetchWithSignature,
    });
    this.client = createPromiseClient(RampService, transport);
  }

  public async getAccountInfo(request: PartialMessage<GetAccountInfoRequest>): Promise<GetAccountInfoResponse> {
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

export interface Signature {
  signature: string
  publicKey: string
}
export type SignerFunction = (data: string) => Promise<Signature>;
