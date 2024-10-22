// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file ramp/v1/public.proto (package ramp.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import {
  EstimateOffRampFeeRequest,
  EstimateOffRampFeeResponse,
  EstimateOnRampFeeRequest,
  EstimateOnRampFeeResponse,
  GetAccountInfoRequest,
  GetAccountInfoResponse,
  GetAssetsRequest,
  GetAssetsResponse,
  GetRampsRequest,
  GetRampsResponse,
  PingRequest,
  PingResponse,
  RemoveAddressRequest,
  RemoveAddressResponse,
  SetBankAccountRequest,
  SetBankAccountResponse,
  WhitelistAddressRequest,
  WhitelistAddressResponse
} from "./public_pb";
import {MethodKind} from "@bufbuild/protobuf";

/**
 * @generated from service ramp.v1.PingService
 */
export const PingService = {
  typeName: "ramp.v1.PingService",
  methods: {
    /**
     * @generated from rpc ramp.v1.PingService.Ping
     */
    ping: {
      name: "Ping",
      I: PingRequest,
      O: PingResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

/**
 * All the RPCs in this service require the authentication headers, except the ones for estimating fees.
 *
 * @generated from service ramp.v1.RampService
 */
export const RampService = {
  typeName: "ramp.v1.RampService",
  methods: {
    /**
     * Returns account information. If result in the response is of type authentication then user should be
     * authenticated (onboarded or logged in). Authentication URL is provided in the result.
     *
     * @generated from rpc ramp.v1.RampService.GetAccountInfo
     */
    getAccountInfo: {
      name: "GetAccountInfo",
      I: GetAccountInfoRequest,
      O: GetAccountInfoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Whitelists address. Crypto assets can only be on-ramped to address which belongs to the user.
     * In order to proof address belongs to the user, address need to be signed with private key of this address.
     *
     * @generated from rpc ramp.v1.RampService.WhitelistAddress
     */
    whitelistAddress: {
      name: "WhitelistAddress",
      I: WhitelistAddressRequest,
      O: WhitelistAddressResponse,
      kind: MethodKind.Unary,
    },
    /**
     *  Removes whitelisted address
     *
     * @generated from rpc ramp.v1.RampService.RemoveAddress
     */
    removeAddress: {
      name: "RemoveAddress",
      I: RemoveAddressRequest,
      O: RemoveAddressResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Sets a bank account for the off ramp
     *
     * @generated from rpc ramp.v1.RampService.SetBankAccount
     */
    setBankAccount: {
      name: "SetBankAccount",
      I: SetBankAccountRequest,
      O: SetBankAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc ramp.v1.RampService.GetRamps
     */
    getRamps: {
      name: "GetRamps",
      I: GetRampsRequest,
      O: GetRampsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Authentication headers are not required for these RPCs.
     *
     * @generated from rpc ramp.v1.RampService.EstimateOnRampFee
     */
    estimateOnRampFee: {
      name: "EstimateOnRampFee",
      I: EstimateOnRampFeeRequest,
      O: EstimateOnRampFeeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc ramp.v1.RampService.EstimateOffRampFee
     */
    estimateOffRampFee: {
      name: "EstimateOffRampFee",
      I: EstimateOffRampFeeRequest,
      O: EstimateOffRampFeeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc ramp.v1.RampService.GetAssets
     */
    getAssets: {
      name: "GetAssets",
      I: GetAssetsRequest,
      O: GetAssetsResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

