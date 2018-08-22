var example = document.querySelector(".example-4");
var form = example.querySelector('form');

const panExample4 = fields.create('pan', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "white",
            '::placeholder': {
                color: "#f0810f"
            },
            iconColor: "#f0810f"
        },
        focus: {
            color: "#424770",
            '::placeholder': {
                color: "#cfd7df"
            }
        }
    }
});



const expirationExample4 = fields.create('expiration', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "white",
            '::placeholder': {
                color: "#f0810f"
            }
        },
        focus: {
            color: "#424770",
            '::placeholder': {
                color: "#cfd7df"
            }
        }
    }
});

const cvvExample4 = fields.create('cvv', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "white",
            '::placeholder': {
                color: "#f0810f"
            }
        },
        focus: {
            color: "#424770",
            '::placeholder': {
                color: "#cfd7df"
            }
        }
    }
});


let isPanExample4Completed = false;
panExample4.on('complete', function (event) {
    isPanExample4Completed = event.complete;
    expirationExample4.focus()
})

let isPanExample4Ready = false;
panExample4.on('ready', function (event) {
    isPanExample4Ready = true;
    if (isPanExample4Ready && isExpirationExample4Ready && isCVVExample4Ready) {
        example.classList.remove('submitting');
    }
});

panExample4.on('focus', function (event) {
    document.getElementById('example-4-pan').classList.add("focus");
})

panExample4.on('blur', function (event) {
    document.getElementById('example-4-pan').classList.remove("focus");
})

let isExpirationExample4Completed = false;
expirationExample4.on('complete', function (event) {
    isExpirationExample4Completed = event.complete;
    cvvExample4.focus();
})

let isExpirationExample4Ready = false;
expirationExample4.on('ready', function (event) {
    isExpirationExample4Ready = true;
    if (isPanExample4Ready && isExpirationExample4Ready && isCVVExample4Ready) {
        example.classList.remove('submitting');
    }
});

expirationExample4.on('focus', function (event) {
    document.getElementById('example-4-expiration').classList.add("focus");
})

expirationExample4.on('blur', function (event) {
    document.getElementById('example-4-expiration').classList.remove("focus");
})

let isCvvExample4Completed = false;
cvvExample4.on('complete', function (event) {
    isCvvExample4Completed = event.complete;
})

let isCVVExample4Ready = false;
cvvExample4.on('ready', function (event) {
    isCVVExample4Ready = true;
    if (isPanExample4Ready && isExpirationExample4Ready && isCVVExample4Ready) {
        example.classList.remove('submitting');
    }
});

cvvExample4.on('focus', function (event) {
    document.getElementById('example-4-cvv').classList.add("focus");
})

cvvExample4.on('blur', function (event) {
    document.getElementById('example-4-cvv').classList.remove("focus");
})


document.getElementById('fields-form-example-4').onsubmit = function (e) {
    e.preventDefault();

    var error = form.querySelector('.error');
    var errorMessage = error.querySelector('.message');
    // Trigger HTML5 validation UI on the form if any of the inputs fail
    // validation.
    var plainInputsValid = true;
    Array.prototype.forEach.call(form.querySelectorAll('input'), function (
        input
    ) {
        if (input.checkValidity && !input.checkValidity()) {
            plainInputsValid = false;
            return;
        }
    });
    if (!plainInputsValid) {
        triggerBrowserValidation(form);
        return;
    }
    if (!isPanExample4Completed || !isExpirationExample4Completed || !isCvvExample4Completed) {
        if (!errorMessage.innerText) {
            error.classList.add('visible');
            errorMessage.innerText = 'Complete credit card data.';
        }

        return;
    }
    // Show a loading screen...
    example.classList.add('submitting');
    dlocalInstance.createToken(cvvExample4, {
        name: document.getElementById('example-4-name').value
    }).then((result) => {
        error.classList.remove('visible');
        errorMessage.innerText = "";
        example.classList.remove('submitting');
        example.querySelector(".token").innerText = result.token;
        example.classList.add("submitted");
    }).catch((result) => {
        example.classList.remove('submitting');
        error.classList.add('visible');
        errorMessage.innerText = result.error.message;
    });

}
registerClearBtn("example-4", [panExample4, expirationExample4, cvvExample4])
registerEvents("example-4", [panExample4, expirationExample4, cvvExample4])

panExample4.mount(document.getElementById('example-4-pan'));
expirationExample4.mount(document.getElementById('example-4-expiration'));
cvvExample4.mount(document.getElementById('example-4-cvv'));

let actualBrand = null;
panExample4.on('brand', function (event) {

    if (event.brand && actualBrand !== event.brand) {
        actualBrand = event.brand;

        dlocalInstance.createInstallmentsPlan(panExample4, 500, "BRL")
            .then((result) => {
                var installmentsSelect = form.querySelector('.installments');
                buildInstallments(installmentsSelect, result.installments);
            }).catch((result) => {
                console.error(result);
                error.classList.add('visible');
                errorMessage.innerText = result.error.message;
            });
    }
});


function buildInstallments(installmentsInput, installmentsPlan) {
    const installmentsOptions = installmentsPlan.installments.reduce(function (options, plan) {
        options += "<option value=" + plan.id + ">" + plan.installments + " of " + "BRL" + " " + plan.installment_amount + " (Total : " + "BRL" + " " + plan.total_amount + ")</option>";
        return options;
    }, "");
    installmentsInput.disabled = false;
    installmentsInput.innerHTML = installmentsOptions;
}