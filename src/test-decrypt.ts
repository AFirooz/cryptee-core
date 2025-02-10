import TrezorConnect from 'trezor-connect'
import { decodeText } from './services/decode-text';
import { decryptText } from './services/decrypt-text';

// // use this to make trezor work with a borwser
// TrezorConnect.manifest({
//     email: 'dev@xyz.com',
//     appUrl: 'http://your.app.com'
// });

// use this to work purly with node and make trezor listen to Trezor Bridge
(async function main() {
  try {
    await TrezorConnect.init({
      manifest: { email: 'developer@xyz.com', appUrl: 'http://localhost' },
      popup: false,
      webusb: false,
      debug: true,
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
    const dummyEncryptedText = "58ccd07a7cad4d6d33af8b8401577828eafc579f20f299bfc270ae47c362ff67b79ca324b0ef9a76965492cd07a70fa6a1b99e432a000f92f4daa93cf37a9df7fb5eef50ab3e0082818d31e25bab23a066440fb73fee5adc52feed0392ae880f220b0cbc6a0e3b6a38e6781bbc97af1e12e00ef911793c7e4f90346b77f5b5621e6b3f63d5dd210a708549cfa9e65bd0f8ce1e37fa08d944dae1eeb9d3cf3ee702dfad2e1c8d0366852dcb749f86576dc73228ad3085a994e4d322799a4dc742bf6a5f84522920ab1b6696ee2339a2c8f49aac2314d3adb99d6550932892ea225a6443e14d4759dbe2de665d5c2e04d710fe60e86790b739fcc081ee188585bd5d42ddbd3461ce40087064609209e395c73c438c9d5df058cd1e728a120fc1992e5f6265a27c859dd54714a99510ee5a";

    // A dummy key, matching how your text was originally encrypted
    const dummyKey = "6R4dKG?h7p5";

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
