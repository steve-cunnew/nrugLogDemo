const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const apiKey = urlParams.get('apiKey');

function submit() {

let firstName = document.getElementById('name').value;
let pizza = document.getElementById('pizza').value;
let drink = document.getElementById('drink').value;

console.log(firstName + '\n' + pizza + '\n' + drink)

  var data = JSON.stringify([
    {
      "event": "NRUG",
      "src": "webForm",
      "message": `NEW ORDER SUBMITTED. name=${firstName} pizza=${pizza} and drink=${drink}`
    }
  ]);
  //var apiKey = '703ea3b19d08d6eb2e5e4fb4c0f0c5b7FFFFNRAL';
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", `https://log-api.newrelic.com/log/v1?Api-Key=${apiKey}`);
  xhr.setRequestHeader("Content-Type", "application/json");

  
  xhr.send(data);

}