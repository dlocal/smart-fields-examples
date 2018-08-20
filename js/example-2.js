const cardFieldExample2 = fields.create('card', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "'Inter UI medium', sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "#666",
            '::placeholder': {
                color: "#21a35b"
            },
            iconColor: "#21a35b"
        }
    }
});

cardFieldExample2.on('autofilled', function (event) {
    if (event.autofilled) {
        document.getElementById('example-2-card').classList.add("autofilled");
    } else {
        document.getElementById('example-2-card').classList.remove("autofilled");
    }
})

let isCardFieldExample2Completed = false;
cardFieldExample2.on('complete', function (event) {
    isCardFieldExample2Completed = event.complete;
})


document.getElementById('fields-form-example-2').onsubmit = function (e) {
    e.preventDefault();
    var example = document.querySelector(".example-2");
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
    if (!isCardFieldExample2Completed) {
        if (!errorMessage.innerText) {
            error.classList.add('visible');
            errorMessage.innerText = 'Complete credit card data.';
        }

        return;
    }
    // Show a loading screen...
    example.classList.add('submitting');
    dlocalInstance.createToken(cardFieldExample2, {
        name: document.getElementById('example-2-name').value,
        address_line1: document.getElementById('example-2-address').value,
        address_city: document.getElementById('example-2-city').value,
        address_state: document.getElementById('example-2-state').value,
        address_zip: document.getElementById('example-2-zip').value,
        address_country: document.getElementById('example-2-country').value

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
registerClearBtn("example-2", [cardFieldExample2])
registerEvents("example-2", [cardFieldExample2])

cardFieldExample2.mount(document.getElementById('example-2-card'));