# Usage of Harbour Typescript SDK for ramp aggregator

## API description
### Detailed description of fields of requests and responses
Detailed description of requests and responses fields can be found in the [proto definitions](../proto/ramp/v1/public.proto)

### List of supported fiat currencies
List of supported fiat currencies can be found in **CurrencyId** enum of [proto definitions](../proto/ramp/v1/public.proto)

### List of supported countries and payment methods
List of supported countries can be found [here](./countries-payments.md)

## Usage of SDK
1. Reach out Harbour support to get assigned referral code and to register webhook for transactions notification (if required) 
2. Copy `src/index.ts` and `src/gen/**` into your project
3. Configure RampClient to one of the endpoints
   * Development environment: https://dev-api.harborapps-nonprod.link
   * Production environment: https://api.harborapp.link
   ```Typscript
   import Ramp from '.'
   import {GetAssetsRequest, CurrencyId} from "./gen/ramp/v1/public_pb";
   const ramp = new RampCLient("https://dev-api.harborapps-nonprod.link");
   ```
4. Get list of available assets
   ```Typscript
   const assetsResponse = ramp.getAssets(new GetAssetsRequest({fiatAssetId: CurrencyId.EUR}));
   ```
   Please check **GetAssetsResponse** of [proto definitions](../proto/ramp/v1/public.proto) for detailed documentation over response data
5. Estimate on-ramp
   ```Typscript
   const onRampFeeResponse = await ramp.estimateOnRampFee(new EstimateOnRampFeeRequest({
     fiatAssetId: CurrencyId.EUR,
     cryptoAssetId: assetsResponse.cryptoAssets[0].assetId,
     protocol: assetsResponse.cryptoAssets[0].protocol,
     amount:  {
       case:"fiatAssetAmount",
       value: "100",
     },
   }));
   ```
   Please check **EstimateOnRampFeeResponse** of [proto definitions](../proto/ramp/v1/public.proto) for detailed documentation over response data
6. Estimate off-ramp
   ```Typscript
   const offRampFeeResponse = await ramp.estimateOffRampFee(new EstimateOffRampFeeRequest({
     fiatAssetId: CurrencyId.EUR,
     cryptoAssetId: assetsResponse.cryptoAssets[0].assetId,
     protocol: assetsResponse.cryptoAssets[0].protocol,
     amount:  {
       case:"cryptoAssetAmount",
       value: "100",
     },
   }));
   ```
   Please check **EstimateOffRampFeeResponse** of [proto definitions](../proto/ramp/v1/public.proto) for detailed documentation over response data
7. Open a popup window passing parameters

   Once user selected Harbour as ramp provider user should be directed to Harbour ramp web app at
   `https://.../?origin={metamask}&op={buy|sell}&amount=100&asset={ASSET_ID_USDC|ASSET_ID_ETH|...}&protocol={PROTOCOL_ETHEREUM|PROTOCOL_POLYGON|...}&currency={CURRENCY_ID_EUR}`
   
   | Parameter               | Example values                           | Notes                                                                                                                                                                                                                            |
   |-------------------------|------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | op                      | buy, sell                                |                                                                                                                                                                                                                                  |
   | amount                  | 100                                      | `fiat` for `buy` operation and in `crypto` for `sell` operation <br/>`.` should be used as the decimal separator for `amount` <br/> `amount` would be truncated if it exceeds the decimal precision of the fiat or crypto asset. |
   | asset                   | ASSET_ID_USDC, ASSET_ID_ETH, ...         | look into `AssetId` definition in proto                                                                                                                                                                                          |
   | protocol                | PROTOCOL_ETHEREUM, PROTOCOL_POLYGON, ... | look into `Protocol` definition in proto                                                                                                                                                                                         |
   | wallet_address          | "0x134ad..."                             | wallet address                                                                                                                                                                                                                   |
   | currency                | CURRENCY_ID_EUR, ...                     | look into `CurrencyId` definition in proto                                                                                                                                                                                       |
   | referral_code           | 'refferal_xyz'                           | assigned to the partner by Harbour                                                                                                                                                                                               |
   | referral_transaction_id | 'tx123'                                  | any string containing only letters (any case), numbers, '_' and '-'                                                                                                                                                              |
8. As soon as ramp transaction changes it's status partner webhook will be invoked
   
   Complete request definition can be found in the [proto definitions](../proto/ramp/v1/public.proto). Webhook's payload is JSON encoded by default. Example payload:      
   ```json
   {
     "transactionId" : "00000000-0000-0000-0000-000000000000",
     "referralTransactionId": "tx123",
     "type": "RAMP_TYPE_ON_RAMP",
     "status": "RAMP_STATUS_COMPLETED",
     "currencyId": "CURRENCY_ID_EUR",
     "cryptoAssetId": "ASSET_ID_USDC",
     "cryptoAssetProtocol": "PROTOCOL_ETHEREUM",
     "fiatAmount": "100.1",
     "cryptoAmount": "105.456",
     "exchangeRate": "1.07",
     "fees": {
       "processingFee": "0.5",
       "networkFee": "3.1",
       "referralFee": "0.5"
     },
     "walletAddress": "0x904Efd640CcA70Efaf5c29421CF507E4›B7bFc71B",
     "initiatedAt": "2024-08-22T00:00:00Z",
     "completedAt": "2024-08-22T00:00:00Z"
   }
   ```

## End to end example of SDK usage
End to end example of SDK usage can be found  [here](../src/examples/example-aggregator.ts) and can be executed with following command 
```shell
npm i
npx tsx src/examples/example-aggregator.ts
```