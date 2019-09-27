const {decodeText} = require('./decoder');


describe('Decoder', () => {

    it('should decode these texts', () => {
        const encodedText = 'Oggi ho capromto il mio (miiiiio) nuuuouvo ptoensstiimo ceomuptr. Ghiocreò a Cmpao Mnatio!';
        const originalWords = 'comprato nuuuuovo potentissimo computer Giocherò Campo Minato';
        const text = 'Oggi ho comprato il mio (miiiiio) nuuuuovo potentissimo computer. Giocherò a Campo Minato!';

        const decodedText = decodeText(encodedText, originalWords);

        expect(decodedText).toBe(text);
    });
});