// Purpose: Entry point for the package.
// import many services and utils from different files and export them so that they can be imported from this file.

import { encodeText } from './services/encode-text'
import { encryptText } from './services/encrypt-text'
import { decodeText } from './services/decode-text'
import { decryptText } from './services/decrypt-text'
import { encodeFile } from './services/encode-file'
import { encryptFile } from './services/encrypt-file'
import { decodeFile } from './services/decode-file'
import { decryptFile } from './services/decrypt-file'
import { readFileAsync } from './utils/read-file-async'

export {
    encodeText,
    encryptText,
    decodeText,
    decryptText,
    encodeFile,
    encryptFile,
    decodeFile,
    decryptFile,
    readFileAsync,
}