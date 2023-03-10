const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const apiKey = urlParams.get('apiKey');

function submit() {

let orderDetails = document.getElementById('orderPreference').value;


  var data = JSON.stringify([
    {
      "event": "NRUG",
      "src": "webForm",
      "message": `NEW ORDER SUBMITTED. ${orderDetails}`
    }
  ]);

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", `https://log-api.newrelic.com/log/v1?Api-Key=${apiKey}`);
  
  xhr.send(data);

  // var getValue= document.getElementById("orderPreference");
  // if (getValue.value !="") {
  //     getValue.value = "";
  // }

  document.getElementById('loadingGif').style.display = "block";
  setTimeout(function() {
    document.getElementById('loadingGif').style.display = "none";
  },750);

}

function sendText() {

  let freeText = document.getElementById('textInput').value;
  
  
  //console.log(firstName + '\n' + pizza + '\n' + drink)
  
    var data = JSON.stringify([
      {
        "event": "NRUG",
        "src": "webForm",
        "message": `${freeText}`
      }
    ]);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("POST", `https://log-api.newrelic.com/log/v1?Api-Key=${apiKey}`);  
    
    xhr.send(data);

    // var getValue= document.getElementById("textInput");
    // if (getValue.value !="") {
    //     getValue.value = "";
    // }
  
    document.getElementById('loadingGif').style.display = "block";
    setTimeout(function() {
      document.getElementById('loadingGif').style.display = "none";
    },750);

  }


  function nextPage() {

    location.href = `./food.html?apiKey=${apiKey}`

  }