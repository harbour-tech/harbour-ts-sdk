# Usage of Harbour Typescript SDK for ramp aggregator

## API description
### Detailed description of fields of requests and responses
Detailed description of requests and responses fields can be found in the [proto definitions](../proto/ramp/v1/public.proto)

### List of supported fiat currencies
List of supported fiat currencies can be found in **CurrencyId** enum of [proto definitions](../proto/ramp/v1/public.proto)

### List of supported countries and payment methods
List of supported countries can be found [here](./countries-payments.md)

## Usage of SDK
1. Copy `src/index.ts` and `src/gen/**` into your project
2. Configure RampClient to one of the endpoints
   * Development environment: https://dev-api.harborapps-nonprod.link
   * Production environment: https://api.harborapp.link
   ```Typscript
   import Ramp from '.'
   import {GetAssetsRequest, CurrencyId} from "./gen/ramp/v1/public_pb";
   const ramp = new RampCLient("https://dev-api.harborapps-nonprod.link");
   ```
3. Get list of available assets
   ```Typscript
   const assetsResponse = ramp.getAssets(new GetAssetsRequest({fiatAssetId: CurrencyId.EUR}));
   ```
   Please check **GetAssetsResponse** of [proto definitions](../proto/ramp/v1/public.proto) for detailed documentation over response data
4. Estimate on-ramp
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
5. Estimate off-ramp
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
6. Open a popup window passing parameters

   Once user selected Harbour as ramp provider user should be directed to Harbour ramp web app at
   `https://.../?origin={metamask}&op={buy|sell}&amount=100&asset={ASSET_ID_USDC|ASSET_ID_ETH|...}&protocol={ETHEREUM|POLYGON|...}&currency={CURRENCY_ID_EUR}`
   Please note that
   * amount should be in `fiat` for `buy` operation and in `crypto` for `sell` operation 
   * `asset`, `protocol` and `currency` values should be the same as string representation of enum in [proto definitions](../proto/ramp/v1/public.proto)   
   * Exact domain name for the URL will be provided shortly.  

## End to end example of SDK usage
End to end example of SDK usage can be found  [here](../src/examples/example-aggregator.ts) and can be executed with following command 
```shell
npm i
npx tsx src/examples/example-aggregator.ts
```