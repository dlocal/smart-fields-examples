const cardFieldExample1 = fields.create('card', {
    style: {
        base: {
            fontSize: "16px",
            fontFamily: "'Inter UI medium', sans-serif",
            lineHeight: '18px',
            fontSmoothing: 'antialiased',
            fontWeight: '500',
            color: "#666",
            '::placeholder': {
                color: "#aab7c4"
            },
            iconColor: "#adbfd3"
        }
    }
});

cardFieldExample1.on('autofilled', function (event) {
    if (event.autofilled) {
        document.getElementById('example-1-card').classList.add("autofilled");
    } else {
        document.getElementById('example-1-card').classList.remove("autofilled");
    }
})

let isCardFieldExample1Completed = false;
cardFieldExample1.on('complete', function (event) {
    isCardFieldExample1Completed = event.complete;
})


document.getElementById('fields-form-example-1').onsubmit = function (e) {
    e.preventDefault();

    var example = document.querySelector(".example-1");
    var form = example.querySelector('form');
    var error = form.querySelector('.error');
    var errorMessage = error.querySelector('.message');

    if (!isCardFieldExample1Completed) {
        if (!errorMessage.innerText) {
            error.classList.add('visible');
            errorMessage.innerText = 'Complete credit card data.';
        }
        return;
    }

    // Show a loading screen...
    example.classList.add('submitting');
    dlocalInstance.createToken(cardFieldExample1, {
        name: "Test"
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
registerClearBtn("example-1", [cardFieldExample1])
registerEvents("example-1", [cardFieldExample1])


cardFieldExample1.mount(document.getElementById('example-1-card'));