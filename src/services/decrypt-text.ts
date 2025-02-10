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

    // sending the bundle to Trezor
    const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })
    if (!cipherKeyValueResult.success) throw new Error(cipherKeyValueResult.payload.error);

    // Combine all decrypted hex into one big hex string
    const combinedHex = cipherKeyValueResult.payload.map(item => item.value).join('');
    // Convert from UTF-16 hex to final plaintext
    return groupByLength(combinedHex, 4).map(decodeHexToUnicode).join('')
}
