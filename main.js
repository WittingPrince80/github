pre1 = "";

Webcam.set({

 width:350,
 height:300,
 image_format : 'png',
 png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5v:', ml5.version);

classifier =ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wO_MLLigQ//model.json',modelLoaded);

function modelLoaded(){
  console.log('Model loaded');
}

function check(){
 img = document.getElementById('captured_image')
 classifier.classify(img, gotResult);
}



function speak(){
   var synth = window.SpeechSynthesis;
   speak_data_1 = "First prediction: " + pre1;
  
   var utterThis = new SpeechSynthesisUtterance(speak_data_1);
   synth.speak(utterThis);

}

function gotResult(error, results)
{
 if(error) {
 console.error(error);
 }else{
  console.log(results)
 document.getElementById("result_emotion_name").innerHTML = results[0].label;
 
 pre1 = results[0].label;

 speak();
 }
if(results[0].label == "Thumbs Up")
{
 document.getElementById("update_emoji").innerHTML = "&#128077;"

}
if(results[0].label == "Thumbs Down")
{
 document.getElementById("update_emoji").innerHTML = "&#128078;"

}
if(results[0].label == "Peace")
{
 document.getElementById("update_emoji").innerHTML = "&#9996;"

}


}