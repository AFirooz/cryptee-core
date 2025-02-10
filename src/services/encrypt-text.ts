import TrezorConnect from '@trezor/connect';
import { BIP49_PATH } from '../constants';

export const encryptText = async (plainChunks: string[], key: string) => {
    // Build a bundle of cipherKeyValue calls
    const bundle = plainChunks.map((chunk, i) => ({
    path: BIP49_PATH,
    key,
    value: chunk,
    encrypt: true,
    askOnEncrypt: (i === 0),
    askOnDecrypt: (i === 0)
    }));

    // Send the entire bundle to Trezor
    const result = await TrezorConnect.cipherKeyValue({ bundle });
    if (!result.success) throw new Error(result.payload.error);

    // Combine all encrypted chunks into one hex string
    return result.payload.map(item => item.value).join('');
}