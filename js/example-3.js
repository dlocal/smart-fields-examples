const fieldsExample3 = dlocalInstance.fields({
    fonts: [{
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
    }],
    locale: 'en',
    country: 'BR'
});

const panExample3 = fieldsExample3.create('pan', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "white",
            '::placeholder': {
                color: "#1995ad"
            },
            iconColor: "#1995ad"
        },
        autofilled: {
            color: "#000000"
        }
    },
    placeholder: "4111 1111 1111 1111"
});



const expirationExample3 = fieldsExample3.create('expiration', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "white",
            '::placeholder': {
                color: "#1995ad"
            }
        },
        autofilled: {
            color: "#000000"
        }
    },
    placeholder: monthStr + "/" + year
});

const cvvExample3 = fieldsExample3.create('cvv', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "white",
            '::placeholder': {
                color: "#1995ad"
            }
        },
        autofilled: {
            color: "#000000"
        }
    },
    placeholder: "123"
});

document.getElementById('fields-form-example-3').onsubmit = function (e) {
    e.preventDefault();
    var example = document.querySelector(".example-3");
    var form = example.querySelector('form');
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
    if (errorMessage.innerText) {
        return;
    }
    // Show a loading screen...
    example.classList.add('submitting');
    dlocalInstance.createToken(cvvExample3, {
        name: document.getElementById('example-3-name').value,
        address_line1: document.getElementById('example-3-address').value,
        address_city: document.getElementById('example-3-city').value,
        address_state: document.getElementById('example-3-state').value,
        address_zip: document.getElementById('example-3-zip').value,
        address_country: document.getElementById('example-3-country').value

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

registerClearBtn("example-3", [panExample3, expirationExample3, cvvExample3])
registerEvents("example-3", [panExample3, expirationExample3, cvvExample3], ["example-4-pan", "example-4-expiration", "example-4-cvv"])

panExample3.mount(document.getElementById('example-3-pan'));
expirationExample3.mount(document.getElementById('example-3-expiration'));
cvvExample3.mount(document.getElementById('example-3-cvv'));