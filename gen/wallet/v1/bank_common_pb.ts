// @generated by protoc-gen-es v1.4.2 with parameter "target=ts"
// @generated from file wallet/v1/bank_common.proto (package wallet.v1, syntax proto3)
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
import { Empty, Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum wallet.v1.BankPaymentRoute
 */
export enum BankPaymentRoute {
  /**
   * Unspecified for payments that didn't go through any route, as they were internal to Harbour
   * For example, a transfer between two users, a currency exchange, a fee or a balance adjustment.
   *
   * @generated from enum value: BANK_PAYMENT_ROUTE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: BANK_PAYMENT_ROUTE_UK_DOMESTIC = 10;
   */
  UK_DOMESTIC = 10,

  /**
   * @generated from enum value: BANK_PAYMENT_ROUTE_SEPA = 20;
   */
  SEPA = 20,

  /**
   * @generated from enum value: BANK_PAYMENT_ROUTE_SWIFT = 30;
   */
  SWIFT = 30,
}
// Retrieve enum metadata with: proto3.getEnumType(BankPaymentRoute)
proto3.util.setEnumType(BankPaymentRoute, "wallet.v1.BankPaymentRoute", [
  { no: 0, name: "BANK_PAYMENT_ROUTE_UNSPECIFIED" },
  { no: 10, name: "BANK_PAYMENT_ROUTE_UK_DOMESTIC" },
  { no: 20, name: "BANK_PAYMENT_ROUTE_SEPA" },
  { no: 30, name: "BANK_PAYMENT_ROUTE_SWIFT" },
]);

/**
 * Used for GBP payments within the UK
 *
 * @generated from enum wallet.v1.DomesticUkPaymentScheme
 */
export enum DomesticUkPaymentScheme {
  /**
   * @generated from enum value: DOMESTIC_UK_PAYMENT_SCHEME_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Bankers' Automated Clearing Services
   * https://www.bacs.co.uk/
   * Old way of doing bank payments, still used as underlying technology for Direct Debits
   * Takes days to clear
   *
   * @generated from enum value: DOMESTIC_UK_PAYMENT_SCHEME_BACS = 10;
   */
  BACS = 10,

  /**
   * Clearing House Automated Payment System
   * https://www.bankofengland.co.uk/payment-and-settlement/chaps
   * Typically used for large sums (> 1M)
   *
   * @generated from enum value: DOMESTIC_UK_PAYMENT_SCHEME_CHAPS = 20;
   */
  CHAPS = 20,

  /**
   * Faster Payments Scheme
   * Most common form of payment in the UK up to 1M GBP
   * Latency: although it can be instant, it is guaranteed to reach destination within a few hours
   * https://www.wearepay.uk/what-we-do/payment-systems/faster-payment-system/
   *
   * @generated from enum value: DOMESTIC_UK_PAYMENT_SCHEME_FPS = 30;
   */
  FPS = 30,
}
// Retrieve enum metadata with: proto3.getEnumType(DomesticUkPaymentScheme)
proto3.util.setEnumType(
  DomesticUkPaymentScheme,
  "wallet.v1.DomesticUkPaymentScheme",
  [
    { no: 0, name: "DOMESTIC_UK_PAYMENT_SCHEME_UNSPECIFIED" },
    { no: 10, name: "DOMESTIC_UK_PAYMENT_SCHEME_BACS" },
    { no: 20, name: "DOMESTIC_UK_PAYMENT_SCHEME_CHAPS" },
    { no: 30, name: "DOMESTIC_UK_PAYMENT_SCHEME_FPS" },
  ]
);

/**
 * SEPA - Single Euro Payments Area
 * Used for EUR payments in Europe
 *
 * @generated from enum wallet.v1.SepaPaymentScheme
 */
export enum SepaPaymentScheme {
  /**
   * @generated from enum value: SEPA_PAYMENT_SCHEME_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * SEPA Credit Transfer - if performed before a given cutoff time during the day, will reach destination the following day
   * Excluding weekends.
   *
   * @generated from enum value: SEPA_PAYMENT_SCHEME_SCT = 10;
   */
  SCT = 10,

  /**
   * SEPA Instant Credit Transfer - at most 20s
   *
   * @generated from enum value: SEPA_PAYMENT_SCHEME_ICT = 20;
   */
  ICT = 20,
}
// Retrieve enum metadata with: proto3.getEnumType(SepaPaymentScheme)
proto3.util.setEnumType(SepaPaymentScheme, "wallet.v1.SepaPaymentScheme", [
  { no: 0, name: "SEPA_PAYMENT_SCHEME_UNSPECIFIED" },
  { no: 10, name: "SEPA_PAYMENT_SCHEME_SCT" },
  { no: 20, name: "SEPA_PAYMENT_SCHEME_ICT" },
]);

/**
 * SWIFT - Society for Worldwide Interbank Financial Telecommunication
 * Used for international bank payments.
 * As of today, all SWIFT payments use a single scheme, so there's no need to specify one.
 *
 * @generated from enum wallet.v1.SwiftPaymentScheme
 */
export enum SwiftPaymentScheme {
  /**
   * @generated from enum value: SWIFT_PAYMENT_SCHEME_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,
}
// Retrieve enum metadata with: proto3.getEnumType(SwiftPaymentScheme)
proto3.util.setEnumType(SwiftPaymentScheme, "wallet.v1.SwiftPaymentScheme", [
  { no: 0, name: "SWIFT_PAYMENT_SCHEME_UNSPECIFIED" },
]);

/**
 * @generated from enum wallet.v1.BankTransactionType
 */
export enum BankTransactionType {
  /**
   * @generated from enum value: BANK_TRANSACTION_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Any kind of card transaction, including some merchants verifying that the card is active.
   * Could be 0 amount for these kind of verifications.
   * Amount is negative for any card debits, positive for refunds.
   * Note: a pending card transaction could be fully, or partially refunded, in which case it will reach the
   * final state with a smaller debit, or even zero.
   * However, once a transaction reaches its final state, a refund will typically involve a new transaction.
   * In this scenario, the old transaction will exist with as a debit and the new one as a credit.
   *
   * @generated from enum value: BANK_TRANSACTION_TYPE_CARD = 10;
   */
  CARD = 10,

  /**
   * Any kind of bank payment: domestic, international, open-banking.
   * Negative when initiated by account holder, positive when receiving money.
   * Same refund rules apply as for cards: once a payment is cleared, refunds will appear as a new transaction
   * with a positive amount. Refunds might happen in case the payment cannot reach the recipient, or in some rare
   * cases if our bank decides to not clear it because of potential fraud.
   *
   * @generated from enum value: BANK_TRANSACTION_TYPE_PAYMENT = 20;
   */
  PAYMENT = 20,

  /**
   * Either UK or SEPA direct debit, or other country-specific direct debits if we ever support them.
   *
   * @generated from enum value: BANK_TRANSACTION_TYPE_DIRECT_DEBIT = 30;
   */
  DIRECT_DEBIT = 30,

  /**
   * ATM transaction: either withdrawal or enquiry (such as changing pin or checking balance).
   * Unless it's a withdrawal, it should be a zero amount, however we might decide to include a fee for
   * certain enquiries so the amount would be negative.
   * Should never be negative, apart from exceptional scenarios where the transaction is refunded.
   *
   * @generated from enum value: BANK_TRANSACTION_TYPE_ATM = 40;
   */
  ATM = 40,

  /**
   * We haven't decided yet if fees are embedded in transactions or appear as separate ones.
   * Any fee that appears as a separate transaction will be of this type.
   * We might potentially use this for monthly subscription fees too.
   *
   * @generated from enum value: BANK_TRANSACTION_TYPE_FEE = 50;
   */
  FEE = 50,

  /**
   * Cash deposits, either via ATM or partners. Not supported at the moment.
   *
   * @generated from enum value: BANK_TRANSACTION_TYPE_CASH = 60;
   */
  CASH = 60,

  /**
   * Direct transfer from one Harbor account to the other.
   * Potentially between accounts of the same user, or different users.
   *
   * @generated from enum value: BANK_TRANSACTION_TYPE_TRANSFER = 70;
   */
  TRANSFER = 70,

  /**
   * The account was debited or credited as part of a currency conversion.
   * Might be either fiat/fiat or crypto/fiat.
   *
   * @generated from enum value: BANK_TRANSACTION_TYPE_FX = 80;
   */
  FX = 80,

  /**
   * @generated from enum value: BANK_TRANSACTION_TYPE_ADJUSTMENT = 90;
   */
  ADJUSTMENT = 90,

  /**
   * Other kind of transaction. Two examples of when this could happen:
   * Our staff amends a ledger manually because of an error or any other internal operation.
   * A new type has being added and older RPC versions are adapted to convert to this type,
   * whereas new RPC versions will expose the correct type.
   * This helps avoid breaking outdated client apps.
   *
   * @generated from enum value: BANK_TRANSACTION_TYPE_OTHER = 1000;
   */
  OTHER = 1000,
}
// Retrieve enum metadata with: proto3.getEnumType(BankTransactionType)
proto3.util.setEnumType(BankTransactionType, "wallet.v1.BankTransactionType", [
  { no: 0, name: "BANK_TRANSACTION_TYPE_UNSPECIFIED" },
  { no: 10, name: "BANK_TRANSACTION_TYPE_CARD" },
  { no: 20, name: "BANK_TRANSACTION_TYPE_PAYMENT" },
  { no: 30, name: "BANK_TRANSACTION_TYPE_DIRECT_DEBIT" },
  { no: 40, name: "BANK_TRANSACTION_TYPE_ATM" },
  { no: 50, name: "BANK_TRANSACTION_TYPE_FEE" },
  { no: 60, name: "BANK_TRANSACTION_TYPE_CASH" },
  { no: 70, name: "BANK_TRANSACTION_TYPE_TRANSFER" },
  { no: 80, name: "BANK_TRANSACTION_TYPE_FX" },
  { no: 90, name: "BANK_TRANSACTION_TYPE_ADJUSTMENT" },
  { no: 1000, name: "BANK_TRANSACTION_TYPE_OTHER" },
]);

/**
 * @generated from enum wallet.v1.BankTransactionState
 */
export enum BankTransactionState {
  /**
   * @generated from enum value: BANK_TRANSACTION_STATE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * Only happens for payments initiated by the client.
   * State is initialised as soon as it is submitted, but might be later rejected for many reasons
   * (insufficient funds, compliance, fraud, velocity limits).
   * Probably best not to show on customer UI until it transitions to PENDING
   *
   * @generated from enum value: BANK_TRANSACTION_STATE_INITIALISED = 10;
   */
  INITIALISED = 10,

  /**
   * This is a payment that passed initial validation and is now pending to be processed,
   * or a card transaction that was authorised, but it can take an additional couple of days
   * to reach a final settlement with Visa/Mastercard)
   *
   * @generated from enum value: BANK_TRANSACTION_STATE_PENDING = 20;
   */
  PENDING = 20,

  /**
   * A payment or card transaction reached their final state and should not be altered anymore,
   * except for quite exceptional cases. Client should still allow CLEARED transactions to be overwritten,
   * to account for these rare events. This final state also implies success.
   *
   * @generated from enum value: BANK_TRANSACTION_STATE_CLEARED = 30;
   */
  CLEARED = 30,

  /**
   * A payment or card spend or ATM enquiry was rejected. Also a final state.
   * Again, should never be altered once rejected, but do allow overwrites just in case.
   *
   * @generated from enum value: BANK_TRANSACTION_STATE_REJECTED = 40;
   */
  REJECTED = 40,

  /**
   * A transaction failed for technical reasons rather than being rejected. Also a final state.
   * Again, should never be altered once rejected, but do allow overwrites just in case.
   *
   * @generated from enum value: BANK_TRANSACTION_STATE_FAILED = 50;
   */
  FAILED = 50,

  /**
   * A card authorisation was cancelled. This is a final state.
   * This happens when a card authorisation is fully reversed.
   *
   * @generated from enum value: BANK_TRANSACTION_STATE_CANCELLED = 60;
   */
  CANCELLED = 60,

  /**
   * A card transaction was declined by the merchant. This is a final state.
   *
   * @generated from enum value: BANK_TRANSACTION_STATE_DECLINED = 70;
   */
  DECLINED = 70,
}
// Retrieve enum metadata with: proto3.getEnumType(BankTransactionState)
proto3.util.setEnumType(
  BankTransactionState,
  "wallet.v1.BankTransactionState",
  [
    { no: 0, name: "BANK_TRANSACTION_STATE_UNSPECIFIED" },
    { no: 10, name: "BANK_TRANSACTION_STATE_INITIALISED" },
    { no: 20, name: "BANK_TRANSACTION_STATE_PENDING" },
    { no: 30, name: "BANK_TRANSACTION_STATE_CLEARED" },
    { no: 40, name: "BANK_TRANSACTION_STATE_REJECTED" },
    { no: 50, name: "BANK_TRANSACTION_STATE_FAILED" },
    { no: 60, name: "BANK_TRANSACTION_STATE_CANCELLED" },
    { no: 70, name: "BANK_TRANSACTION_STATE_DECLINED" },
  ]
);

/**
 * @generated from enum wallet.v1.BankTransactionFailReason
 */
export enum BankTransactionFailReason {
  /**
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_INSUFFICIENT_BALANCE = 10;
   */
  INSUFFICIENT_BALANCE = 10,

  /**
   * Failed due to limits on account. Example: max balance, max daily or monthly withdrawals.
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_LIMITS = 20;
   */
  LIMITS = 20,

  /**
   * Failed because of screening. Example: suspicious transaction, potential fraud.
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_SCREENING = 30;
   */
  SCREENING = 30,

  /**
   * Eg: wrong PIN at POS, or wrong CVV at online merchant.
   * Hopefully we are able to get a more detailed error (see following), but not all card processors support it,
   * so we might fall back to this one.
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_INVALID_CARD_DETAILS = 40;
   */
  INVALID_CARD_DETAILS = 40,

  /**
   * Wrong PIN at POS/ATM
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_WRONG_CARD_PIN = 50;
   */
  WRONG_CARD_PIN = 50,

  /**
   * Wrong CVV when paying online
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_WRONG_CARD_CVV = 60;
   */
  WRONG_CARD_CVV = 60,

  /**
   * Wrong expiry date paying online
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_WRONG_CARD_EXPIRY_DATE = 70;
   */
  WRONG_CARD_EXPIRY_DATE = 70,

  /**
   * Failed 3D-secure challenge while paying online
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_FAILED_3DS = 80;
   */
  FAILED_3DS = 80,

  /**
   * Card expired
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_CARD_EXPIRED = 90;
   */
  CARD_EXPIRED = 90,

  /**
   * Card got deactivated by user
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_CARD_INACTIVE = 100;
   */
  CARD_INACTIVE = 100,

  /**
   * An outbound payment was returned
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_PAYMENT_RETURNED = 110;
   */
  PAYMENT_RETURNED = 110,

  /**
   * An unexpected error happened and our backend wasn't able to process this tx
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_SERVER_ERROR = 500;
   */
  SERVER_ERROR = 500,

  /**
   * If we add new elements to this enum, handlers should convert them to this type to avoid breaking clients
   *
   * @generated from enum value: BANK_TRANSACTION_FAIL_REASON_UNKNOWN = 1000;
   */
  UNKNOWN = 1000,
}
// Retrieve enum metadata with: proto3.getEnumType(BankTransactionFailReason)
proto3.util.setEnumType(
  BankTransactionFailReason,
  "wallet.v1.BankTransactionFailReason",
  [
    { no: 0, name: "BANK_TRANSACTION_FAIL_REASON_UNSPECIFIED" },
    { no: 10, name: "BANK_TRANSACTION_FAIL_REASON_INSUFFICIENT_BALANCE" },
    { no: 20, name: "BANK_TRANSACTION_FAIL_REASON_LIMITS" },
    { no: 30, name: "BANK_TRANSACTION_FAIL_REASON_SCREENING" },
    { no: 40, name: "BANK_TRANSACTION_FAIL_REASON_INVALID_CARD_DETAILS" },
    { no: 50, name: "BANK_TRANSACTION_FAIL_REASON_WRONG_CARD_PIN" },
    { no: 60, name: "BANK_TRANSACTION_FAIL_REASON_WRONG_CARD_CVV" },
    { no: 70, name: "BANK_TRANSACTION_FAIL_REASON_WRONG_CARD_EXPIRY_DATE" },
    { no: 80, name: "BANK_TRANSACTION_FAIL_REASON_FAILED_3DS" },
    { no: 90, name: "BANK_TRANSACTION_FAIL_REASON_CARD_EXPIRED" },
    { no: 100, name: "BANK_TRANSACTION_FAIL_REASON_CARD_INACTIVE" },
    { no: 110, name: "BANK_TRANSACTION_FAIL_REASON_PAYMENT_RETURNED" },
    { no: 500, name: "BANK_TRANSACTION_FAIL_REASON_SERVER_ERROR" },
    { no: 1000, name: "BANK_TRANSACTION_FAIL_REASON_UNKNOWN" },
  ]
);

/**
 * @generated from message wallet.v1.BankPaymentDetails
 */
export class BankPaymentDetails extends Message<BankPaymentDetails> {
  /**
   * @generated from field: wallet.v1.BankPaymentRoute route = 10;
   */
  route = BankPaymentRoute.UNSPECIFIED;

  /**
   * @generated from oneof wallet.v1.BankPaymentDetails.scheme
   */
  scheme:
    | {
        /**
         * Only one is populated, depending on BankPaymentRoute.
         * Empty is used for payments that didn't go through any route (BANK_PAYMENT_ROUTE_UNSPECIFIED)
         *
         * @generated from field: google.protobuf.Empty empty_scheme = 15;
         */
        value: Empty;
        case: "emptyScheme";
      }
    | {
        /**
         * @generated from field: wallet.v1.DomesticUkPaymentScheme domestic_uk_scheme = 20;
         */
        value: DomesticUkPaymentScheme;
        case: "domesticUkScheme";
      }
    | {
        /**
         * @generated from field: wallet.v1.SepaPaymentScheme sepa_scheme = 30;
         */
        value: SepaPaymentScheme;
        case: "sepaScheme";
      }
    | {
        /**
         * @generated from field: wallet.v1.SwiftPaymentScheme swift_scheme = 40;
         */
        value: SwiftPaymentScheme;
        case: "swiftScheme";
      }
    | { case: undefined; value?: undefined } = { case: undefined };

  /**
   * Most of the times, the counterparty name is available.
   * Do perform truncation, as this can be up to 200 chars long.
   *
   * @generated from field: string counterparty_name = 50;
   */
  counterpartyName = "";

  /**
   * When sending/receiving money from/to UK acc-num / sort code, the UkAccountIdentifier is populated
   * When sending/receiving money from/to SEPA or SWIFT-enabled international accounts, IBANAccountIdentifier is populated
   * The counterparty is the beneficiary (payee) for any payments out, and the sender (payer) for any payments in.
   * Note that the counterparty details may not always be available, so treat them as optional (empty will be returned).
   * Also note that the counterparty details might be available even when route is BANK_PAYMENT_ROUTE_UNSPECIFIED.
   * For example, when paying to another Harbour customer, there is no route, however we know the other person's
   * account details, which will be shown here.
   *
   * @generated from oneof wallet.v1.BankPaymentDetails.counterparty
   */
  counterparty:
    | {
        /**
         * @generated from field: google.protobuf.Empty empty_counterparty = 90;
         */
        value: Empty;
        case: "emptyCounterparty";
      }
    | {
        /**
         * @generated from field: wallet.v1.UkAccountIdentifier counterparty_uk = 100;
         */
        value: UkAccountIdentifier;
        case: "counterpartyUk";
      }
    | {
        /**
         * @generated from field: wallet.v1.IBANAccountIdentifier counterparty_iban = 101;
         */
        value: IBANAccountIdentifier;
        case: "counterpartyIban";
      }
    | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<BankPaymentDetails>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wallet.v1.BankPaymentDetails";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 10,
      name: "route",
      kind: "enum",
      T: proto3.getEnumType(BankPaymentRoute),
    },
    {
      no: 15,
      name: "empty_scheme",
      kind: "message",
      T: Empty,
      oneof: "scheme",
    },
    {
      no: 20,
      name: "domestic_uk_scheme",
      kind: "enum",
      T: proto3.getEnumType(DomesticUkPaymentScheme),
      oneof: "scheme",
    },
    {
      no: 30,
      name: "sepa_scheme",
      kind: "enum",
      T: proto3.getEnumType(SepaPaymentScheme),
      oneof: "scheme",
    },
    {
      no: 40,
      name: "swift_scheme",
      kind: "enum",
      T: proto3.getEnumType(SwiftPaymentScheme),
      oneof: "scheme",
    },
    {
      no: 50,
      name: "counterparty_name",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
    {
      no: 90,
      name: "empty_counterparty",
      kind: "message",
      T: Empty,
      oneof: "counterparty",
    },
    {
      no: 100,
      name: "counterparty_uk",
      kind: "message",
      T: UkAccountIdentifier,
      oneof: "counterparty",
    },
    {
      no: 101,
      name: "counterparty_iban",
      kind: "message",
      T: IBANAccountIdentifier,
      oneof: "counterparty",
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): BankPaymentDetails {
    return new BankPaymentDetails().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): BankPaymentDetails {
    return new BankPaymentDetails().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): BankPaymentDetails {
    return new BankPaymentDetails().fromJsonString(jsonString, options);
  }

  static equals(
    a: BankPaymentDetails | PlainMessage<BankPaymentDetails> | undefined,
    b: BankPaymentDetails | PlainMessage<BankPaymentDetails> | undefined
  ): boolean {
    return proto3.util.equals(BankPaymentDetails, a, b);
  }
}

/**
 * @generated from message wallet.v1.UkAccountIdentifier
 */
export class UkAccountIdentifier extends Message<UkAccountIdentifier> {
  /**
   * eg: 12345678
   *
   * @generated from field: string account_number = 1;
   */
  accountNumber = "";

  /**
   * eg: 11-22-33
   *
   * @generated from field: string sort_code = 2;
   */
  sortCode = "";

  constructor(data?: PartialMessage<UkAccountIdentifier>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wallet.v1.UkAccountIdentifier";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "account_number",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
    { no: 2, name: "sort_code", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): UkAccountIdentifier {
    return new UkAccountIdentifier().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): UkAccountIdentifier {
    return new UkAccountIdentifier().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): UkAccountIdentifier {
    return new UkAccountIdentifier().fromJsonString(jsonString, options);
  }

  static equals(
    a: UkAccountIdentifier | PlainMessage<UkAccountIdentifier> | undefined,
    b: UkAccountIdentifier | PlainMessage<UkAccountIdentifier> | undefined
  ): boolean {
    return proto3.util.equals(UkAccountIdentifier, a, b);
  }
}

/**
 * @generated from message wallet.v1.IBANAccountIdentifier
 */
export class IBANAccountIdentifier extends Message<IBANAccountIdentifier> {
  /**
   * eg GB24BKEN10000031510604
   *
   * @generated from field: string iban = 1;
   */
  iban = "";

  /**
   * either 8 or 11 character BIC/SWIFT code, eg: BEASCN12345
   *
   * @generated from field: string bic = 2;
   */
  bic = "";

  constructor(data?: PartialMessage<IBANAccountIdentifier>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "wallet.v1.IBANAccountIdentifier";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "iban", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "bic", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>
  ): IBANAccountIdentifier {
    return new IBANAccountIdentifier().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>
  ): IBANAccountIdentifier {
    return new IBANAccountIdentifier().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>
  ): IBANAccountIdentifier {
    return new IBANAccountIdentifier().fromJsonString(jsonString, options);
  }

  static equals(
    a: IBANAccountIdentifier | PlainMessage<IBANAccountIdentifier> | undefined,
    b: IBANAccountIdentifier | PlainMessage<IBANAccountIdentifier> | undefined
  ): boolean {
    return proto3.util.equals(IBANAccountIdentifier, a, b);
  }
}
