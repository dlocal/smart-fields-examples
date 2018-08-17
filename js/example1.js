const dlocalInstanceExample1 = dlocal('efba0f53-252d-4da2-806c-3cb694a1e2d8');

const fields = dlocalInstanceExample1.fields({
    fonts: [{
        cssSrc: 'https://rsms.me/inter/inter-ui.css'
    }],
    locale: 'en',
    country: 'BR'
});

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

document.getElementById('fields-form-example-1').onsubmit = function (e) {
    e.preventDefault();
    dlocalInstanceExample1.createToken(cardFieldExample1, {
        name: "Test"
    }).then((result) => {
        var example = document.querySelector(".example-1");
        example.querySelector(".token").innerText = result.token;
        example.classList.add("submitted");
    }).catch((result) => {
        showFieldsError(result.error);
    });

}



cardFieldExample1.mount(document.getElementById('example-1-card'));