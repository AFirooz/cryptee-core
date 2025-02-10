/* ------------------------------------------------------------------------
    Constants and helper functions (from your constants.ts / utils)
------------------------------------------------------------------------ */
const BIP49_PATH = "m/49'/0'/0'";
const TREZOR_MAX_PAYLOAD_SIZE = 2048;
const PADDING = 32;
const PADDING_CHAR = '0';


// Range helper: range(5) => [0,1,2,3,4]
function range(count, start = 0) {
    return [...Array(count).keys()].map(item => item + start);
}


// Split a string into arrays of length `length`.
function groupByLength(value, length) {
    const groups = value.match(new RegExp(`([a-z0-9]){${length}}|([a-z0-9]){1,}`, 'gi')) || [];
    const groupCount = Math.ceil(value.length / length);
    return range(groupCount).map(index => groups[index]);
}


// Pad a string with a given char up to `count` length.
function padEnd(value, count, char) {
    return value + char.repeat(count - value.length);
}


// Encode a Unicode string into UTF-16 hex, chunked to skip Trezor’s max size issues
function encodeText(text) {
    // Convert each character to a 4-hex-digit code unit
    const hexStr = range(text.length)
    .map(i => (PADDING_CHAR.repeat(3) + text.charCodeAt(i).toString(16)).slice(-4))
    .join('');
    // Round up to a multiple of PADDING (32), fill with '0'
    const padding = Math.ceil(hexStr.length / PADDING) * PADDING;
    const padded = padEnd(hexStr, padding, PADDING_CHAR);
    // Split into chunks the size Trezor can handle
    return groupByLength(padded, TREZOR_MAX_PAYLOAD_SIZE);
}


// Decode a hex string (UTF-16) back to Unicode. 
// We skip the padding, so we stop reading whenever we see 4 zero chars in a row.
function decodeHexToUnicode(value) {
    const groups = value.match(/[a-z0-9]{1,4}/gi) || [];
    return groups
    .filter(g => g !== PADDING_CHAR.repeat(4))  // skip leftover pad
    .map(g => String.fromCharCode(parseInt(g, 16)))
    .join('');
}


// For big encrypted text, chunk it again in the same size that was used to encrypt
function decodeTextChunks(text) {
    return groupByLength(text, TREZOR_MAX_PAYLOAD_SIZE);
}


/* ------------------------------------------------------------------------
    Trezor-based encrypt & decrypt
------------------------------------------------------------------------ */
async function encryptText(plainChunks, key) {
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

async function decryptText(cipherChunks, key) {
    const bundle = cipherChunks.map((chunk, i) => ({
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


/* ------------------------------------------------------------------------
    DOM event listeners
------------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', async () => {
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

    const encryptBtn = document.getElementById('encryptBtn');
    const plaintextInput = document.getElementById('plaintextInput');
    const encryptKey = document.getElementById('encryptKey');
    const encryptedOutput = document.getElementById('encryptedOutput');

    const decryptBtn = document.getElementById('decryptBtn');
    const encryptedInput = document.getElementById('encryptedInput');
    const decryptKey = document.getElementById('decryptKey');
    const decryptedOutput = document.getElementById('decryptedOutput');


    /* --- Encode & Encrypt button --- */
    encryptBtn.addEventListener('click', async () => {
    try {
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
    } catch (err) {
        console.error(err);
        encryptedOutput.value = "Error: " + err.message;
    }
    });


    /* --- Decode & Decrypt button --- */
    decryptBtn.addEventListener('click', async () => {
    try {
        const cipherHex = encryptedInput.value.trim();
        const key = decryptKey.value.trim();
        if (!cipherHex || !key) {
        alert("Enter both encrypted text (hex) and key.");
        return;
        }
        // 1) Break up the big hex text the same way we did for encryption
        const chunks = decodeTextChunks(cipherHex);
        // 2) Decrypt with Trezor (returns hex) -> convert to Unicode
        const decryptedText = await decryptText(chunks, key);
        decryptedOutput.value = decryptedText;
    } catch (err) {
        console.error(err);
        decryptedOutput.value = "Error: " + err.message;
    }
    });
});