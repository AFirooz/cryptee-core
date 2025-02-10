// Purpose: Entry point for the package.
// import many services and utils from different files and export them so that they can be imported from this file.
import TrezorConnect from '@trezor/connect';
import { decodeText } from './services/decode-text'
import { decryptText } from './services/decrypt-text'
import { encodeText } from './services/encode-text'
import { encryptText } from './services/encrypt-text'
// import { encodeFile } from './services/encode-file'
// import { encryptFile } from './services/encrypt-file'
// import { decodeFile } from './services/decode-file'
// import { decryptFile } from './services/decrypt-file'
// import { readFileAsync } from './utils/read-file-async'


export {
    encodeText,
    encryptText,
    decodeText,
    decryptText,
    // encodeFile,
    // encryptFile,
    // decodeFile,
    // decryptFile,
    // readFileAsync,
}

/* ------------------------------------------------------------------------
    DOM event listeners
------------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Trezor, set up DOM events, etc.
    try {
    // Initialize Trezor Connect V9
    await TrezorConnect.init({
        manifest: {
        email: 'developer@xyz.com',
        appUrl: 'http://localhost'
        },
        popup: true,
        webusb: true
    });
    console.log("Trezor Connect initialized successfully.");
    } catch (err) {
    console.error("Error initializing Trezor Connect:", err);
    }

    // -------------------------------
    const encryptBtn = document.getElementById('encryptBtn') as HTMLButtonElement | null;
    const plaintextInput = document.getElementById('plaintextInput') as HTMLTextAreaElement | null;
    const encryptKey = document.getElementById('encryptKey') as HTMLInputElement | null;
    const encryptedOutput = document.getElementById('encryptedOutput') as HTMLTextAreaElement | null;

    const decryptBtn = document.getElementById('decryptBtn') as HTMLButtonElement | null;
    const encryptedInput = document.getElementById('encryptedInput') as HTMLTextAreaElement | null;
    const decryptKey = document.getElementById('decryptKey') as HTMLInputElement | null;
    const decryptedOutput = document.getElementById('decryptedOutput') as HTMLTextAreaElement | null;

    // -------------------------------

    // --- Encode & Encrypt button ---
    encryptBtn?.addEventListener('click', async () => {
        try {
                // One of the elements is missing
                if (!plaintextInput || !encryptKey || !encryptedOutput) {
                    alert("Missing element");
                    return;
                }

                const text = plaintextInput.value.trim();
                const key = encryptKey.value.trim();
                if (!text || !key) {
                alert("Enter both plaintext and key.");
                return;
                }
                // 1) Encode to hex-chunks
                const chunks = encodeText(text);
                // 2) Encrypt with Trezor
                const encryptedHex = await encryptText(chunks, key);
                encryptedOutput.value = encryptedHex;
            } catch (err: any) {
                console.error(err);
                if (encryptedOutput) {
                    encryptedOutput.value = "Error: " + err.message;
                }
            }
  })

    decryptBtn?.addEventListener('click', async () => {
        try {
            if (!encryptedInput || !decryptKey || !decryptedOutput) {
                alert("Missing element");
                return;
            }
            const cipherHex = encryptedInput.value.trim();
            const key = decryptKey.value.trim();
            if (!cipherHex || !key) {
                alert("Enter both encrypted text (hex) and key.");
                return;
            }
            // 1) Break up the big hex text the same way we did for encryption
            const chunks = decodeText(cipherHex);
            // 2) Decrypt with Trezor (returns hex) -> convert to Unicode
            const decryptedText = await decryptText(chunks, key);
            decryptedOutput.value = decryptedText;
        } catch (err) {
            console.error(err);
            if (decryptedOutput) {
            decryptedOutput.value = "Error: " + (err as Error).message;
            }
        }
  })
})