const sortWord = word => word.split('').sort().join('')

const makeDecoder = originalWords => encodedWord => {
    return originalWords.split(' ').find(originalWord => {
        return sortWord(originalWord) === sortWord(encodedWord)
    }) || encodedWord
}


const decodeText = (encodedText, originalWords) => {
    const getDecodedWord = makeDecoder(originalWords);
    return encodedText.replace(/[a-zA-Zàèìòù]+/g, getDecodedWord)
}


module.exports = {
    decodeText
};

