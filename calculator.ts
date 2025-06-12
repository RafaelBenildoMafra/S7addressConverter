/**
 * Converts an S7 word address and bit index to a DBX address.
 * Example: "DB344.DBW2" with bit index 11 → "DB344.DBX3.3"
 */
export function convertS7Address(address: string, bitNumber: number): string {
    const [blockPart, wordPart] = address.split(".");
    
    if (!blockPart.startsWith("DB") || !wordPart.startsWith("DBW")) {
        throw new Error("Invalid address format. Expected 'DB<number>.DBW<number>'");
    }

    const block = parseInt(blockPart.replace("DB", ""), 10);
    const word = parseInt(wordPart.replace("DBW", ""), 10);

    return s7AddressWordToBit(block, word, bitNumber);
}

function s7AddressWordToBit(block: number, word: number, triggerBit: number): string {
    const byteOffset = 2 * Math.floor(triggerBit / 16);
    const bitOffset = triggerBit % 16;

    const byteStr = bitOffset < 8 ? byteOffset + 1 : byteOffset;
    const bitStr = bitOffset < 8 ? bitOffset : bitOffset - 8;

    const newWord = word + byteStr;
    return `DB${block}.DBX${newWord}.${bitStr}`;
}