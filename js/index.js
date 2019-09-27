const dlocalInstance = dlocal('efba0f53-252d-4da2-806c-3cb694a1e2d8');

const today = new Date();
const month = today.getMonth() + 1
const monthStr = month <= 9 ? "0" + month : month.toString();
const year = (today.getFullYear() + 2).toString().substring(2);

function triggerBrowserValidation(form) {
    // fake a user submit event.
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    form.appendChild(submit);
    submit.click();
    submit.remove();
}

function registerClearBtn(exampleName, fields, onClear) {
    var formClass = '.' + exampleName;
    var example = document.querySelector(formClass);

    var form = example.querySelector('form');
    var resetButton = example.querySelector('a.reset');
    var error = form.querySelector('.error');

    resetButton.addEventListener('click', function (e) {
        debugger
        e.preventDefault();
        // Resetting the form (instead of setting the value to `''` for each input)
        // helps us clear webkit autofill styles.
        form.reset();

        // Clear each Smart-Field.
        fields.forEach(function (field) {
            field.clear();
        });

        // Reset error state as well.
        error.classList.remove('visible');

        example.classList.remove('submitted');

        var installmentsInput = form.querySelector('.installments');
        if (installmentsInput) {
            installmentsInput.disabled = true;
            installmentsInput.innerHTML = "<option style='color: #f0810f' value=''>-</option>";
        }

        if (onClear) {
            onClear();
        }
    });

}

function registerEvents(exampleName, fields, fieldsNames) {
    var formClass = '.' + exampleName;
    var example = document.querySelector(formClass);

    var form = example.querySelector('form');
    var error = form.querySelector('.error');
    var errorMessage = error.querySelector('.message');




    // Listen for errors from each Smart-Field, and show error messages in the UI.
    var savedErrors = {};
    var fieldsReady = new Array(fields.lenght).fill(false);
    fields.forEach(function (field, idx) {
        field.on('change', function (event) {
            showErrors(event, idx)
        });
        field.on('blur', function (event) {
            document.getElementById(fieldsNames[idx]).classList.remove("focus");
            showErrors(event, idx)
        });

        field.on('focus', function (event) {
            document.getElementById(fieldsNames[idx]).classList.add("focus");
        })

        field.on('autofilled', function (event) {
            if (event.autofilled) {
                document.getElementById(fieldsNames[idx]).classList.add("autofilled");
            } else {
                document.getElementById(fieldsNames[idx]).classList.remove("autofilled");
            }
        })

        field.on('ready', function (event) {
            fieldsReady[idx] = true;
            if (allFieldsTrue(fieldsReady)) {
                example.classList.remove('submitting');
            }
        });
    });

    function showErrors(event, idx) {
        if (event.error) {
            error.classList.add('visible');
            savedErrors[idx] = event.error.message;
            errorMessage.innerText = event.error.message;
        } else {
            savedErrors[idx] = null;

            // Loop over the saved errors and find the first one, if any.
            var nextError = Object.keys(savedErrors)
                .sort()
                .reduce(function (maybeFoundError, key) {
                    return maybeFoundError || savedErrors[key];
                }, null);

            if (nextError) {
                // Now that they've fixed the current error, show another one.
                errorMessage.innerText = nextError;
            } else {
                // The user fixed the last error; no more errors.
                errorMessage.innerText = "";
                error.classList.remove('visible');
            }
        }
    }
}

function allFieldsTrue(fields) {
    let result = true;
    fields.forEach(function (field, idx) {
        result = result && field;
    });
    return result;
}

function buildInstallments(installmentsInput, installmentsPlan) {
    const installmentsOptions = installmentsPlan.installments.reduce(function (options, plan) {
        options += "<option value=" + plan.id + ">" + plan.installments + " of " + "BRL" + " " + plan.installment_amount + " (Total : " + "BRL" + " " + plan.total_amount + ")</option>";
        return options;
    }, "");
    installmentsInput.disabled = false;
    installmentsInput.innerHTML = installmentsOptions;
}