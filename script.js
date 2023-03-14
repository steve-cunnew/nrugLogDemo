const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const apiKey = urlParams.get('apiKey');
const tinyUrl = urlParams.get('tinyUrl');

const apiUrl = `https://log-api.newrelic.com/log/v1?Api-Key=${apiKey}`;

let textElem;

const messageObj = {
  event: 'NRUG',
  src: 'webForm',
  message: ''
}

if (tinyUrl) {
  let displayUrlElem = document.getElementById('displayUrl');
  if (displayUrlElem) {
    displayUrlElem.textContent = decodeURIComponent(tinyUrl);
  }
}

function submit(buttonElem) {

  tempDisableButton(buttonElem);
  textElem = textElem || document.getElementById('orderPreference');
  const orderDetails = textElem.value;
  if (!orderDetails) {
    return;
  }

  messageObj.message = `NEW ORDER SUBMITTED. ${orderDetails}`;
  
  sendData(messageObj);

}

function sendText(buttonElem) {

  tempDisableButton(buttonElem);
  textElem = textElem || document.getElementById('textInput');
  const freeText = textElem.value;

  if (!freeText) {
    return;
  }
  
  //console.log(firstName + '\n' + pizza + '\n' + drink)
  
  messageObj.message = freeText;

  sendData(messageObj);

}

function getStepText(buttonElem) {
  const parentElem = buttonElem && buttonElem.parentElement;
  const textElem =  parentElem && parentElem.previousElementSibling;
  return textElem && textElem.textContent;
}

function sendPreset(buttonElem) {

  tempDisableButton(buttonElem);
  const text = getStepText(buttonElem);
  
  if (!text) {
    return;
  }

  messageObj.message = text;

  sendData(messageObj);

}
function clearText() {

  textElem = textElem || document.getElementById('textInput');
  textElem.value = '';

}

function copyPreset(buttonElem) {

  const text = getStepText(buttonElem);
  
  if (!text) {
    return;
  }

  textElem = textElem || document.getElementById('textInput');
  textElem.value = text;

}


function sendData(data) {

  if (!apiKey) {
    return;
  }

  const dataStr = JSON.stringify([ messageObj ]);

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
    
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
    
  xhr.open("POST", apiUrl);  
    
  xhr.send(dataStr);

  // var getValue= document.getElementById("textInput");
  // if (getValue.value !="") {
  //     getValue.value = "";
  // }

  }

function enableButton(button) {
  button.disabled = false;
  button.classList.remove('is-loading');
}
  
function tempDisableButton(button) {
  button.disabled = true;
  button.classList.add('is-loading');
  setTimeout(enableButton, 750, button);
}

function nextPage() {

  location.href = `./food.html?apiKey=${apiKey}`;

}

function prevPage() {
  location.href = `./index.html?apiKey=${apiKey}`;
}