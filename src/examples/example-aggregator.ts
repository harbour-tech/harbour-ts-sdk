// In this example we demonstrate how an Ethereum wallet not yet linked to any user will generate a response with the onboarding URL
// Run me with: npx tsx src/examples/example-aggregator.ts

import RampClient from "../";
import {
  CurrencyId,
  EstimateOffRampFeeRequest,
  EstimateOnRampFeeRequest,
  GetAssetsRequest,
} from "../gen/ramp/v1/public_pb";


const ramp = new RampClient("https://dev-api.harborapps-nonprod.link");

// this will return an actual response with on- and off- ramping details
const assetsResponse = await ramp.getAssets(new GetAssetsRequest({fiatAssetId: CurrencyId.EUR}));
console.log(assetsResponse.cryptoAssets);

const onRampFeeResponse = await ramp.estimateOnRampFee(new EstimateOnRampFeeRequest({
  fiatAssetId: CurrencyId.EUR,
  cryptoAssetId: assetsResponse.cryptoAssets[0].assetId,
  protocol: assetsResponse.cryptoAssets[0].protocol,
  amount:  {
    case:"fiatAssetAmount",
    value: "100",
  },
}));
console.log(onRampFeeResponse);

const offRampFeeResponse = await ramp.estimateOffRampFee(new EstimateOffRampFeeRequest({
  fiatAssetId: CurrencyId.EUR,
  cryptoAssetId: assetsResponse.cryptoAssets[0].assetId,
  protocol: assetsResponse.cryptoAssets[0].protocol,
  amount:  {
    case:"cryptoAssetAmount",
    value: "100",
  },
}));
console.log(offRampFeeResponse);