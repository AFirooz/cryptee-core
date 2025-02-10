import { PADDING, PADDING_CHAR, TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import { padEnd, groupByLength, encodeUnicodeToHex } from '../utils/string-converters'

// Encode a Unicode string into UTF-16 hex, chunked to skip Trezor’s max size issues
export const encodeText = (text: string) => {
    // Convert each character to a 4-hex-digit code unit
    const hexStr = encodeUnicodeToHex(text)
    // Round up to a multiple of PADDING (32), fill with '0'
    const padding = Math.ceil(hexStr.length / PADDING) * PADDING
    const padded = padEnd(hexStr, padding, PADDING_CHAR)
    // Split into chunks the size Trezor can handle
    return groupByLength(padded, TREZOR_MAX_PAYLOAD_SIZE)
}