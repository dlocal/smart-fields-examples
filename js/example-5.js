const fieldsExample5 = dlocalInstance.fields({
    fonts: [{
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
    }],
    locale: 'en',
    country: 'BR'
});

var example5 = document.querySelector(".example-5");
var form5 = example5.querySelector('form');
var error5 = form5.querySelector('.error');
var errorMessage5 = error5.querySelector('.message');

const panExample5 = fieldsExample5.create('pan', {
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

const expirationExample5 = fieldsExample5.create('expiration', {
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

const cvvExample5 = fieldsExample5.create('cvv', {
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
    if (!areExample5FieldsCompleated) {
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
let areExample5FieldsCompleated = false;
registerClearBtn("example-5", [panExample5, expirationExample5, cvvExample5], function () {
    actualBrandExample5 = null;
})
registerEvents("example-5", [panExample5, expirationExample5, cvvExample5], ["example-5-pan", "example-5-expiration", "example-5-cvv"], function (compleated) {
    areExample5FieldsCompleated = compleated;
})

panExample5.mount(document.getElementById('example-5-pan'));
expirationExample5.mount(document.getElementById('example-5-expiration'));
cvvExample5.mount(document.getElementById('example-5-cvv'));