// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file openbanking/v1/public.proto (package openbanking.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message openbanking.v1.PingRequest
 */
export class PingRequest extends Message<PingRequest> {
  constructor(data?: PartialMessage<PingRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.PingRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => []);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): PingRequest {
    return new PingRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): PingRequest {
    return new PingRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): PingRequest {
    return new PingRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a: PingRequest | PlainMessage<PingRequest> | undefined,
    b: PingRequest | PlainMessage<PingRequest> | undefined
  ): boolean {
    return proto3.util.equals(PingRequest, a, b);
  }
}

/**
 * @generated from message openbanking.v1.PingResponse
 */
export class PingResponse extends Message<PingResponse> {
  /**
   * @generated from field: string message = 10;
   */
  message = "";

  constructor(data?: PartialMessage<PingResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.PingResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 10, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): PingResponse {
    return new PingResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): PingResponse {
    return new PingResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): PingResponse {
    return new PingResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a: PingResponse | PlainMessage<PingResponse> | undefined,
    b: PingResponse | PlainMessage<PingResponse> | undefined
  ): boolean {
    return proto3.util.equals(PingResponse, a, b);
  }
}

/**
 * @generated from message openbanking.v1.GetConsentsRequest
 */
export class GetConsentsRequest extends Message<GetConsentsRequest> {
  /**
   * @generated from field: string user_id = 10;
   */
  userId = "";

  constructor(data?: PartialMessage<GetConsentsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.GetConsentsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 10, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): GetConsentsRequest {
    return new GetConsentsRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): GetConsentsRequest {
    return new GetConsentsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): GetConsentsRequest {
    return new GetConsentsRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a: GetConsentsRequest | PlainMessage<GetConsentsRequest> | undefined,
    b: GetConsentsRequest | PlainMessage<GetConsentsRequest> | undefined
  ): boolean {
    return proto3.util.equals(GetConsentsRequest, a, b);
  }
}

/**
 * @generated from message openbanking.v1.GetConsentsResponse
 */
export class GetConsentsResponse extends Message<GetConsentsResponse> {
  /**
   * @generated from field: repeated openbanking.v1.GetConsentsResponse.Consent consents = 10;
   */
  consents: GetConsentsResponse_Consent[] = [];

  constructor(data?: PartialMessage<GetConsentsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.GetConsentsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 10,
      name: "consents",
      kind: "message",
      T: GetConsentsResponse_Consent,
      repeated: true,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): GetConsentsResponse {
    return new GetConsentsResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): GetConsentsResponse {
    return new GetConsentsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): GetConsentsResponse {
    return new GetConsentsResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a: GetConsentsResponse | PlainMessage<GetConsentsResponse> | undefined,
    b: GetConsentsResponse | PlainMessage<GetConsentsResponse> | undefined
  ): boolean {
    return proto3.util.equals(GetConsentsResponse, a, b);
  }
}

/**
 * @generated from message openbanking.v1.GetConsentsResponse.Consent
 */
export class GetConsentsResponse_Consent extends Message<GetConsentsResponse_Consent> {
  /**
   * @generated from field: string id = 10;
   */
  id = "";

  /**
   * @generated from field: string user_id = 20;
   */
  userId = "";

  /**
   * note: this field is probably unnecessary to the client, as it's always authorised
   *
   * @generated from field: string status = 30;
   */
  status = "";

  /**
   * name of the TTP
   *
   * @generated from field: string name = 40;
   */
  name = "";

  /**
   * @generated from field: google.protobuf.Timestamp created_at = 50;
   */
  createdAt?: Timestamp;

  /**
   * always null for UK Open Banking, there's no expiry
   *
   * @generated from field: optional google.protobuf.Timestamp expires_at = 60;
   */
  expiresAt?: Timestamp;

  /**
   * eg: ["ReadAccountsBasic", "ReadAccountsDetail", ...]
   *
   * @generated from field: repeated string permissions = 70;
   */
  permissions: string[] = [];

  /**
   * @generated from field: repeated openbanking.v1.GetConsentsResponse.Account accounts = 80;
   */
  accounts: GetConsentsResponse_Account[] = [];

  constructor(data?: PartialMessage<GetConsentsResponse_Consent>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.GetConsentsResponse.Consent";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 10, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 20, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 30, name: "status", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 40, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 50, name: "created_at", kind: "message", T: Timestamp },
    { no: 60, name: "expires_at", kind: "message", T: Timestamp, opt: true },
    {
      no: 70,
      name: "permissions",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
      repeated: true,
    },
    {
      no: 80,
      name: "accounts",
      kind: "message",
      T: GetConsentsResponse_Account,
      repeated: true,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): GetConsentsResponse_Consent {
    return new GetConsentsResponse_Consent().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): GetConsentsResponse_Consent {
    return new GetConsentsResponse_Consent().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): GetConsentsResponse_Consent {
    return new GetConsentsResponse_Consent().fromJsonString(
      jsonString,
      options
    );
  }

  static equals(
    a:
      | GetConsentsResponse_Consent
      | PlainMessage<GetConsentsResponse_Consent>
      | undefined,
    b:
      | GetConsentsResponse_Consent
      | PlainMessage<GetConsentsResponse_Consent>
      | undefined
  ): boolean {
    return proto3.util.equals(GetConsentsResponse_Consent, a, b);
  }
}

/**
 * @generated from message openbanking.v1.GetConsentsResponse.Account
 */
export class GetConsentsResponse_Account extends Message<GetConsentsResponse_Account> {
  /**
   * the client can use this to match local storage and show account coordinates
   *
   * @generated from field: string account_id = 10;
   */
  accountId = "";

  /**
   * eg: GBP account
   *
   * @generated from field: string account_name = 20;
   */
  accountName = "";

  constructor(data?: PartialMessage<GetConsentsResponse_Account>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.GetConsentsResponse.Account";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 10,
      name: "account_id",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
    {
      no: 20,
      name: "account_name",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): GetConsentsResponse_Account {
    return new GetConsentsResponse_Account().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): GetConsentsResponse_Account {
    return new GetConsentsResponse_Account().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): GetConsentsResponse_Account {
    return new GetConsentsResponse_Account().fromJsonString(
      jsonString,
      options
    );
  }

  static equals(
    a:
      | GetConsentsResponse_Account
      | PlainMessage<GetConsentsResponse_Account>
      | undefined,
    b:
      | GetConsentsResponse_Account
      | PlainMessage<GetConsentsResponse_Account>
      | undefined
  ): boolean {
    return proto3.util.equals(GetConsentsResponse_Account, a, b);
  }
}

/**
 * @generated from message openbanking.v1.RevokeConsentRequest
 */
export class RevokeConsentRequest extends Message<RevokeConsentRequest> {
  /**
   * @generated from field: string user_id = 10;
   */
  userId = "";

  /**
   * @generated from field: string consent_id = 20;
   */
  consentId = "";

  constructor(data?: PartialMessage<RevokeConsentRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.RevokeConsentRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 10, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    {
      no: 20,
      name: "consent_id",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): RevokeConsentRequest {
    return new RevokeConsentRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): RevokeConsentRequest {
    return new RevokeConsentRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): RevokeConsentRequest {
    return new RevokeConsentRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a: RevokeConsentRequest | PlainMessage<RevokeConsentRequest> | undefined,
    b: RevokeConsentRequest | PlainMessage<RevokeConsentRequest> | undefined
  ): boolean {
    return proto3.util.equals(RevokeConsentRequest, a, b);
  }
}

/**
 * @generated from message openbanking.v1.RevokeConsentResponse
 */
export class RevokeConsentResponse extends Message<RevokeConsentResponse> {
  constructor(data?: PartialMessage<RevokeConsentResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.RevokeConsentResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => []);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): RevokeConsentResponse {
    return new RevokeConsentResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): RevokeConsentResponse {
    return new RevokeConsentResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): RevokeConsentResponse {
    return new RevokeConsentResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a: RevokeConsentResponse | PlainMessage<RevokeConsentResponse> | undefined,
    b: RevokeConsentResponse | PlainMessage<RevokeConsentResponse> | undefined
  ): boolean {
    return proto3.util.equals(RevokeConsentResponse, a, b);
  }
}

/**
 * @generated from message openbanking.v1.ConfirmAuthRequest
 */
export class ConfirmAuthRequest extends Message<ConfirmAuthRequest> {
  /**
   * @generated from field: string user_id = 10;
   */
  userId = "";

  /**
   * Secret id from the push notification you received at the start of the auth flow
   *
   * @generated from field: string secret_id = 20;
   */
  secretId = "";

  /**
   * Secret value from the push notification you received at the start of the auth flow
   *
   * @generated from field: string secret = 30;
   */
  secret = "";

  /**
   * standard jwt with vendor_device_id claim and strict expiry, same as when authenticating
   * note: if this is built incorrectly you'll get a grpc code invalid argument
   *
   * @generated from field: string signature = 40;
   */
  signature = "";

  constructor(data?: PartialMessage<ConfirmAuthRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.ConfirmAuthRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 10, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 20, name: "secret_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 30, name: "secret", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 40, name: "signature", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): ConfirmAuthRequest {
    return new ConfirmAuthRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): ConfirmAuthRequest {
    return new ConfirmAuthRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): ConfirmAuthRequest {
    return new ConfirmAuthRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a: ConfirmAuthRequest | PlainMessage<ConfirmAuthRequest> | undefined,
    b: ConfirmAuthRequest | PlainMessage<ConfirmAuthRequest> | undefined
  ): boolean {
    return proto3.util.equals(ConfirmAuthRequest, a, b);
  }
}

/**
 * @generated from message openbanking.v1.ConfirmAuthResponse
 */
export class ConfirmAuthResponse extends Message<ConfirmAuthResponse> {
  /**
   * @generated from oneof openbanking.v1.ConfirmAuthResponse.result
   */
  result:
    | {
        /**
         * @generated from field: openbanking.v1.ConfirmAuthResponse.Error error = 10;
         */
        value: ConfirmAuthResponse_Error;
        case: "error";
      }
    | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<ConfirmAuthResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.ConfirmAuthResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 10,
      name: "error",
      kind: "enum",
      T: proto3.getEnumType(ConfirmAuthResponse_Error),
      oneof: "result",
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): ConfirmAuthResponse {
    return new ConfirmAuthResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): ConfirmAuthResponse {
    return new ConfirmAuthResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): ConfirmAuthResponse {
    return new ConfirmAuthResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a: ConfirmAuthResponse | PlainMessage<ConfirmAuthResponse> | undefined,
    b: ConfirmAuthResponse | PlainMessage<ConfirmAuthResponse> | undefined
  ): boolean {
    return proto3.util.equals(ConfirmAuthResponse, a, b);
  }
}

/**
 * @generated from enum openbanking.v1.ConfirmAuthResponse.Error
 */
export enum ConfirmAuthResponse_Error {
  /**
   * @generated from enum value: ERROR_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * secret is expired
   *
   * @generated from enum value: ERROR_EXPIRED = 1;
   */
  EXPIRED = 1,
}
// Retrieve enum metadata with: proto3.getEnumType(ConfirmAuthResponse_Error)
proto3.util.setEnumType(
  ConfirmAuthResponse_Error,
  "openbanking.v1.ConfirmAuthResponse.Error",
  [
    { no: 0, name: "ERROR_UNSPECIFIED" },
    { no: 1, name: "ERROR_EXPIRED" },
  ]
);

/**
 * @generated from message openbanking.v1.RejectAuthRequest
 */
export class RejectAuthRequest extends Message<RejectAuthRequest> {
  /**
   * @generated from field: string user_id = 10;
   */
  userId = "";

  /**
   * Secret id from the push notification you received at the start of the auth flow
   *
   * @generated from field: string secret_id = 20;
   */
  secretId = "";

  /**
   * Secret value from the push notification you received at the start of the auth flow
   *
   * @generated from field: string secret = 30;
   */
  secret = "";

  constructor(data?: PartialMessage<RejectAuthRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.RejectAuthRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 10, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 20, name: "secret_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 30, name: "secret", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): RejectAuthRequest {
    return new RejectAuthRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): RejectAuthRequest {
    return new RejectAuthRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): RejectAuthRequest {
    return new RejectAuthRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a: RejectAuthRequest | PlainMessage<RejectAuthRequest> | undefined,
    b: RejectAuthRequest | PlainMessage<RejectAuthRequest> | undefined
  ): boolean {
    return proto3.util.equals(RejectAuthRequest, a, b);
  }
}

/**
 * @generated from message openbanking.v1.RejectAuthResponse
 */
export class RejectAuthResponse extends Message<RejectAuthResponse> {
  constructor(data?: PartialMessage<RejectAuthResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "openbanking.v1.RejectAuthResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => []);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): RejectAuthResponse {
    return new RejectAuthResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): RejectAuthResponse {
    return new RejectAuthResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): RejectAuthResponse {
    return new RejectAuthResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a: RejectAuthResponse | PlainMessage<RejectAuthResponse> | undefined,
    b: RejectAuthResponse | PlainMessage<RejectAuthResponse> | undefined
  ): boolean {
    return proto3.util.equals(RejectAuthResponse, a, b);
  }
}