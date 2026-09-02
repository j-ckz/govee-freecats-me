function checkStatus() {
    const apiKey = localStorage.getItem('apiKey');
    const deviceID = localStorage.getItem('deviceID');

    if (apiKey && deviceID) {
        console.log('items present');
    } else {
        presentSetup();
    }
}

function presentSetup() {
    let containerDOM = document.querySelector('div#setupContainer');

    const headerElement = document.createElement('h2');
    const headerElementText = document.createTextNode('govee lights setup');

    headerElement.appendChild(headerElementText);

    containerDOM.appendChild(headerElement);
}
