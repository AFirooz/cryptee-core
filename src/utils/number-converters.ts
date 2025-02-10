export const toHexString = (value: number) => {    
    if ((0 > value) || (value > 255)) {
        throw new RangeError('Number must be between 0 and 255 inclusive.')
    }
    // the "+" in "+value" is the unary plus operator, which tries to convert value into a number, or NaN if it can't.
    if (!Number.isInteger(+value)) {
        throw new TypeError('Number must be an integer.')
    }
    // the "& 0xFF" (0xFF is 1111 1111 in binary) is a bitwise AND operation that ensures the value is between 0 and 255
    return ('0' + (value & 0xFF).toString(16)).slice(-2).toUpperCase()
}