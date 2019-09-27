const isWordEncodable = word => {
    if (word.length < 4) {
        return false;
    }

    // Parte "centrale" della parola. Senza la prima e l'ultima lettera
    const wordBody = word.slice(1, -1);

    // Se la parte centrale è composta solo dalle stesse lettere
    return new Set(wordBody).size >= 2;
};

const encodeWord = word => {
    if (!isWordEncodable(word)) {
        return {
            encoded: false,
            encodedWord: word
        };
    }

    const firstLetter = word[0];
    const lastLetter = word[word.length - 1];  
    const wordBody = word.slice(1, -1);

    const encodedBody = wordBody
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    const encodedWord = `${firstLetter}${encodedBody}${lastLetter}`;

    if (word === encodedWord) {
        return encodeWord(word);
    }

    return {
        encoded: true,
        encodedWord
    };
};

const encodeText = text => {
    let words = [];

    const encodedText = text.replace(/[a-zA-Zàèìòù]+/g, word => {
        const { encoded, encodedWord } = encodeWord(word);

        if (encoded) {
            words = [...words, word];
        }

        return encodedWord;
    });

    return {
        words,
        encodedText
    };
};




module.exports = {
    encodeText
};

