const basket = require('../data')
const {getItemsByBuyer, getItemsByBuyer2, getTotal, addFinalValue, compose, pipeline} = require('./conposition');


describe('Composition/Pipeline', () => {

    it('should calculate the final total cost using the pipeline function', () => {
        const items = getItemsByBuyer(basket.items, 'Stefano');

        const total = pipeline(
            addFinalValue,
            getTotal
        )(items);

        expect(total).toEqual(9.772)
    });

    it('should calculate the final total cost using the pipeline function/2', () => {

        const total = pipeline(
            getItemsByBuyer2('Stefano'),
            addFinalValue,
            getTotal
        )(basket.items);

        expect(total).toEqual(9.772)
    });

    it('should calculate the final total cost using the composition function', () => {
        const items = getItemsByBuyer(basket.items, 'Stefano');

        const total = compose(
            getTotal,
            addFinalValue
        )(items);

        expect(total).toEqual(9.772)
    });

});