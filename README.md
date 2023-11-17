# harbour-ts-sdk

## Code generation

Requirements:

- Have [brew](https://brew.sh/) installed

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

The base URL for the dev environment is `https://api.harborapps-nonprod.link`, try it out:
```shell
curl --header "Content-Type: application/json" --data '{}' https://api.harborapps-nonprod.link/auth.v1.PingService/Ping
```

### TS code generation

```
yarn
yarn buf:sync
yarn buf
```
