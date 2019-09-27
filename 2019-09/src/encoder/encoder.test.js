const {encodeText} = require('./encoder');


describe('Encoder', () => {

    // it('tet', () => {
    //     const text = 'Oggi ho comprato il mio (miiiiio) nuuuuovo potentissimo computer. Giocherò a Campo Minato!'
    //     const {words, encodedText} = encodeText(text);
    //
    //     console.log(words, encodedText)
    // })


    it('should NOT encode these words', () => {
        const text = 'the The big tre il lo moon tre! (trrrrrrrre)';
        const {words, encodedText} = encodeText(text);

        expect(words.length).toBe(0);
        expect(encodedText).toBe(text);
    });


    it('should encode these words', () => {
        const text = 'Audiens (bango) bango! calcio test';
        const {words, encodedText} = encodeText(text);

        const textSplit = text.split(' ');
        const encodedTextSplit = encodedText.split(' ');

        expect(words.length).toBe(textSplit.length);
        expect(encodedText).not.toBe(text);

        const firstIndexNotChar = word => /[^a-z]/gi.exec(word) ? /[^a-z]/gi.exec(word).index : -1;
        const lastIndexNotChar = word => /[^a-z]/gi.exec(word.split('').reverse().join('')) ? /[^a-z]/gi.exec(word.split('').reverse().join('')).index : -1;

        for(let i = 0; i < textSplit.length; i++) {
            const word = textSplit[i];
            const encodedWord = encodedTextSplit[i];
            // first letter
            expect(word[0]).toBe(encodedWord[0]);
            // last letter
            expect(word[word.length - 1]).toBe(encodedWord[encodedWord.length - 1]);

            expect(firstIndexNotChar(word)).toBe(firstIndexNotChar(encodedWord));
            expect(lastIndexNotChar(word)).toBe(lastIndexNotChar(encodedWord));
        }
    });
});