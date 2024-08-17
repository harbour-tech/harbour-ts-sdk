# Harbour Web Integration

Harbour provides a dev and a prod environment under the following URLs:

- Dev: https://dev-ramp.harborapps-nonprod.link
- Prod: https://ramp.harbour.fi

## Using the nonprod environment

The nonprod environment can be used during development, especially if developers wish to also take a look at how the
functionality looks like for a registered customer. Once a dev user is redirected to our app, they can either witness
a fake sign up flow by providing a phone number, or they can sign in with the following credentials:

- Country: `Germany`
- Phone Number: `+49 777 7908 100`
- Post code: `90147`
- Date of Birth: Jan 1st 1989

Once a crypto address is linked to this test user, any subsequent redirect will recognise the user and not require any
further login. Testing the journey again with a different user will require using a separate crypto address.

Supported tokens:

- USDC on Avalanche Fuji C-Chain Testnet (`0x5425890298aed601595a70AB815c96711a31Bc65`)
- USDC on Ethereum Sepolia Testnet (`0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`)

Note: buying and selling won't be possible, as our dev environment does not use real bank accounts, and thus it's not
possible to pay with or receive real money. However, our testnet integration is fully functional, and you can reach out
to our team if you wish to simulate a transaction.

## Using the prod environment

Using prod is exactly the same as dev, except for the fact that you can sign up for real, as long as you're a European
resident and have a phone number in the country you sign up from. It can be used for software integration purposes,
as the integration only requires implementing the redirect, and does not require signup up.

As long as our web app does not display an error message, and offers to sign up the user, your dev team will know that
the integration works and all URL parameters have been validated.

Supported tokens:

- USDC on Ethereum Mainnet (`0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`)
- USDC on Avalanche Mainnet C-Chain (`0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e`)
- USDC on Polygon Mainnet (`0x3c499c542cef5e3811e1192ce70d8cc03d5c3359`)

## How it works

The integrating app can choose whether it simply redirects the user to our web app, or also collects some initial
information, such as whether the user wishes to buy or sell, which token, and which amount. Our app is made of three
steps: choose the token, choose an amount and get an estimated quote, and then proceed to the payment. When buying, the
last step displays the bank payment instructions; when selling, the last step displays the crypto payment instructions
and potentially a wallet integration to sign the transaction from a desktop browser.

Should the app choose to collect that information from the user beforehand, it has the option of passing it in
Harbour's URL parameters, making it possible to skip the first step and show a price quote directly to the user.

The integrating app can also improve user experience by providing a digital signature, to prove ownership of the crypto
address by the customer. Providing this signature beforehand will allow us to skip the part where a user has to connect
their wallet and sign a payload from their browser wallet plugin. It also allows using Harbour from a mobile device,
since browser extensions won't be necessary.

## Price quotes

If the integrating app wishes to provide a price quote to the user, typically when comparing Harbour with other ramp
providers, they'll have to integrate with our RPC API.

`TODO add API docs`

Harbour pricing works by calculating a fair mid-price of the asset being exchanged, across multiple exchanges of our
choice. A service fee is deducted from the fiat portion, and the network fee (only when buying crypto) is deducted
from the crypto portion.

## Redirect specification

Except for the price quote, no further API integration is necessary and the only required step is to redirect the user
to our web app. Note that:

- Initially we'll only support redirects
- We plan on supporting iframes in the future, by optimizing our UI for any screen size
- In our first beta iteration, we require a signature to demonstrate ownership if the address used for ramping. In
  future iterations the signature will be optional and the user will have to connect their wallet on the Harbour web app
  and will be asked to sign a payload.

<table>
  <th>Query Param</th>
  <th>Optional</th>
  <th>Allowed Values</th>
  <th>Description</th>
  <tbody>
    <tr>
        <td>asset</td>
        <td>yes</td>
        <td>ETH_USD | POLY_USDC | AVAX_USDC</td>
        <td>Optional token to buy or sell. If missing or empty, Harbour's UI will ask the user what they intend to use.</td>
    </tr>
    <tr>
        <td>op</td>
        <td>yes</td>
        <td>buy | sell</td>
        <td>Optional operation specifier. If missing, Harbour's UI will ask the user whether they want to buy or sell.</td>
    </tr>
    <tr>
        <td>amount</td>
        <td>yes</td>
        <td>any numeric</td>
        <td>
            Optional amount specifier. If missing, Harbour's UI will ask the user the amount the want to ramp.
            For the time being we only operate with stablecoins, so any decimal digit after the second (after cents) will be ignored.
        </td>
    </tr>
    <tr>
        <td>sig</td>
        <td>no</td>
        <td>any string</td>
        <td>
          Mandatory url-encoded signature to demonstrate ownership of a cryptographic public key.
          Check the "Producing a valid signature" section below for more details.
        </td>
    </tr>
    <tr>
        <td>pubkey</td>
        <td>no</td>
        <td>any string</td>
        <td>Mandatory url-encoded public key of the crypto address the user wants to ramp to/from.</td>
    </tr>
    <tr>
        <td>address</td>
        <td>no</td>
        <td>any string</td>
        <td>Mandatory blockchain address the user wants to ramp from/to.</td>
    </tr>
    <tr>
        <td>origin</td>
        <td>yes</td>
        <td>any string</td>
        <td>
          Optional unique identifier for the originating app. Get in touch with our team to know your ID and get Harbour's UI 
          to adhere to your color scheme and earn Harbour points on every user that interacts with our service.
          </td>
    </tr>
  </tbody>
</table>

### Producing a valid signature

#### Ethereum

Following are the instructions to produce a valid signature given an Ethereum address and public key.
Check the [redirect specification](#redirect-specification) for a list of all URL parameters that can be passed.

Let's analyze `address` and `pubkey`. The address has to be passed in the format expected by the Ethereum protocol,
such as `0x123...`. The pubkey can be passed in either base64/urlencoded or hex encoded strings.
If you wish to use hex encoding, ensure you prefix the address with 0x so that our code recognises it as a hex string,
else it will default to try parsing it as base64.

The address has to be the address on which the user wants to get their funds when buying, or from which they intend to
send the funds when selling. The pubkey has to be the key from which the address is derived. You can pass either the
compressed or uncompressed public key.

The last parameter is `sig`, which is the signature of a Harbour custom payload, produced by using the private key
corresponding to the public key discussed above. Again, it can either be in base64/urlencoded or hex encoded.

The payload is built as such:

- take the address bytes
- get the current timestamp as unix epoch milliseconds
- convert the timestamp to a string
- get the Unicode bytes of such string
- append the timestamp bytes to the address bytes

The payload has to be hashed with keccak256, and the resulting hash has to be signed with the private key, and the
resulting bytes have to be encoded in either base64 or hex. Note: you need to hash the raw payload, without using the
`\x19Ethereum Signed Message:\n` prefix. Should that be an issue, let our team now so that we can accommodate with
further functionality.

`TODO add code sample`