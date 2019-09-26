const fieldsExample4 = dlocalInstance.fields({
    fonts: [{
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
    }],
    locale: 'en',
    country: 'BR'
});

var example4 = document.querySelector(".example-4");
var form4 = example4.querySelector('form');
var error4 = form4.querySelector('.error');
var errorMessage4 = error4.querySelector('.message');

const cardExample4 = fieldsExample4.create('card', {
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
            iconColor: "#904d09"
        },
        focus: {
            color: "#424770",
            '::placeholder': {
                color: "#c0670c"
            }
        },
        autofilled: {
            color: "#000000"
        }
    },
    hideIcon: true
});



document.getElementById('fields-form-example-4').onsubmit = function (e) {
    e.preventDefault();

    // Trigger HTML5 validation UI on the form if any of the inputs fail
    // validation.
    var plainInputsValid = true;
    Array.prototype.forEach.call(form4.querySelectorAll('input'), function (
        input
    ) {
        if (input.checkValidity && !input.checkValidity()) {
            plainInputsValid = false;
            return;
        }
    });
    if (!plainInputsValid) {
        triggerBrowserValidation(form4);
        return;
    }
    if (errorMessage4.innerText) {
        return;
    }
    // Show a loading screen...
    example4.classList.add('submitting');
    dlocalInstance.createToken(cardExample4, {
        name: document.getElementById('example-4-name').value
    }).then((result) => {
        error4.classList.remove('visible');
        errorMessage4.innerText = "";
        example4.classList.remove('submitting');
        example4.querySelector(".token").innerText = result.token;
        example4.classList.add("submitted");
    }).catch((result) => {
        example4.classList.remove('submitting');
        error4.classList.add('visible');
        errorMessage4.innerText = result.error.message;
    });

}

registerClearBtn("example-4", [cardExample4])
registerEvents("example-4", [cardExample4], ["example-4-card"])

cardExample4.mount(document.getElementById('example-4-card'));

let actualBrand4 = null;
cardExample4.on('brand', function (event) {

    if (event.brand && actualBrand4 !== event.brand) {
        actualBrand4 = event.brand;

        dlocalInstance.createInstallmentsPlan(cardExample4, 500, "BRL")
            .then((result) => {
                var installmentsSelect4 = form4.querySelector('.installments');
                buildInstallments(installmentsSelect4, result.installments);
            }).catch((result) => {
                console.error(result);
                error4.classList.add('visible');
                errorMessage4.innerText = result.error.message;
            });
    }
});