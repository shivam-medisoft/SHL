
var video = document.querySelector('video');
var constraints = window.constraints = {
  audio: true,
  video: true
};
var errorElement = document.querySelector('#errorMsg');
function hasUserMedia() { 
   //check if the browser supports the WebRTC 
   return !!(navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || 
      navigator.mediaDevices.mozGetUserMedia); 
}
  
if (hasUserMedia()) {
    
   navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || 
      navigator.mediaDevices.mozGetUserMedia;
      navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);
  stream.onremovetrack = function() {
    console.log('Stream ended');
  };
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
})
.catch(function(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.height.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
});
    
}else {
  alert("getUserMedia() is not supported by your browser");
}
function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}