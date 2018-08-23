var example5 = document.querySelector(".example-5");
var form5 = example5.querySelector('form');
var error5 = form5.querySelector('.error');
var errorMessage5 = error5.querySelector('.message');

const panExample5 = fields.create('pan', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "#666",
            '::placeholder': {
                color: "#c1c1c1"
            },
            iconColor: "#c1c1c1"
        }
    },
    placeholder: "4111 1111 1111 1111"
});

let actualBrandExample5 = null;
panExample5.on('brand', function (event) {

    if (event.brand && actualBrandExample5 !== event.brand) {
        actualBrandExample5 = event.brand;

        dlocalInstance.createInstallmentsPlan(panExample5, 20, "BRL")
            .then((result) => {
                var installmentsSelect5 = form5.querySelector('.installments');
                buildInstallments(installmentsSelect5, result.installments);
            }).catch((result) => {
                console.error(result);
                error5.classList.add('visible');
                errorMessage5.innerText = result.error.message;
            });
    }
});

const expirationExample5 = fields.create('expiration', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "#666",
            '::placeholder': {
                color: "#c1c1c1"
            }
        }
    },
    placeholder: monthStr + "/" + year
});

const cvvExample5 = fields.create('cvv', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "#666",
            '::placeholder': {
                color: "#c1c1c1"
            }
        }
    },
    placeholder: "123"
});


let isPanExample5Completed = false;
panExample5.on('complete', function (event) {
    isPanExample5Completed = event.complete;
    expirationExample5.focus()
})

let isExpirationExample5Completed = false;
expirationExample5.on('complete', function (event) {
    isExpirationExample5Completed = event.complete;
    cvvExample5.focus();
})

let isCvvExample5Completed = false;
cvvExample5.on('complete', function (event) {
    isCvvExample5Completed = event.complete;
})

cardExample4.on('ready', function (event) {


});

let isPanExample5Ready = false;
panExample5.on('ready', function (event) {
    isPanExample5Ready = true;
    if (isPanExample5Ready && isExpirationExample5Ready && isCvvExample5Ready) {
        example5.classList.remove('submitting');
    }
})

let isExpirationExample5Ready = false;
expirationExample5.on('ready', function (event) {
    isExpirationExample5Ready = true;
    if (isPanExample5Ready && isExpirationExample5Ready && isCvvExample5Ready) {
        example5.classList.remove('submitting');
    }
})

let isCvvExample5Ready = false;
cvvExample5.on('ready', function (event) {
    isCvvExample5Ready = true;
    if (isPanExample5Ready && isExpirationExample5Ready && isCvvExample5Ready) {
        example5.classList.remove('submitting');
    }
})


document.getElementById('fields-form-example-5').onsubmit = function (e) {
    e.preventDefault();

    // Trigger HTML5 validation UI on the form if any of the inputs fail
    // validation.
    var plainInputsValid = true;
    Array.prototype.forEach.call(form5.querySelectorAll('input'), function (
        input
    ) {
        if (input.checkValidity && !input.checkValidity()) {
            plainInputsValid = false;
            return;
        }
    });
    if (!plainInputsValid) {
        triggerBrowserValidation(form5);
        return;
    }
    if (!isPanExample5Completed || !isExpirationExample5Completed || !isCvvExample5Completed) {
        if (!errorMessage5.innerText) {
            error5.classList.add('visible');
            errorMessage5.innerText = 'Complete credit card data.';
        }

        return;
    }
    // Show a loading screen...
    example5.classList.add('submitting');
    dlocalInstance.createToken(cvvExample5, {
        name: document.getElementById('example-5-name').value
    }).then((result) => {
        error5.classList.remove('visible');
        errorMessage5.innerText = "";
        example5.classList.remove('submitting');
        example5.querySelector(".token").innerText = result.token;
        example5.classList.add("submitted");
    }).catch((result) => {
        example5.classList.remove('submitting');
        error5.classList.add('visible');
        errorMessage5.innerText = result.error.message;
    });

}
registerClearBtn("example-5", [panExample5, expirationExample5, cvvExample5])
registerEvents("example-5", [panExample5, expirationExample5, cvvExample5])

panExample5.mount(document.getElementById('example-5-pan'));
expirationExample5.mount(document.getElementById('example-5-expiration'));
cvvExample5.mount(document.getElementById('example-5-cvv'));