# harbour-ts-sdk

## Flow Diagram
![Flow](docs/ramp-api.png)

## Code generation

Requirements:

- Have [brew](https://brew.sh/) installed
- Have [yarn](https://yarnpkg.com/) installed (or use `brew install yarn`)
- Have [npm](https://www.npmjs.com/) installed (or use `brew install npm`)

Then install the following dependencies for code generation:
```shell
brew install bufbuild/buf/buf
brew install protobuf
```

More info on:
https://docs.buf.build/introduction
https://connect.build/docs/introduction
https://github.com/protocolbuffers/protobuf-javascript
https://connect.build/docs/web/generating-code

The base URLs are:
- DEV: `https://dev-api.harborapps-nonprod.link`
- PROD: `https://api.harborapp.link`

Try it out:
```shell
export HARBOUR_API=https://dev-api.harborapps-nonprod.link
curl --header "Content-Type: application/json" --data '{}' $HARBOUR_API/auth.v1.PingService/Ping
```

### TS code generation

```
yarn
yarn buf:sync
yarn buf
```

The sync step copies over all the proto definitions from `https://github.com/harbour-tech/harbour-api`.
Occasionally there might be updates to the API, so you can keep syncing them with this project via this command.

TODO explain Connect and protobuf

TODO squash commits to avoid exposing full proto publicly from first commit