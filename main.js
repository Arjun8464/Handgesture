Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='capture_img' src='" + data_uri + "'>";
    });

}
console.log('ml5 version',ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jzJtADLpY/model.json', modelLoaded);
function modelLoaded(){
    console.log('model Loaded!');
}

function speak(){
    var synth= window.speechSynthesis;
    speakdata1=  "The first prediction is"+ prediction1;
    speakdata2=  "and the second prediction is"+ prediction2;
    var utterThis= new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterThis);
}
function check(){
    img =  document.getElementById("capture_img");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction1=results[0].label;
        prediction2=results[1].label;
        document.getElementById("result_emotion_name1").innerHTML=prediction1;
        document.getElementById("result_emotion_name2").innerHTML=prediction2;
        speak();
        if(results[0].label=="like"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label=="super"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[0].label=="victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[1].label=="like"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if(results[1].label=="super"){
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
        if(results[1].label=="victory"){
            document.getElementById("update_emoji2").innerHTML="&#9996;";
        }
    }
}