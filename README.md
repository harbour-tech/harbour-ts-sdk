# Harbour Ramp Docs

Harbour is an on- and off-ramp service which provides near-instant fiat <-> stablecoin conversion.

## Developer Documentation

Looking to integrate with our API natively? Check out the [SDK documentation](./docs/index-sdk.md).

Alternatively, check out our [web integration docs](./docs/index-ramp.md) for a quick and easy way to integrate Harbour
in app or extension by simply redirecting users to our web app.

## How it works

Harbour is different from most ramp providers as it creates a unique, dedicated bank account per customer, registered
in their own name. Customers can buy crypto by simply executing an instant bank transfer to their dedicated account,
and will receive an instant bank payment from their dedicated Harbour account to their personal account when selling
crypto.

By providing a dedicated bank account, Harbour offers the highest chance of success for fiat transactions, as opposed
to the traditional method of sending money to a bank account in the name of a Crypto institution, which is often
blocked by traditional banks.

![Ramp Diagram](./docs/assets/buysell.drawio.png)

### Availability

Harbour is available to any adult resident in European Union. So far it supports USDC on:

- Ethereum
- Polygon
- Avalanche

And soon launching on other chains, both EVM and non-EVM.

### Speed

Harbour operates by keeping a liquidity pool in both fiat and crypto. This allows us to instantly pay out crypto or fiat
to the customer upon receiving a payment. If the customer's bank supports instant payments (SEPA Instant Credit Transfer
in Europe or Instant Faster Payments in the UK), transactions will be completed in just a little over the time for 
finality on the given blockchain, making Harbour the first near-instant ramp provider in the world.

### Cost efficiency

Harbour operates on the basis of "address ownership". Customers are required to use their crypto wallet to prove
ownership of any address they wish to on-ramp into or off-ramp from. This minimises risk and the operational burden
of managing dedicated deposit addresses and the network fees associated with sweeping them.

Harbour aims to be the cheapest and fastest ramp provider in the market, thus our product was designed with efficiency
in mind.

### Integration

As mentioned in the [developer documentation](#developer-documentation), Harbour offers two ways to integrate:

1. The integrating app can use our SDK to interact with our API directly. This allows for embedding of the buy/sell
   functionality without leaving the app and with its native UI/UX.
2. Or simply redirect the user to our web app, where they can complete the transaction in a few clicks.

Harbour is responsible for identity verification, KYC/AML, and compliance with local regulations.
Upon their first contact with Harbour, customers are required to sign up with their phone number and provide proof of
identity. The process is fully automated and takes less than 5 minutes in most cases.

Sign up and ID verification is the only step where the UX is entirely handled by Harbour. Whether it's embedded as an
iframe or the customer is sent a signup link, the process is entirely in control of Harbour and abstracted away from
the integrating app.

Upon successful signup, the integrating app can opt for the native integration or redirecting users to the Harbour web
app when they wish to use our ramp services.

A very special feature of Harbour is the ability to recognise digital signatures from the customer's wallet.
For each address the customer interacts from, we map the public key to the customer in our database.
This way, a returning customer will never have to go through a login step or remember a password.
The Harbour web app can also be themed accordingly with the origin app's branding, making the transition seamless.

The only instance in which a login is required is when the customer comes from a new address, in which case they'll
briefly confirm their identity by an SMS OTP and a security question. Similarly to the signup process, the login process
is handled by Harbour and requires no integration work except for iframe embedding or web redirect.
