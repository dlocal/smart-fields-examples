var example = document.querySelector(".example-4");
var form = example.querySelector('form');

const cardExample4 = fields.create('card', {
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
        }
    }
});




let iscardExample4Completed = false;
cardExample4.on('complete', function (event) {
    iscardExample4Completed = event.complete;
    expirationExample4.focus()
})

cardExample4.on('ready', function (event) {
    example.classList.remove('submitting');

});

cardExample4.on('focus', function (event) {
    document.getElementById('example-4-card').classList.add("focus");
})

cardExample4.on('blur', function (event) {
    document.getElementById('example-4-card').classList.remove("focus");
})

cardExample4.on('autofilled', function (event) {
    if (event.autofilled) {
        document.getElementById('example-4-card').classList.add("autofilled");
    } else {
        document.getElementById('example-4-card').classList.remove("autofilled");
    }
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
    if (!iscardExample4Completed) {
        if (!errorMessage.innerText) {
            error.classList.add('visible');
            errorMessage.innerText = 'Complete credit card data.';
        }

        return;
    }
    // Show a loading screen...
    example.classList.add('submitting');
    dlocalInstance.createToken(cardExample4, {
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
registerClearBtn("example-4", [cardExample4])
registerEvents("example-4", [cardExample4])

cardExample4.mount(document.getElementById('example-4-card'));

let actualBrand = null;
cardExample4.on('brand', function (event) {

    if (event.brand && actualBrand !== event.brand) {
        actualBrand = event.brand;

        dlocalInstance.createInstallmentsPlan(cardExample4, 500, "BRL")
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