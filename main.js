var previsao1 = "";
var previsao2 = "";

Webcam.set({
   width: 350,
   height: 300,
   imageFormat: "png",
   pngQuality: 90
});

var camera = document.getElementById("camera");

Webcam.attach("#camera");

function takePhoto() {
   Webcam.snap(function(DataURI){
      document.getElementById("result").innerHTML = "<img id='captureImg' src='" + DataURI + "'>"
   });
}

console.log("ML5 Version: ", ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json", modelLoaded);

function modelLoaded() {
   console.log("Modelo carregado");
}

function speak() {
   var synth = window.speechSynthesis;
   var fala1 = "A primeira previsão é " + previsao1;
   var fala2 = "E a sugunda previsão é " + previsao2;
   var utterThis = new SpeechSynthesisUtterance(fala1 + fala2);
   synth.speak(utterThis);
}

function check() {
   var img = document.getElementById("captureImage");
   classifier.classify(img, gotResult);
}

function gotResult(error, results) {
   if(error) {
      console.error(error);
   } else {
      document.getElementById("resultEmotionName").innerHTML = results[0].label;
      document.getElementById("resultEmotionName2").innerHTML = results[1].label;
      previsao1 = results[0].label;
      previsao2 = results[1].label;
      speak();
      if(previsao1 == "feliz") {
         document.getElementById("updateEmoji").innerHTML = "&#128522;";
      }

      if(previsao1 == "triste") {
         document.getElementById("updateEmoji").innerHTML = "&#128532;";
      }

      if(previsao1 == "irritado") {
         document.getElementById("updateEmoji").innerHTML = "&#128548;";
      }
      
      if(previsao2 == "feliz") {
         document.getElementById("updateEmoji2").innerHTML = "&#128522;";
      }

      if(previsao2 == "triste") {
         document.getElementById("updateEmoji2").innerHTML = "&#128532;";
      }

      if(previsao2 == "irritado") {
         document.getElementById("updateEmoji2").innerHTML = "&#128548;";
      }
   }
}