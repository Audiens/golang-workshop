function addFinalValue(items) {
    return items.map(item => ({
        ...item,
        finalValue: getFinalValue(items, item)
    }))
}

function getItemsByBuyer(items, buyerName) {
    return items.filter(item => item.buyer === buyerName)
}

function getFinalValue(items, item) {
    const {value, type} = item;

    if(hasBoughtHealthyFood(items)) {
        return value - getDiscount(value, 30)
    }

    if(hasBoughtVegetables(items)) {
        return type === 'vegetable'
            ? value - getDiscount(value, 10)
            : value
    }

    if(hasBoughtOnlyAlcohol(items)) {
        return value + getDiscount(value, 10)
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
    getItemsByBuyer,
    getTotal,
    addFinalValue,
    addItem
};

