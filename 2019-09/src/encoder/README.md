# Text "Encoder"
Scrivere una funzione di codifica del testo secondo queste regole:

1. Per ogni parola del testo originale lasciare il primo e l'ultimo carattere nella loro posizione,
   ma mescola tutti tutti gli altri caratteri della parola;

2. Se possibile, la parola codificata non dovrebbe essere la stessa della parola originale;

3. Qualunque cosa non sia una parola (spazi bianchi, punteggiatura, !, ?...) non deve essere toccata e 
   quindi va lasciata nella sua posizione originale;

Per rendere possibile la decodifica, la funzione di encoder deve restiuire:
1. il testo codificato;
2. l'elenco delle parole effettivamente mescolate (codificate).

## Esempio
### Testo originale
```
Oggi ho comprato il mio (miiiiio) nuuuuovo potentissimo computer. 
Giocherò a Campo Minato!
```

### Testo codificato
```
Oggi ho capromto il mio (miiiiio) nuuuouvo ptoensstiimo ceomuptr. 
Ghiocreò a Cmpao Mnatio!
```

### Elenco delle parole codificate
```
comprato nuuuuovo potentissimo computer Giocherò Campo Minato
```

In `encoder.test.js` ci sono i test e i nomi dei relativi metodi da implementare per completare e 
superare questo task.
  
## Condizioni
- Vietato usare for/while;
- Non mutare le variabili.

## Risorse
* https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Set
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace