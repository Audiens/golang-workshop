const basket = require('../data');
const {getItemsByBuyer} = require('../array/array.js');
const {addFinalValue} = require('./hof');


describe('High Order Function', () => {

    let actualItems;
    beforeAll(() => {
        actualItems = Object.freeze(getItemsByBuyer(basket.items, 'Stefano'));
    });

    it('should add the finalValue property to each item', () => {
        const expected = [
            {name: 'apple', value: 1.86, finalValue: 1.302, type: 'fruit', buyer: 'Stefano'},
            {name: 'watermelon', value: 2.93, finalValue: 2.051, type: 'fruit', buyer: 'Stefano'},
            {name: 'spinach', value: 2.99, finalValue: 2.093, type: 'vegetable', buyer: 'Stefano'},
            {name: 'sausage', value: 2.79, finalValue: 1.953, type: 'meat', buyer: 'Stefano'},
            {name: 'beefsteak', value: 3.39, finalValue: 2.373, type: 'meat', buyer: 'Stefano'},
        ];
        expect(addFinalValue(actualItems)).toEqual(expect.arrayContaining(expected))
    });
});