const fieldsExample2 = dlocalInstance.fields({
    fonts: [{
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
    }],
    locale: 'en',
    country: 'BR'
});

// chek other elements of the form

let name = document.getElementById('name')
let nameContainer = document.getElementById('nameContainer')

let country = document.getElementById('country')
let countryContainer = document.getElementById('countryContainer')

let cpf_cnpj = document.getElementById('cpf_cnpj')
let cpf_cnpjContainer = document.getElementById('cpf_cnpjContainer')

// onChange
name.addEventListener("keyup", function () {
    checkRequired(name, nameContainer)
})

country.addEventListener("onchange", function () {
    checkRequired(country, countryContainer)
})


cpf_cnpj.addEventListener("keyup", function () {
    checkRequired(cpf_cnpj, cpf_cnpjContainer)
})

// onAutofilled

const onAnimationStart = event => {
    switch (event.animationName) {
        case 'onAutoFillStart':
            document.getElementById('nameContainer').classList.add("autofilled");
            break;
        case 'onAutoFillCancel':
            document.getElementById('nameContainer').classList.remove("autofilled");
            break;
    }
};
name.addEventListener('animationstart', onAnimationStart);

function checkRequired(input, container) {
    if (input.value) {
        container.classList.remove("hasError");
        return true;
    } else {
        container.classList.add("hasError");
        return false;
    }
}

// on submit

function submit() {
    const isNameComplete = checkRequired(name, nameContainer);
    const isCountryComplete = checkRequired(country, countryContainer);
    const isCPF_CNPJComplete = checkRequired(cpf_cnpj, cpf_cnpjContainer);
    const isPanOk = !isPanEmpty && !panHasError;
    const isExpirationOk = !isExpirationEmpty && !expirationHasError;
    const isCvvOk = !isCvvEmpty && !cvvHasError;
    if (!isPanOk) {
        document.getElementById('fieldPanContainer').classList.add("Field--required");
        document.getElementById('fieldPanContainer').classList.add("hasError");
    }
    if (!isExpirationOk) {
        document.getElementById('fieldExpirationContainer').classList.add("Field--required");
        document.getElementById('fieldExpirationContainer').classList.add("hasError");
    }
    if (!isCvvOk) {
        document.getElementById('fieldCVVContainer').classList.add("Field--required");
        document.getElementById('fieldCVVContainer').classList.add("hasError");
    }

    if (!isPanOk || !isExpirationOk || !isCvvOk || !isNameComplete || !isCountryComplete || !
        isCPF_CNPJComplete) {
        return;
    }
    loader(true)
    dlocalInstance.createToken(panField, {
            Name: name.value
        }).then((result) => {
            loader(false)
            var example = document.querySelector(".example-2");
            example.querySelector(".token").innerText = result.token;
            example.classList.add("submitted");
        })
        .catch((response) => {
            loader(false)
        })
}

// config fields

const panField = fieldsExample2.create('pan', {
    style: {
        base: {
            fontSize: "15px",
            fontFamily: "'Open Sans', sans-serif",
            lineHeight: '30px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            iconColor: "#fff",
            '::placeholder': {
                color: "#fff"
            }
        },
        focus: {
            iconColor: "#adbfd3",
            '::placeholder': {
                color: "#adbfd3"
            }
        }
    },
    placeholder: "4111 1111 1111 1111",
    hideIcon: true
});

const cvvField = fieldsExample2.create('cvv', {
    style: {
        base: {
            fontSize: "15px",
            fontFamily: "'Open Sans', sans-serif",
            lineHeight: '30px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            '::placeholder': {
                color: "white"
            }
        },
        focus: {
            '::placeholder': {
                color: "#adbfd3"
            }
        }
    },
    placeholder: "123"
});



const expirationField = fieldsExample2.create('expiration', {
    style: {
        base: {
            fontSize: "15px",
            fontFamily: "'Open Sans', sans-serif",
            lineHeight: '30px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            '::placeholder': {
                color: "white"
            }
        },
        focus: {
            '::placeholder': {
                color: "#adbfd3"
            }
        }
    },
    placeholder: monthStr + "/" + year
});

// mount fields

panField.mount(document.getElementById('containerPan'));
expirationField.mount(document.getElementById('containerExpiration'));
cvvField.mount(document.getElementById('containerCVV'));

// onReady

let isPanReady = false;
panField.on('ready', function (event) {
    isPanReady = true;
    if (isPanReady && isExpirationReady && isCVVReady) {
        loader(false);
    }
});

let isExpirationReady = false;
expirationField.on('ready', function (event) {
    isExpirationReady = true;
    if (isPanReady && isExpirationReady && isCVVReady) {
        loader(false);
    }
});

let isCVVReady = false;
cvvField.on('ready', function (event) {
    isCVVReady = true;
    if (isPanReady && isExpirationReady && isCVVReady) {
        loader(false);
    }
});


// onClick

function clickPan() {
    panField.focus();
}

function clickExpiration() {
    expirationField.focus();
}

function clickCVV() {
    cvvField.focus();
}

// onBlur
let isPanEmpty = true;
let panHasError = false;
panField.on('blur', function (event) {

    isPanEmpty = event.empty;
    if (event.error) {
        panHasError = true;
        document.getElementById('fieldPanContainer').classList.add("Field--required");
        document.getElementById('fieldPanContainer').classList.add("hasError");
        let error = event.error.message ? event.error.message : "Enter your credit card number."
        document.getElementById('panErrorMsg').innerHTML = error
    } else {
        panHasError = false;
        document.getElementById('fieldPanContainer').classList.remove("Field--required");
        document.getElementById('fieldPanContainer').classList.remove("hasError");
    }

    document.getElementById('containerPan').classList.remove("focus");
})

let isExpirationEmpty = true;
let expirationHasError = false;
expirationField.on('blur', function (event) {
    isExpirationEmpty = event.empty;
    if (event.error) {
        expirationHasError = true;
        document.getElementById('fieldExpirationContainer').classList.add("Field--required");
        document.getElementById('fieldExpirationContainer').classList.add("hasError");
        let error = event.error.message ? event.error.message : "Enter your credit card expiration."
        document.getElementById('expirationErrorMsg').innerHTML = error
    } else {
        expirationHasError = false;
        document.getElementById('fieldExpirationContainer').classList.remove("Field--required");
        document.getElementById('fieldExpirationContainer').classList.remove("hasError");
    }
    document.getElementById('containerExpiration').classList.remove("focus");
})

let isCvvEmpty = true;
let cvvHasError = false;
cvvField.on('blur', function (event) {
    isCvvEmpty = event.empty;
    if (event.error) {
        cvvHasError = true;
        document.getElementById('fieldCVVContainer').classList.add("Field--required");
        document.getElementById('fieldCVVContainer').classList.add("hasError");
        let error = event.error.message ? event.error.message : "Enter your credit card CVV."
        document.getElementById('cvvErrorMsg').innerHTML = error
    } else {
        cvvHasError = false;
        document.getElementById('fieldCVVContainer').classList.remove("Field--required");
        document.getElementById('fieldCVVContainer').classList.remove("hasError");
    }
    document.getElementById('containerCVV').classList.remove("focus");
})

// onFocus

panField.on('focus', function () {
    document.getElementById('containerPan').classList.add("focus");
})

expirationField.on('focus', function () {
    document.getElementById('containerExpiration').classList.add("focus");
})

cvvField.on('focus', function () {
    document.getElementById('containerCVV').classList.add("focus");
})

// onAutofilled

panField.on('autofilled', function (event) {
    if (event.autofilled) {
        document.getElementById('fieldPanContainer').classList.add("autofilled");
    } else {
        document.getElementById('fieldPanContainer').classList.remove("autofilled");
    }
})

expirationField.on('autofilled', function (event) {
    if (event.autofilled) {
        document.getElementById('fieldExpirationContainer').classList.add("autofilled");
    } else {
        document.getElementById('fieldExpirationContainer').classList.remove("autofilled");
    }
})

cvvField.on('autofilled', function (event) {
    if (event.autofilled) {
        document.getElementById('fieldCVVContainer').classList.add("autofilled");
    } else {
        document.getElementById('fieldCVVContainer').classList.remove("autofilled");
    }
})

// onChange

panField.on('change', function (event) {

    if (!event.error) {
        panHasError = false;
        document.getElementById('fieldPanContainer').classList.remove("hasError");
        document.getElementById('fieldPanContainer').classList.remove("Field--required");
    } else {
        panHasError = true;
        document.getElementById('fieldPanContainer').classList.add("hasError");
        document.getElementById('fieldPanContainer').classList.add("Field--required");
        let error = event.error.message ? event.error.message : "Enter your credit card number."
        document.getElementById('panErrorMsg').innerHTML = error
    }
    isPanEmpty = event.empty;
    if (event.empty) {
        document.getElementById('containerPan').classList.add("empty");
    } else {
        document.getElementById('containerPan').classList.remove("empty");
    }
})

expirationField.on('change', function (event) {
    if (!event.error) {
        expirationHasError = false;
        document.getElementById('fieldExpirationContainer').classList.remove("Field--required");
        document.getElementById('fieldExpirationContainer').classList.remove("hasError");
    } else {
        expirationHasError = true;
        document.getElementById('fieldExpirationContainer').classList.add("Field--required");
        document.getElementById('fieldExpirationContainer').classList.add("hasError");
        let error = event.error.message ? event.error.message : "Enter your credit card expiration."
        document.getElementById('expirationErrorMsg').innerHTML = error
    }
    isExpirationEmpty = event.empty;
    if (event.empty) {
        document.getElementById('containerExpiration').classList.add("empty");
    } else {
        document.getElementById('containerExpiration').classList.remove("empty");
    }
})


cvvField.on('change', function (event) {
    if (!event.error) {
        cvvHasError = false;
        document.getElementById('fieldCVVContainer').classList.remove("Field--required");
        document.getElementById('fieldCVVContainer').classList.remove("hasError");
    } else {
        cvvHasError = true;
        document.getElementById('fieldCVVContainer').classList.add("Field--required");
        document.getElementById('fieldCVVContainer').classList.add("hasError");
        let error = event.error.message ? event.error.message : "Enter your credit card CVV."
        document.getElementById('cvvErrorMsg').innerHTML = error
    }
    isCvvEmpty = event.empty;
    if (event.empty) {
        document.getElementById('containerCVV').classList.add("empty");
    } else {
        document.getElementById('containerCVV').classList.remove("empty");
    }
})

// onBrand

panField.on('brand', function (event) {
    let visa = document.getElementById('visa')
    let master = document.getElementById('mastercard')
    let amex = document.getElementById('amex')
    let discover = document.getElementById('discover')
    switch (event.brand) {
        case "visa":
            showOnlyFlag(visa, master, amex, discover);
            break;
        case "mastercard":
            showOnlyFlag(master, visa, amex, discover);
            break;
        case "american-express":
            showOnlyFlag(amex, visa, master, discover);
            break;
        case "discover":
            showOnlyFlag(discover, visa, master, amex);
            break;
        default:
            visa.classList.add("first");
            master.classList.remove("first");
            amex.classList.remove("first");
            discover.classList.remove("first");
            visa.style.display = "block"
            master.style.display = "block"
            amex.style.display = "block"
            discover.style.display = "block"
    }
})

function showOnlyFlag(show, hide1, hide2, hide3) {
    show.classList.add("first");
    hide1.classList.remove("first");
    hide2.classList.remove("first");
    hide3.classList.remove("first");
    show.style.display = "block"
    hide1.style.display = "none"
    hide2.style.display = "none"
    hide3.style.display = "none"
}

// loader

function loader(show) {
    document.getElementById("loader-example-2").style.visibility = show ? "visible" : "hidden";
    document.getElementById("customContainer").style.visibility = show ? "hidden" : "visible";
    document.getElementById("customContainer").style.opacity = show ? 0 : 1;
}


const fields = [panField, expirationField, cvvField]
const inputs = [name, country, cpf_cnpj]
let formClass = '.example-2'
let example = document.querySelector(formClass);

let resetButton = example.querySelector('a.reset');
//let error = form.querySelector('.error');

resetButton.addEventListener('click', function (e) {
    e.preventDefault();

    inputs.forEach(function (input) {
        input.value = ''
    });

    // Clear each Smart-Field.
    fields.forEach(function (field) {
        field.clear();
    });

    document.getElementById('fieldCVVContainer').classList.remove("autofilled");
    document.getElementById('fieldExpirationContainer').classList.remove("autofilled");
    document.getElementById('fieldPanContainer').classList.remove("autofilled");
    document.getElementById('nameContainer').classList.remove("autofilled");
    example.classList.remove('submitted');

});