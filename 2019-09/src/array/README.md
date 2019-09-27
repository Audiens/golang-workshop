# Array

In `root/data.js` è presente l'elenco (`items`) della spesa fatta da Giulio, Stefano, Martina ed Anna.
Ogni `item` è composto da:
- `name` nome del prodotto acquistato;
- `value` il costo da pagare;
- `type` tipologia del prodotto: `meat`, `fruit`, `vegetable` o `alcohol`;
- `buyer` chi ha comprato il prodotto.
  
In `array.js` usare Array#filter, Array#map, Array#every, Array#some e Array#reduce per:

1. Aggiungere ad ogni `item` la proprietà `finalValue` che rappresenta il costo finale pagato per quel prodotto.
A `value` può essere applicato uno sconto o un sovrapprezzo:

      1.1 se è stato comprato almeno un prodotto di tipo `meat`, almeno uno di tipo `fruit` e almeno uno di 
        tipo `vegetable` (e nessun alcolico) deve essere applicato uno **sconto** del **30%** su ogni prodotto acquistato;
        
      1.2 altrimenti; se è stato comprato almeno un `vegetable` deve essere applicato uno **sconto** del **10%** 
        sul prodotto `vegetable`;
    
      1.3 altrimenti; se sono stati comprati solo `alcohol` deve essere applicato un **sovrapprezzo** del **10%**.

2. Calcolare il totale che Giulio, Stefano e Martina devono pagare tenendo conto degli eventuali sconti o sovraprezzi.

3. Aggiungere ad `items` un nuovo `item`.


In `array.test.js` ci sono i test e i nomi dei relativi metodi da implementare per completare e 
superare questo task.
  

## Condizioni

- Vietato usare for/while o Array#forEach;
- Usare solo i metodi elencati in "Risorse";
- Non mutare le variabili.


## Risorse

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce