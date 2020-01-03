(async function() {

})();

function getFormData() {
    const formElement = document.forms.requestForm;
    return formData = new FormData(formElement);
}

async function handleSendReq() {
    const promise = await fetch('./send-request', {
        method: 'POST',
        body: getFormData()
    });
}

async function handleSaveReq() {
    const promise = await fetch('./save-request', {
        method: 'POST',
        body: getFormData()
    });
}