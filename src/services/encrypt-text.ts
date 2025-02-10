import TrezorConnect from '@trezor/connect';
import { BIP49_PATH } from '../constants';

export const encryptText = async (encodedText: string[], key: string) => {
    // Build a bundle of cipherKeyValue calls
    const bundle = encodedText.map((item, index) => ({
        path: BIP49_PATH,
        key,
        value: item,
        encrypt: true,
        askOnEncrypt: index === 0,
        askOnDecrypt: index === 0
    }))

    // Send the entire bundle to Trezor
    const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })
    if (!cipherKeyValueResult.success) throw new Error(cipherKeyValueResult.payload.error);
    
    // Combine all encrypted chunks into one hex string
    return cipherKeyValueResult.payload.map(item => item.value).join('');
}