function main() {
    const apiKey = localStorage.getItem('apiKey');
    const deviceID = localStorage.getItem('deviceID');

    if (apiKey && deviceID) {
        console.log('items present');
    } else {
        renderSetup();
    }
}

function renderSetup() {
    let containerDOM = document.querySelector('div#setupContainer');

    const headerElement = document.createElement('h2');
    const headerElementText = document.createTextNode('setup your lights');

    function renderInputs(name, textContent, type, end) {
        const inputElement = document.createElement('input');
        const labelElement = document.createElement('label');
        const breakElement = document.createElement('br');
        const buttonElement = document.createElement('button');
        function insertElement(element) { containerDOM.appendChild(element) };

        labelElement.htmlFor = name;
        labelElement.textContent = textContent;

        inputElement.name = name;
        inputElement.type = type;
        inputElement.id = name;

        insertElement(labelElement);
        insertElement(inputElement);

        if (end) {
            buttonElement.id = 'submitInformation';
            buttonElement.textContent = 'submit';

            insertElement(breakElement)
            insertElement(buttonElement)
        } else {
            insertElement(breakElement);
        }
    }

    // generate the header
    headerElement.appendChild(headerElementText);
    containerDOM.appendChild(headerElement);

    // lets generate the first form
    renderInputs('apiKeyInput', 'api key: ', 'password', false);

    // second form, now.
    renderInputs('deviceIDInput', 'device ID: ', 'text', true);
}
