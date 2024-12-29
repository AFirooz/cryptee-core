# cryptee-core version 1.1.1

Library for data encryption using Trezor.

[![Build Status](https://travis-ci.com/crypteeio/cryptee-core.svg?branch=master)](https://travis-ci.com/crypteeio/cryptee-core)

[![Coverage Status](https://coveralls.io/repos/github/LukasRada/cryptee-core/badge.svg?branch=master)](https://coveralls.io/github/LukasRada/cryptee-core?branch=master)

## Attention

trezor-connect since version 7 requires to invoke before any trezor-connect method used:

```ts
TrezorConnect.manifest({
    email: 'developer@xyz.com',
    appUrl: 'http://your.application.com'
})
```

more at [here](https://github.com/trezor/connect/blob/develop/docs/index.md)

## Commands to run

```bash
# for decode
# install npm
npm install -g yarn shx ts-node
yarn

# decrypt



# testing decode
yarn test-decode
```
