import TrezorConnect from 'trezor-connect'
import { BIP49_PATH } from '../constants'
import { decodeHexToUnicode, groupByLength } from '../utils/string-converters'

export const decryptText = async (decodeText: string[], key: string) => {
    const bundle = decodeText.map((item, index) => ({
        path: BIP49_PATH,
        key,
        value: item,
        encrypt: false,
        askOnEncrypt: index === 0,
        askOnDecrypt: index === 0
    }))

    // TODO: should this be called here?
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
    //         email: 'developer@xyz.com',
    //         appUrl: 'http://your.application.com',
    //     },
    // });

    const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })

    let result: string;
    if (cipherKeyValueResult.success) {
        const text = cipherKeyValueResult.payload.map(item => item.value).join('')
        result = groupByLength(text, 4).map(decodeHexToUnicode).join('')
    }
    
    return result
}