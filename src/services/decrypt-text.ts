import TrezorConnect from '@trezor/connect';
import { BIP49_PATH } from '../constants'
import { decodeHexToUnicode, groupByLength } from '../utils/string-converters'


// export const decryptText = async (decodeText: string[], key: string) => {
//     const bundle = decodeText.map((item, index) => ({
//         path: BIP49_PATH,
//         key,
//         value: item,
//         encrypt: false,
//         askOnEncrypt: index === 0,
//         askOnDecrypt: index === 0
//     }))

//     const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })

//     let result: string = "NA";
//     if (cipherKeyValueResult.success) {
//         const text = cipherKeyValueResult.payload.map(item => item.value).join('')
//         result = groupByLength(text, 4).map(decodeHexToUnicode).join('')
//     }
//     if (!cipherKeyValueResult.success) {
//          throw new Error(cipherKeyValueResult.payload.error);
//     }

//     return result
// }

export async function decryptText(cipherChunks: string[], key: string) {
    const bundle = cipherChunks.map((chunk: string, i: number) => ({
    path: BIP49_PATH,
    key,
    value: chunk,
    encrypt: false,
    askOnEncrypt: (i === 0),
    askOnDecrypt: (i === 0)
    }));

    const result = await TrezorConnect.cipherKeyValue({ bundle });
    if (!result.success) throw new Error(result.payload.error);

    // Combine all decrypted hex into one big hex string
    const combinedHex = result.payload.map(item => item.value).join('');
    // Convert from UTF-16 hex to final plaintext
    return decodeHexToUnicode(combinedHex);
}
