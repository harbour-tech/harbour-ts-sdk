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
        <td>ETH_USDC | POLY_USDC | AVAX_USDC</td>
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
        <td>hash</td>
        <td>yes</td>
        <td>any string</td>
        <td>
          For ethereum signatures produced via personal_sign instead of eth_sign, this parameter should be set to "ethereum".
          More details are provided in the docs for producing the signature. For any other use case, it should be omitted.
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
        <td>ts</td>
        <td>no</td>
        <td>integer</td>
        <td>Mandatory timestamp used when producing the signature (unix milliseconds).</td>
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

The payload should then be signed, and you have two options to do so:

- Manually take care of hashing with keccak256 and then signing with the private key (raw signing).
- Using a library which implements personal message signing. This is an algorithm that adds a special prefix
  `"\x19Ethereum Signed Message:\n"` to the payload, and then hashes the result with keccak256 and finally signs it.

Should you go with the message signing instead of raw signing, you need to add the `hash=ethereum` query parameter to
our redirect URL.

See the following examples on how to create a valid signature with ethers.js:

- [raw signing example](../src/examples/example-eth-new-api.ts)
- [personal message signing example](../src/examples/example-eth-new-api-personalsign.ts)

If you try running the script, you should get a bunch of console logs and a valid access token from our dev backend.
Note that you don't need to do this API integration yourself, it's just a convenient way to showcase exactly how you
can build a valid signature.

To put your implementation to the test, you can set up a test case with the following inputs:

- private key: `0x4ffa17bae4e3eb082aecc21145c6e40b16f10f7e950a4ccfdcc176c9199d42fd`
- corresponding pub key uncompressed: `0xe32a36ecddcf5269a998a9c6d27ccb56ba59f0cc9ae5961e5747304fc06ad090`
- timestamp: `1724162236365`

Note that the private key corresponds to our example file. With the above inputs, if you choose to adopt raw signing,
your function should determine the following:

- the hex-encoded payload (pubkey + timestamp) is
  `0x04792b75fc27f4f3f9cd33ef5130fdd8286c3416836728e1f783c41bf52a2bd5ab54ad58e7f64cd6716dde3054d6063b8493ee8275d60cbba31444a97f8fc5afca31373234313632323336333635`
- keccak hash of the payload is `0xe32a36ecddcf5269a998a9c6d27ccb56ba59f0cc9ae5961e5747304fc06ad090`
- signature is expected to be
  `0xb619c9699b6f98e0bac45d02bca3d5b854fc6e23f8b7c10f02f91ed41bf8f9df1e606392b4f54422da7a3c4992bc984b7aafcd3fd9ed57369f271f9278f96cd91b`

Alternatively, should you choose to adopt personal message signing, you can set up a test case with the exact same 
keypair and timestamp, and expect the signature to be:
`0x0d779dda1ca405ff07181d9c8a2743503c6479641e7c076dd379e39837a839626b80fedb71edf60597c484928b76c38672d6b229aac4de4750ef0df2eebf911e1b`.

If your signing function passes the above spec, it is guaranteed to function with our backend, given the following
requirements:

- the timestamp must be within 1 minute of the current time
- a valid Ethereum key must be used, according to secp256k1
