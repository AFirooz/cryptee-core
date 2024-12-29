import { decodeText } from './services/decode-text';

// Example encrypted text (this should be your actual encrypted text)
const encryptedText = "HelloWorld".repeat(500); // Just to create a long string

// Decode the text
const decodedChunks = decodeText(encryptedText);

// Print results
console.log("Original text length:", encryptedText.length);
console.log("Number of chunks:", decodedChunks.length);
console.log("Chunks:", decodedChunks);