// import TrezorConnect from 'trezor-connect'
import TrezorConnect from '@trezor/connect';
import { decodeText } from './services/decode-text';
import { decryptText } from './services/decrypt-text';


(async function main() {
  try {
    await TrezorConnect.init({
      manifest: { email: 'developer@xyz.com', appUrl: 'http://localhost' },
      debug: true,
      // Depending on your usage (browser vs. Node), you may need to set:
      popup: false,     // false, if using a headless or bridge mode
      webusb: true     // false if you rely on a different transport
    });

    // Rest of your code goes here
    console.log('Trezor init success!');
  } catch (err) {
    console.error('Error during Trezor test:\n', err);
  }
})();


(async () => {
  try {
    // Example: "encrypted" string. In a real scenario, this should be the actual encrypted text.
    const dummyEncryptedText = "hex-encoded-string";

    // A dummy key, matching how your text was originally encrypted
    const dummyKey = "key";

    // In your real code, you'd likely have this data already chunked,
    // but for the sake of example we reuse decodeText to simulate those 2048-byte segments.
    const decodedChunks = decodeText(dummyEncryptedText);

    console.log("Decoded chunks:", decodedChunks);

    // This should pop up a Trezor prompt for passphrase (if used) and ask for confirmation
    const decrypted = await decryptText(decodedChunks, dummyKey);

    console.log("Decrypted result:", decrypted);
  } catch (err) {
    console.error("Error during decrypt test:", err);
  }
})();
