const fieldsExample1 = dlocalInstance.fields({
    fonts: [{
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
    }],
    locale: 'en',
    country: 'BR'
});

var example1 = document.querySelector(".example-1");
var form1 = example1.querySelector('form');
var error1 = form1.querySelector('.error');
var errorMessage1 = error1.querySelector('.message');

const panExample1 = fieldsExample1.create('pan', {
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
        },
        autofilled: {
            color: "#000000"
        }
    },
    placeholder: "4111 1111 1111 1111"
});

let actualBrandExample1 = null;
panExample1.on('brand', function (event) {

    if (event.brand && actualBrandExample1 !== event.brand) {
        actualBrandExample1 = event.brand;

        dlocalInstance.createInstallmentsPlan(panExample1, 20, "BRL")
            .then((result) => {
                var installmentsSelect1 = form1.querySelector('.installments');
                buildInstallments(installmentsSelect1, result.installments);
            }).catch((result) => {
                console.error(result);
                error1.classList.add('visible');
                errorMessage1.innerText = result.error.message;
            });
    }
});

const expirationExample1 = fieldsExample1.create('expiration', {
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
        },
        autofilled: {
            color: "#000000"
        }
    },
    placeholder: monthStr + "/" + year
});

const cvvExample1 = fieldsExample1.create('cvv', {
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


document.getElementById('fields-form-example-1').onsubmit = function (e) {
    e.preventDefault();

    // Trigger HTML5 validation UI on the form if any of the inputs fail
    // validation.
    var plainInputsValid = true;
    Array.prototype.forEach.call(form1.querySelectorAll('input'), function (
        input
    ) {
        if (input.checkValidity && !input.checkValidity()) {
            plainInputsValid = false;
            return;
        }
    });
    if (!plainInputsValid) {
        triggerBrowserValidation(form1);
        return;
    }

    if (errorMessage1.innerText) {
        return;
    }

    // Show a loading screen...
    example1.classList.add('submitting');
    dlocalInstance.createToken(cvvExample1, {
        name: document.getElementById('example-1-name').value
    }).then((result) => {
        error1.classList.remove('visible');
        errorMessage1.innerText = "";
        example1.classList.remove('submitting');
        example1.querySelector(".token").innerText = result.token;
        example1.classList.add("submitted");
    }).catch((result) => {
        example1.classList.remove('submitting');
        error1.classList.add('visible');
        errorMessage1.innerText = result.error.message;
    });

}


registerClearBtn("example-1", [panExample1, expirationExample1, cvvExample1])
registerEvents("example-1", [panExample1, expirationExample1, cvvExample1], ["example-1-pan", "example-1-expiration", "example-1-cvv"])



panExample1.mount(document.getElementById('example-1-pan'));
expirationExample1.mount(document.getElementById('example-1-expiration'));
cvvExample1.mount(document.getElementById('example-1-cvv'));