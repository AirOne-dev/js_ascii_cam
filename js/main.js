let video = document.getElementById('video');
let canvas1 = document.querySelector('#canvas');
let text = document.querySelector('#text');
let ctx1 = canvas1.getContext('2d');
let animation;
let qualite = 5; // plus on baisse cette valeur, plus on augmente la qualité (attention à la ram)
// let characters = (" .,:;i1tfLCG08@").split("");
let characters = ("@80GCLft1i;:,. ").split("");
let msg = '';

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        start();
    });
}

function start() {
    video.play();
    video.style.display = 'none';
    canvas1.style.display = 'none';

    anim();
}

function anim() {

    animation = requestAnimationFrame(anim);

    ctx1.drawImage(video, 0, 0, 640, 480);
    
    var imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    var data = imageData.data;

    msg = '';

    for (let y = 0; y < canvas1.height; y+=qualite) {
        for (let x = 0; x < canvas1.width; x+=qualite) {
            const element = Array[y];
            let red = imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 0]; // + 0 = rouge
            let green = imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 1]; // + 1 = vert
            let blue = imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 2];  // + 2 = bleu

            // let alpha = imageData.data[((x * (imageData.width * 4)) + (y * 4)) + 3]; // + 3 = alpha
            
            let avg = (red + green + blue) / 3; // je fais la moyenne des 3 couleurs pour avoir du N/B
            
            msg += characters[Math.round((avg/1.1)/255*characters.length)];
        }    
        msg += '<br />';
    }
    text.innerHTML = msg;
}