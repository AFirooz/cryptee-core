// import TrezorConnect from 'trezor-connect'
import TrezorConnect from '@trezor/connect';
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

    const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })

    let result: string = "NA";
    if (cipherKeyValueResult.success) {
        const text = cipherKeyValueResult.payload.map(item => item.value).join('')
        result = groupByLength(text, 4).map(decodeHexToUnicode).join('')
    }
    if (!cipherKeyValueResult.success) {
         throw new Error(cipherKeyValueResult.payload.error);
    }

    return result
}