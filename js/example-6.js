const fieldsExample6 = dlocalInstance.fields({
    fonts: [{
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
    }],
    locale: 'en',
    country: 'BR'
});

const cardExample6 = fieldsExample6.create('card', {
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


document.getElementById('fields-form-example-6').onsubmit = function (e) {
    e.preventDefault();

    var example = document.querySelector(".example-6");
    var form = example.querySelector('form');
    var error = form.querySelector('.error');
    var errorMessage = error.querySelector('.message');

    if (errorMessage.innerText) {
        return;
    }

    // Show a loading screen...
    example.classList.add('submitting');
    dlocalInstance.createToken(cardExample6, {
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



registerClearBtn("example-6", [cardExample6])
registerEvents("example-6", [cardExample6], ["example-6-card"])


cardExample6.mount(document.getElementById('example-6-card'));