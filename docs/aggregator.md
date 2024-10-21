# Usage of Harbour Typescript SDK for ramp aggregator

## Usage of SDK

1. Copy `src/index.ts` and `src/gen/**` to you project
2. Configure RampClient to one of the endpoints
   * Development environment: https://dev-api.harborapps-nonprod.link
   * Production environment: https://api.harborapp.link
   ```Typscript
   import Ramp from '.'
   import {GetAssetsRequest, CurrencyId} from "./gen/ramp/v1/public_pb";
   const ramp = new RampCLient("https://...");
   ```
3. Get list of available assets
   ```Typscript
   const assetsResponse = ramp.getAssets(new GetAssetsRequest({fiatAssetId: CurrencyId.EUR}));
   ```
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
