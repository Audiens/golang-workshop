# Composition / Pipeline
Usare la composizione delle funzioni per rispondere a 2 delle 3 domande del task **Array** (aggiunta della proprietà 
`finalValue` e il calcolo del costo totale).

Per composizione si intende
```js
    const total = compose(
        getTotal,
        addFinalValue,        
    )(items);
```
o

```js
    const total = pipeline(
        addFinalValue,
        getTotal,
    )(items);
```

La funzione di composizione è una funzione che ha come argomenti altre funzioni. Passa il suo valore iniziale (`items`)
alla prima funzione, la esegue e il suo output viene usato come input per la funzione successiva...

L'unica differenza tra `compose` e `pipeline` è che `pipeline` esegue le funzioni da sinistra verso destra; mentre
`compose` da destra verso sinistra.

In `composition.test.js` ci sono i test e i nomi dei relativi metodi da implementare per completare e superare 
questo task.
  

## Condizioni
- `compose` e `pipeline` devono essere implementati tramite ricorsione
- Non mutare le variabili.