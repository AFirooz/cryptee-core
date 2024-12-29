import { range } from "./common";
import { PADDING_CHAR } from '../constants'

/**
 * Splits a string into groups of a specified length, using a regular expression.
 * 
 * @param {string} value - The input string to be grouped.
 * @param {number} length - The length of each group.
 * @returns {string[]} - An array of grouped substrings.
 */
export const groupByLength = (value: string, length: number) => {
    const groups = value.match(new RegExp(`([a-z0-9]){${length}}|([a-z0-9]){1,}`, 'gi')) || []
    // Calculate the total number of groups needed.
    const groupCount = Math.ceil(value.length / length)
    // Map the groups based on the range of indices and return the result.
    return range(groupCount).map(index => groups[index])
}

/**
 * Encodes a string to its hexadecimal representation with padding for each character.
 * 
 * @param {string} value - The input string to encode.
 * @returns {string} - A string of hexadecimal representations of the input characters.
 */
export const encodeUnicodeToHex = (value: string) => range(value.length)
    .map(index => (PADDING_CHAR.repeat(3) + value.charCodeAt(index).toString(16)).slice(-4))
    .join('')

/**
 * Decodes a hexadecimal string back to its original Unicode string.
 * 
 * @param {string} value - The input string containing hexadecimal values.
 * @returns {string} - The decoded Unicode string.
 */
export const decodeHexToUnicode = (value: string) => {
    const groups = value.match(/[a-z0-9]{1,4}/gi) || [];
    return range(groups.length)
        .filter(index => groups[index] !== PADDING_CHAR.repeat(4))  // Skip padded groups.
        .map(index => String.fromCharCode(parseInt(groups[index], 16))) // Convert hex to char.
        .join(''); // Join characters into the final string.
};

/**
 * Pads the end of a string with a specified character until it reaches the desired length.
 * 
 * @param {string} value - The input string to pad.
 * @param {number} count - The desired total length of the string.
 * @param {string} char - The character to use for padding.
 * @returns {string} - The padded string.
 */
export const padEnd = (value: string, count: number, char: string) => 
    value + char.repeat(count - value.length)