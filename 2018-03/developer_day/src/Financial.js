
export const rata = (capitale,tasso,durata) => {
	const t = convertiTasso(tasso)
	const d = Math.pow((1+t),-durata)
	return capitale*(t/(1-d))
}

export const convertiTasso = (tasso) => {
	return (tasso/100)/12
}

export const ammortamento = (capitale,tasso,durata) => {
  const r = rata(capitale, tasso, durata)
  const ammortamento = []

  for (let m = 0; m < durata; m += 1) {

    let cp = (ammortamento[m-1] ? ammortamento[m-1].debitoResiduo : capitale)
    let quotaInteressi = interessiRata(cp,tasso)
    let quotaCapitale = (r-quotaInteressi)
    let capitaleVersato = (ammortamento[m-1] ? ammortamento[m-1].capitaleVersato : 0) + quotaCapitale
    let debitoResiduo = (ammortamento[m-1] ? ammortamento[m-1].debitoResiduo : capitale) - quotaCapitale
    let interessiVersati = (ammortamento[m-1] ? ammortamento[m-1].interessiVersati : 0) + quotaInteressi

    ammortamento[m] = {
    	mese: m+1,
			rata: r,
			quotaInteressi: quotaInteressi,
			quotaCapitale: quotaCapitale,
      capitaleVersato: capitaleVersato,
      debitoResiduo: debitoResiduo,
      interessiVersati: interessiVersati
    }
  }


  return ammortamento
}

export const interessiRata = (capitale,tasso) => {
  const t = convertiTasso(tasso)
  return capitale*t
}
