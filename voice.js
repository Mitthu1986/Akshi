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
window.offload = stopVoiceCommands;


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
  } else if(command.includes("home")) {
    window.location.href = "/home.html";
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
  utterance.text = "Say magnify to increase text size, say read the page aloud to have the content read to you, say stop listening to stop voice navigation, and say start listening to start voice navigation................say repeat to hear these commands again.";
  speechSynthesis.speak(utterance);

}