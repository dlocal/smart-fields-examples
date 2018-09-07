const fieldsExample1 = dlocalInstance.fields({
    fonts: [{
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
    }],
    locale: 'en',
    country: 'BR'
});

const cardExample1 = fieldsExample1.create('card', {
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


document.getElementById('fields-form-example-1').onsubmit = function (e) {
    e.preventDefault();

    var example = document.querySelector(".example-1");
    var form = example.querySelector('form');
    var error = form.querySelector('.error');
    var errorMessage = error.querySelector('.message');

    if (!areExample1FieldsCompleated) {
        if (!errorMessage.innerText) {
            error.classList.add('visible');
            errorMessage.innerText = 'Complete credit card data.';
        }
        return;
    }

    // Show a loading screen...
    example.classList.add('submitting');
    dlocalInstance.createToken(cardExample1, {
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


let areExample1FieldsCompleated = false;
registerClearBtn("example-1", [cardExample1])
registerEvents("example-1", [cardExample1], ["example-1-card"], function (compleated) {
    areExample1FieldsCompleated = compleated;
})


cardExample1.mount(document.getElementById('example-1-card'));