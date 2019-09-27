
function pipeline(...fns) {
    const [fn, ...restFns] = fns;

    return function(val) {
        return !fn
            ? val
            : pipeline(...restFns)(fn(val))
    }
}

function compose(...fns) {
    const [fn, ...restFns] = [...fns].reverse();

    return function(val) {
        return !fn
            ? val
            : compose(...restFns)(fn(val))
    }
}

function getItemsByBuyer(items, buyerName) {
    return items.filter(item => item.buyer === buyerName)
}

function getItemsByBuyer2(buyerName) {
    return function(items) {
        return items.filter(item => item.buyer === buyerName)
    }
}

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

    return function(item) {
        const {value, type} = item;

        if(hasHealthyFood) {
            return value - getDiscount(value, 30)
        }

        if(hasOnlyAlcohol) {
            return type === 'vegetable'
                ? value - getDiscount(value, 10)
                : value
        }

        if(hasVegetables) {
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



function addItem(items, newItem) {
    return [...items, newItem]
}

module.exports = {
    pipeline,
    compose,
    getItemsByBuyer,
    getItemsByBuyer2,
    getTotal,
    addFinalValue,
    addItem
};

