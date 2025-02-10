// Purpose: Entry point for the package.
// import many services and utils from different files and export them so that they can be imported from this file.

// import { encodeText } from './services/encode-text'
// import { encryptText } from './services/encrypt-text'
import { decodeText } from './services/decode-text'
import { decryptText } from './services/decrypt-text'
// import { encodeFile } from './services/encode-file'
// import { encryptFile } from './services/encrypt-file'
// import { decodeFile } from './services/decode-file'
// import { decryptFile } from './services/decrypt-file'
import { readFileAsync } from './utils/read-file-async'

// import TrezorConnect from 'trezor-connect'

// must happen before calling TrezorConnect.cipherKeyValue, etc.
// TrezorConnect.manifest({
//     email: 'developer@xyz.com',
//     appUrl: 'http://your.application.com'
// })

    // new version of TrezorConnect, see https://connect.trezor.io/9/#nodejs
    // also see https://connect.trezor.io/9/methods/other/init/
    // and https://github.com/trezor/trezor-suite/blob/develop/packages/connect-examples/node/src/index.ts
    // https://github.com/trezor/trezor-suite/tree/develop/docs/packages/connect
// TrezorConnect.init({
//     lazyLoad: true, // this param prevents iframe injection until
//     // TrezorConnect.method is called
//     manifest: {
//       email: 'developer@xyz.com',
//       appUrl: 'http://your.application.com'
//     }
// });

export {
    // encodeText,
    // encryptText,
    decodeText,
    decryptText,
    // encodeFile,
    // encryptFile,
    // decodeFile,
    // decryptFile,
    readFileAsync,
}