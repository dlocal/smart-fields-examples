const fieldsExample5 = dlocalInstance.fields({
    fonts: [{
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
    }],
    locale: 'en',
    country: 'BR'
});

const cardExample5 = fieldsExample5.create('card', {
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
        },
        autofilled: {
            color: "#f1d444"
        }
    }
});


document.getElementById('fields-form-example-5').onsubmit = function (e) {
    e.preventDefault();
    var example = document.querySelector(".example-5");
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
    dlocalInstance.createToken(cardExample5, {
        name: document.getElementById('example-5-name').value,
        address_line1: document.getElementById('example-5-address').value,
        address_city: document.getElementById('example-5-city').value,
        address_state: document.getElementById('example-5-state').value,
        address_zip: document.getElementById('example-5-zip').value,
        address_country: document.getElementById('example-5-country').value

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


registerClearBtn("example-5", [cardExample5])
registerEvents("example-5", [cardExample5], ["example-5-card"])

cardExample5.mount(document.getElementById('example-5-card'));