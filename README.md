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

## Notes

- `babel` is needed for `jest` to work with TypeScript.
- `tsconfig.json` defines the rules to be applied on TypeScript files.

### `webpack`

[Read More Here.](https://medium.com/sessionstack-blog/how-javascript-works-a-deep-dive-into-webpack-cbc9c169eed7)
In modern JavaScript development, code is often split into smaller, reusable units called modules.
Webpack takes these modules, along with their dependencies, and combines them into a single (or a few) JavaScript file(s).

#### Why is this useful?

1. Improved performance: as it reduces the number of HTTP requests needed to load your application, leading to faster load times.
2. Dependency management
3. Asset handling: Webpack can process and bundle JavaScript and other assets like CSS, images, and fonts.
4. Code transformations: With the help of loaders, Webpack can transform code written in different languages or using different syntaxes (e.g., TypeScript, JSX, SASS) into browser-compatible JavaScript.

#### Key concepts in Webpack

- Entry point: The starting point of your application. Webpack starts from this file and analyzes its dependencies.
- Loaders: Plugins that allow Webpack to process different types of files (e.g., CSS, images, etc.).
