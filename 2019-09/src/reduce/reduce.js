
function map(array, fn) {
    return array.reduce((acc, val) => {
        return [...acc, fn(val)]
    }, [])
}

function filter(array, fn) {
    return array.reduce((acc, val) => {
        return fn(val) ? [...acc, val] : acc
    }, [])
}

function some(array, fn) {
    return array.reduce((acc, val) => {
        return fn(val) || acc
    }, false)
}

function every(array, fn) {
    return array.reduce((acc, val) => {
        return fn(val) &&  acc
    }, true)
}

function pipeline(...fns) {
    return function(val) {
        return fns.reduce((acc, fn) => {
            return fn(acc)
        }, val)
    }
}

function compose(...fns) {
    return function(val) {
        return [...fns].reverse().reduce((acc, fn) => {
            return fn(acc)
        }, val)
    }
}

function groupBy(items, field) {
    return items.reduce((acc, item) => {
        const fieldName = item[field];
        const accFieldValue = acc[fieldName];
        return {
            ...acc,
            [fieldName]: !!accFieldValue ? accFieldValue + item.value : item.value
        }
    }, {})
}

module.exports = {
    pipeline,
    compose,
    map,
    filter,
    every,
    some,
    groupBy
};

