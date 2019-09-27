const basket = require('../data')
const {getItemsByBuyer, getTotal, addFinalValue, addItem} = require('./array')


describe('Array', () => {

    describe('Stefano basket', () => {
        let actualItems;
        beforeAll(() => {
            actualItems = Object.freeze(getItemsByBuyer(basket.items, 'Stefano'));
        });

        it('should buy only his items', () => {
            const expected = [
                {name: 'apple', value: 1.86, type: 'fruit', buyer: 'Stefano'},
                {name: 'watermelon', value: 2.93, type: 'fruit', buyer: 'Stefano'},
                {name: 'spinach', value: 2.99, type: 'vegetable', buyer: 'Stefano'},
                {name: 'sausage', value: 2.79, type: 'meat', buyer: 'Stefano'},
                {name: 'beefsteak', value: 3.39, type: 'meat', buyer: 'Stefano'},
            ];
            expect(actualItems).toEqual(expect.arrayContaining(expected))
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

        it('should calculate the final total cost', () => {
            const itemsWithFinalValue = addFinalValue(actualItems);
            expect(getTotal(itemsWithFinalValue)).toEqual(9.772)
        });

        it('should add new item into basket', () => {
            const newItem = {name: 'white wine', value: 5.23,  type: 'alcohol', buyer: 'Stefano'};
            const newItems = addItem(actualItems, newItem);

            expect(newItems).toHaveLength(6)
        })

    });

    describe('Martina basket', () => {
        let actualItems;
        beforeAll(() => {
            actualItems = Object.freeze(getItemsByBuyer(basket.items, 'Martina'));
        });

        it('should buy only her items', () => {
            const expected = [
                {name: 'bananas', value: 1.73, type: 'fruit', buyer: 'Martina'},
                {name: 'broccoli', value: 1.40, type: 'vegetable', buyer: 'Martina'},
                {name: 'cauliflower', value: 2.29, type: 'vegetable', buyer: 'Martina'},
                {name: 'carrots', value: 1.99, type: 'vegetable', buyer: 'Martina'},
                {name: 'rum', value: 9.90, type: 'alcohol', buyer: 'Martina'},
            ];

            expect(actualItems).toEqual(expect.arrayContaining(expected))
        });

        it('should add the finalValue property to each item', () => {
            const expected = [
                {name: 'bananas', value: 1.73, finalValue: 1.73, type: 'fruit', buyer: 'Martina'},
                {name: 'broccoli', value: 1.40, finalValue: 1.26,type: 'vegetable', buyer: 'Martina'},
                {name: 'cauliflower', value: 2.29, finalValue: 2.061,type: 'vegetable', buyer: 'Martina'},
                {name: 'carrots', value: 1.99, finalValue: 1.791,type: 'vegetable', buyer: 'Martina'},
                {name: 'rum', value: 9.90, finalValue: 9.90, type: 'alcohol', buyer: 'Martina'},
            ];

            expect(addFinalValue(actualItems)).toEqual(expect.arrayContaining(expected))
        });

        it('should calculate the final total cost', () => {
            const itemsWithFinalValue = addFinalValue(actualItems);
            expect(getTotal(itemsWithFinalValue)).toEqual(16.742)
        });

        it('should add new item into basket', () => {
            const newItem = {name: 'white wine', value: 5.23,  type: 'alcohol', buyer: 'Martina'};
            const newItems = addItem(actualItems, newItem);

            expect(newItems).toHaveLength(6)
        })
    });

    describe('Giulio basket', () => {
        let actualItems;
        beforeAll(() => {
            actualItems = Object.freeze(getItemsByBuyer(basket.items, 'Giulio'));
        });

        it('should buy only her items', () => {
            const expected = [
                {name: 'beer', value: 2.29, type: 'alcohol', buyer: 'Giulio'},
                {name: 'gin', value: 13.99, type: 'alcohol', buyer: 'Giulio'},
                {name: 'vodka', value: 7.39, type: 'alcohol', buyer: 'Giulio'},
                {name: 'wine', value: 5.23, type: 'alcohol', buyer: 'Giulio'},
            ];

            expect(actualItems).toEqual(expect.arrayContaining(expected))
        });

        it('should add the finalValue property to each item', () => {
            const expected = [
                {name: 'beer', value: 2.29, finalValue: 2.519, type: 'alcohol', buyer: 'Giulio'},
                {name: 'gin', value: 13.99, finalValue: 15.389, type: 'alcohol', buyer: 'Giulio'},
                {name: 'vodka', value: 7.39, finalValue: 8.129, type: 'alcohol', buyer: 'Giulio'},
                {name: 'wine', value: 5.23, finalValue: 5.753, type: 'alcohol', buyer: 'Giulio'},
            ];

            expect(addFinalValue(actualItems)).toEqual(expect.arrayContaining(expected))
        });

        it('should calculate the final total cost', () => {
            const itemsWithFinalValue = addFinalValue(actualItems);
            expect(getTotal(itemsWithFinalValue)).toBeCloseTo(31.79)
        });

        it('should add new item into basket', () => {
            const newItem = {name: 'white wine', value: 5.23,  type: 'alcohol', buyer: 'Giulio'};
            const newItems = addItem(actualItems, newItem);

            expect(newItems).toHaveLength(5)
        })
    })

});