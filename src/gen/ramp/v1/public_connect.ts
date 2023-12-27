// @generated by protoc-gen-connect-es v1.2.0 with parameter "target=ts"
// @generated from file ramp/v1/public.proto (package ramp.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetAccountInfoRequest, GetAccountInfoResponse, GetBankAccountRequest, GetBankAccountResponse, RemoveAddressRequest, RemoveAddressResponse, SetBankAccountRequest, SetBankAccountResponse, WhitelistAddressRequest, WhitelistAddressResponse } from "./public_pb";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * signature_type is supplied with every request in the header
 * public_key is supplied with every request in the header
 * timestamp is supplied with every request in the header and timestamp is validated as (+-1 minute from now) and used as a salt
 * signature is supplied with every request in the header as sing(request body + salt, private_key) and validated as verify(request body + salt, public_key)
 *
 * @generated from service ramp.v1.RampService
 */
export const RampService = {
  typeName: "ramp.v1.RampService",
  methods: {
    /**
     * @generated from rpc ramp.v1.RampService.GetAccountInfo
     */
    getAccountInfo: {
      name: "GetAccountInfo",
      I: GetAccountInfoRequest,
      O: GetAccountInfoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc ramp.v1.RampService.WhitelistAddress
     */
    whitelistAddress: {
      name: "WhitelistAddress",
      I: WhitelistAddressRequest,
      O: WhitelistAddressResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc ramp.v1.RampService.RemoveAddress
     */
    removeAddress: {
      name: "RemoveAddress",
      I: RemoveAddressRequest,
      O: RemoveAddressResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc ramp.v1.RampService.SetBankAccount
     */
    setBankAccount: {
      name: "SetBankAccount",
      I: SetBankAccountRequest,
      O: SetBankAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc ramp.v1.RampService.GetBankAccount
     */
    getBankAccount: {
      name: "GetBankAccount",
      I: GetBankAccountRequest,
      O: GetBankAccountResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;
