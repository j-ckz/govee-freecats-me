let containerDOM = document.querySelector('#setupContainer');
function insertElement(element) { containerDOM.appendChild(element) };

window.addEventListener("load", (event) => {
    checkForData();
});

function checkForData() {
    const apiKey = localStorage.getItem('apiKey');
    const deviceID = localStorage.getItem('deviceID');

    if (apiKey && deviceID) {
        renderControlPanel();
    } else {
        renderSetup();
        listenForInputs();
    }
}

function renderControlPanel() {

    /*
    power:
    <button (pwron)>; <button (pwroff)>

    brightness:
    <label>; <input>; <button/submit>;

    color:
    <label>; <input>; <button/submit>;

    i should maybe add something that can change the device ID on the side and/or show all the device IDs for easy switching. devids with like the product name or somehting.
    */

    function createInput(name, textContent, type) {
        const inputElement = document.createElement('input');
        const labelElement = document.createElement('label');
        const breakElement = document.createElement('br');
        const buttonElement = document.createElement('button');
        function insertElement(element) { containerDOM.appendChild(element) };

        if (name !== 'powerInput') {
            labelElement.textContent = textContent;
            labelElement.for = name;

            inputElement.name = name;
            inputElement.id = name;
            inputElement.type = type;

            buttonElement.id = `${name}Submit`;
            buttonElement.textContent = 'submit';

            if (name === 'brightnessInput') {
                inputElement.min = 0;
                inputElement.max = 100;
            }
        } else if (name === 'powerInput') {

        }

        insertElement(labelElement);
        insertElement(inputElement);
        insertElement(buttonElement);
        insertElement(breakElement);
    }

    function createPowerButton(type) {
        const powerButton = document.createElement('button');
        const breakElement = document.createElement('br');

        powerButton.id = `power${type}Button`;
        powerButton.textContent = `power ${type}`;

        insertElement(powerButton);
    }

    createPowerButton('on');
    createPowerButton('off');
    insertElement(document.createElement('br'));
    createInput('brightnessInput', 'brightness: ', 'range');
    createInput('colorInput', 'color: ', 'color');

}

/*

const apiHost = 'https://openapi.api.govee.com';
const contentType = 'application/json';
const apiKey = localStorage.getItem('apiKey');

fetch(`${apiHost}/router/api/v1/user/devices`, {
    headers: {
        'Govee-API-Key': atob(apiKey),
        'Content-Type': contentType
    }
})
.catch(error => console.log('Error while fetching:', error))
.then(response => response.json())
.then((response) => {
    console.log(response)
})

 */

function renderSetup() {
    const headerElement = document.createElement('h2');
    const headerElementText = document.createTextNode('setup your lights');

    function createInput(name, textContent, type, end) {
        const inputElement = document.createElement('input');
        const labelElement = document.createElement('label');
        const breakElement = document.createElement('br');
        const buttonElement = document.createElement('button');

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

            insertElement(breakElement);
            insertElement(buttonElement);
        } else {
            insertElement(breakElement);
        }
    }

    // generate the header
    headerElement.appendChild(headerElementText);
    containerDOM.appendChild(headerElement);

    // lets generate the first form
    createInput('apiKeyInput', 'api key: ', 'password', false);

    // second form, now.
    createInput('deviceIDInput', 'device ID: ', 'text', true);
}

function listenForInputs() {
    const buttonDOM = document.getElementById('submitInformation');

    buttonDOM.addEventListener("click", () => {
        const apiKeyInputDOM = document.getElementById('apiKeyInput');
        const deviceIDInputDOM = document.getElementById('deviceIDInput');

        const apiKey = btoa(apiKeyInputDOM.value);
        const deviceID = deviceIDInputDOM.value;

        if (apiKey !== '' && deviceID !== '') {
            localStorage.setItem('apiKey', apiKey);
            localStorage.setItem('deviceID', deviceID);

            location.reload();
        } else {
            if (apiKey === '') {
                alert('your API key input was left empty. this is a required input, so please fill it out.');
            } else if (deviceID === '') {
                alert('your device ID input was left empty. this is a required input, so please fill it out.');
            } else {
                alert('what the fuck?');
            }
        }

    });
}
