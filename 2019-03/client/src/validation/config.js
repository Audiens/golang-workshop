const validateConfiguration = {
    'first_name': [
        { minLenght: 3 },
        { noNumbers: true },
        { noSpecialChars: true },
    ],
    'last_name':[
        { minLenght: 3 },
        { noNumbers: true },
        { noSpecialChars: true },
    ],
    'email':[
        { minLenght: 3 },
        { email: true}
    ],
    'fiscal_code':[
        { minLenght: 16 },
        { maxLenght: 16 },
        { noSpecialChars: true },
    ],
    'birth_date': [
        { isDate: true },
    ]
}

const validationMessages = {
    'minLenght': 'Numero di caratteri insufficiente',
    'maxLenght': 'Numero di caratteri eccessivo',
    'noNumbers':'Non inserire numeri',
    'noSpecialChars': 'Non inserire caratteri speciali',
    'isDate': 'Inserisci una data valida',
    'email': 'Inserisci una email valida',
}

export { validateConfiguration, validationMessages }
