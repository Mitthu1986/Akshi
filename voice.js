let recognition;
let listening = false;

function initVoiceCommands() {
  commandLog();
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.continuous = true;   // keeps listening
  recognition.interimResults = false;
  recognition.onresult = function(event) {
    const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
    document.dispatchEvent(new CustomEvent("voiceCommand", { detail: command }));
  };

  recognition.onend = function() {
    if(listening) recognition.start(); // auto-restart if still listening
  };

  recognition.start();
  listening = true;
}

window.onload = initVoiceCommands;


document.addEventListener("voiceCommand", function(e) {
  const command = e.detail;

  if(command.startsWith("read the page aloud") || 
  command.startsWith("read this page") ||
   command.startsWith("read the content") || 
   command.startsWith("speak the page") || 
   command.startsWith("speak this page") || 
   command.startsWith("speak the content")||
   command.startsWith("read aloud") ||
   command.startsWith("read this aloud") || 
   command.startsWith("speak aloud") || 
   command.startsWith("speak this aloud")||
   command.startsWith("read") ||
   command.startsWith("speak")) {
   readAloud(); 
  } else if(command.includes("magnify")||command.includes("zoom in")||command.includes("enlarge")||command.includes("increase font")||command.includes("make text bigger")||command.includes("magnify text")||command.includes("enlarge text")||command.includes("zoom in text")) {
    magnifyText();
  } else if(command.includes("back")||command.includes("go back")||command.includes("return")||command.includes("go home")) {
    navigateToPage("home.html");
  } else if(command.includes("home")) {
    navigateToPage("home.html");
  } else if(command.includes("camera")||command.includes("real time")||command.includes("object detection")) {
    navigateToPage("cam.html");
  } else if(command.includes("learn")||command.includes("learning")) {
    navigateToPage("learn.html");
  } else if(command.includes("teach")||command.includes("teaching")) {
    navigateToPage("teach.html");
  } else if(command.includes("network")||command.includes("networking")||command.includes("community")) {
    navigateToPage("net.html");
  } else if(command.includes("news")) {
    navigateToPage("news.html");
  } else if(command.includes("liked")||command.includes("favorites")||command.includes("saved items")) {
    navigateToPage("liked.html");
  } else if(command.includes("saved")) {
    navigateToPage("saved.html");
  } else if(command.includes("braille")) {
    navigateToPage("br.html");
  } else if(command.includes("login")) {
    navigateToPage("login.html");
  } else if(command.includes("sign up")||command.includes("signup")||command.includes("register")) {
    navigateToPage("signUp.html");
  } else if(command.includes("stop listening")) {
    stopVoiceCommands();
  } else if(command.includes("repeat")){
    commandLog();
    utterance.rate = 0.5;
  }
});


function stopVoiceCommands() {
  if(recognition) {
    recognition.stop();
    listening = false;
    alert("Voice navigation stopped.");
  }
}

if(command.includes("start listening")) {
  if(!listening) {
    initVoiceCommands();
    alert("Voice navigation started.");
  }
}

function magnifyText() {
  const body = document.body;
  const currentSize = parseFloat(window.getComputedStyle(body).fontSize);
  body.style.fontSize = (currentSize + 2) + "px";
}

function navigateToPage(page) {
  const currentPath = window.location.pathname;
  const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));
  window.location.href = basePath + '/' + page;
}

/*function readAloud() {
  const text = document.body.innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}*/

function readAloud() {
  const text = document.body.innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.onstart = () => alert("Reading started...");
  utterance.onend = () => alert("Reading finished.");
  speechSynthesis.speak(utterance);
}

function commandLog() {
 const utterance = new SpeechSynthesisUtterance();
  utterance.text = "Available voice commands: Say magnify to increase text size. Say read the page aloud to have content read to you. Say back or go back to return to home page. Say home to go to home page. Say learn to go to learning page. Say teach to go to teaching page. Say camera for real-time object detection. Say network or community to access networking. Say news for news page. Say liked for favorites. Say saved for saved items. Say braille for braille keyboard. Say login or sign up to access account pages. Say stop listening to stop voice navigation. Say repeat to hear these commands again.";
  speechSynthesis.speak(utterance);
}

