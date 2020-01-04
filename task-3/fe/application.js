let requestItems = {};

(async function() {
    getRequestsList();
})();

function getFormData() {
    const formElement = document.forms.requestForm;
    return formData = new FormData(formElement);
}

function getRequestsList() {
    fetch('./requests-list')
        .then( response => response.json())
        .then( response => {
            requestItems = response;
            fillRequestsList();
        });
}

function handleSendReq() {
    fetch('./send-request', {
        method: 'POST',
        body: getFormData()
    })
        .then( response => response.json())
        .then( response =>  fillResponsePanel(response));
}

function handleSaveReq() {
    fetch('./save-request', {
        method: 'POST',
        body: getFormData()
    })
        .then( response => response.json())
        .then(({ success, error}) => {
            if (success) {
                getRequestsList();
            } else {
                alert(error);
            }

        });
}

function fillRequestsList(items) {
    const requestSelector = document.getElementById('request-selector');
    requestSelector.innerHTML = '<option value=""></option>';
    Object.keys(requestItems).forEach(function(key) {
        const option = document.createElement('option');
        option.innerHTML = key;
        option.value = key;
        requestSelector.appendChild(option);
    });
}

function fillRequestForm({target: { value }}) {
    if (value) {
        const requestItem = requestItems[value];
        const formElement = document.forms.requestForm;
        Object.keys(requestItem).forEach((fieldName) => {
            const input = formElement.querySelector(`[name=${fieldName}]`);
            input.value = requestItem[fieldName];
        });
    }
}

function fillResponsePanel(response) {
    const displayResult = response.success ? response.payload : response;
    const responsePanel = document.getElementById('response-panel');
    responsePanel.innerHTML = '';
    if (displayResult) {
        Object.keys(displayResult).forEach((fieldName) => {
            const container = document.createElement('div');
            const caption = document.createElement('h4');
            const content = document.createElement('p');
            caption.innerHTML = fieldName;
            content.innerHTML = JSON.stringify(displayResult[fieldName]);
            container.appendChild(caption);
            container.appendChild(content);
            responsePanel.appendChild(container);
        })
    }
}