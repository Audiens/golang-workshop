function addFinalValue(items) {
    const calculate = getFinalValue(items);

    return items.map(item => ({
        ...item,
        finalValue: calculate(item)
    }))
}

function getFinalValue(items) {

    const hasHealthyFood = hasBoughtHealthyFood(items);
    const hasOnlyAlcohol = hasBoughtOnlyAlcohol(items);
    const hasVegetables = hasBoughtVegetables(items);

    // const {hasHealthyFood, hasOnlyAlcohol, hasVegetables} = findInfo(items);

    return function(item) {
        const {value, type} = item;

        if(hasHealthyFood) {
            return value - getDiscount(value, 30)
        }

        if(hasVegetables) {
            return type === 'vegetable'
                ? value - getDiscount(value, 10)
                : value
        }

        if(hasOnlyAlcohol) {
            return value + getDiscount(value, 10)
        }
    }

}



function getDiscount(value, percentage) {
    return value * (percentage / 100)
}

function getTotal(items) {
    return  items.reduce((acc, item,) => acc + item.finalValue, 0);
}

function hasBoughtOnlyAlcohol(items) {
    return items.every(item => item.type === 'alcohol')
}

function hasBoughtVegetables(items) {
    return items.some(item => item.type === 'vegetable')
}

function hasBoughtHealthyFood(items) {
    return items.every(item => item.type !== 'alcohol')
}

function findInfo(items) {
    return items.reduce((obj, item) => ({
        hasOnlyAlcohol: obj.hasOnlyAlcohol && item.type === 'alcohol',
        hasVegetables: obj.hasVegetables || item.type === 'vegetable',
        hasHealthyFood: obj.hasHealthyFood && item.type !== 'alcohol'
    }), {hasOnlyAlcohol: true, hasVegetables: false, hasHealthyFood: true})
}



module.exports = {
    getTotal,
    addFinalValue,
};

