# harbour-ts-sdk

## Code generation

Requirements:

- Have [brew](https://brew.sh/) installed
- Have [yarn](https://yarnpkg.com/) installed (or use `brew install yarn`)

Then install the following dependencies for code generation:
```shell
brew install bufbuild/buf/buf
brew install protobuf
```

Follow the instructions here to install the code generator for javascript:
https://github.com/protocolbuffers/protobuf-javascript
https://connect.build/docs/web/generating-code

More info on:
https://docs.buf.build/introduction
https://connect.build/docs/introduction

The base URLs are:
- DEV: `https://api.harborapps-nonprod.link`
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

TODO explain Connect and protobuf

TODO squash commits to avoid exposing full proto publicly from first commit