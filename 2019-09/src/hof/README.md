# High Order Function / Closure
Per l'aggiunta del `finalValue` una soluzione potrebbe essere qualcosa del genere

```js 
function addFinalValue(items) {
    return items.map(item => ({
        ...item,
        finalValue: getFinalValue(items, item)
    }))
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

function hasBoughtOnlyAlcohol(items) {
    return items.every(item => item.type === 'alcohol')
}

function hasBoughtVegetables(items) {
    return items.some(item => item.type === 'vegetable')
}

function hasBoughtHealthyFood(items) {
    return items.every(item => item.type !== 'alcohol')
}

function getDiscount(value, percentage) {
    return value * (percentage / 100)
}
```

Questa soluzione funziona, ma è poco performante perchè ha un tempo computazionale di O(n^2): `hasBoughtOnlyAlcohol`,
`hasBoughtVegetables` e `hasBoughtHealthyFood` sono ricalcolati ad ogni iterazione di `Array#map`.

1. Com'è possibile calcolarli solo una volta e ridurre il tempo computazionale da O(n^2) a O(n)?
2. Anche riducendo il tempo a O(n) sarebbe necessario fare tre iterazioni per ottenere le tre informazioni. 
   Come si potrebbe ricavare `hasBoughtOnlyAlcohol`,`hasBoughtVegetables` e `hasBoughtHealthyFood` con un unico ciclo?


In `hof.test.js` ci sono i test e i nomi dei relativi metodi da implementare per completare e 
superare questo task.
  

## Condizioni
- Vietato usare for/while o Array#forEach;
- Non mutare le variabili.
- Vietato calcolare  `hasBoughtOnlyAlcohol()`,`hasBoughtVegetables()` e `hasBoughtHealthyFood()` prima di `Array#map` 
  per poi passare i tre risultati a `addFinalValue(item, hasBoughtOnlyAlcohol, hasBoughtVegetables, hasBoughtHealthyFood)`


## Risorse
* https://www.html.it/pag/47900/clousure-e-scope/
* http://www.zsoltnagy.eu/higher-order-functions-in-javascript/