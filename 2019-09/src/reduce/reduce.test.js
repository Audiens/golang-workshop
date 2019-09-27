const {map, filter, every, some, compose, pipeline, groupBy} = require('./reduce');


describe('Reduce', () => {
    const list = [20, 30, 55, 80, 90];

    it('should implement map function', () => {
        const add10 = val => val + 10;
        const expected = list.map(add10);
        expect(map(list, add10)).toEqual(expected)
    });

    it('should implement filter function', () => {
        const graterThan = val => val > 20;
        const expected = list.filter(graterThan);
        expect(filter(list, graterThan)).toEqual(expected)
    });

    it('should implement some function', () => {
        const has20 = val => val === 20;
        const expected20 = list.some(has20);
        expect(some(list, has20)).toEqual(expected20)

        const has100 = val => val === 100;
        const expected100 = list.some(has100);
        expect(some(list, has100)).toEqual(expected100)
    });

    it('should implement every function', () => {
        const isInteger = val => Number.isInteger(val);
        const expectedInteger = list.every(isInteger);
        expect(every(list, isInteger)).toEqual(expectedInteger)

        const isString = val => typeof val === 'string';
        const expectedString = list.every(isString);
        expect(every(list, isString)).toEqual(expectedString)
    });

    it('should implement pipeline function', () => {
        const removeUnderscore = (string) => string.replace(/_/g, ' ');
        const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

        const pipelineActual = pipeline(
            removeUnderscore,
            capitalize
        )('my_long_very_long_string');

        expect(pipelineActual).toEqual('My long very long string');
    });

    it('should implement compose function', () => {
        const min = (array) => Math.min(...array);
        const double = (val) => val * val;

        const composeActual = compose(
            double,
            min,
        )([5, 8, 2, 15, 20, 10]);

        expect(composeActual).toEqual(4);
    });
    it('should group item by type to calculate the total', () => {
        const items = [
            {name: 'bananas', value: 1.73, type: 'fruit', buyer: 'Martina'},
            {name: 'broccoli', value: 1.40, type: 'vegetable', buyer: 'Martina'},
            {name: 'cauliflower', value: 2.29, type: 'vegetable', buyer: 'Martina'},
            {name: 'carrots', value: 1.99, type: 'vegetable', buyer: 'Martina'},
            {name: 'rum', value: 9.90, type: 'alcohol', buyer: 'Martina'},
        ];

        const expected = {
            fruit: 1.73,
            vegetable: 5.68,
            alcohol: 9.90,
        };

        expect(groupBy(items, 'type')).toEqual(expected);
    })
});