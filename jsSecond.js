
function redirectToIndex() {
	//window.location="./index.html";
  _defaultImageLinks = [];
   document.getElementById("matchContainer").innerHTML = "";
   document.getElementById("Page2").style.display = "none";
   document.getElementById("Page1").style.display = "block";
}


function getImageFromBase64(index) {

    var image = new Image();
    image.src = 'data:image/png;base64,' + _data['celebrities'][index]['imgB64'];
    //document.body.appendChild(image);

    return image.src;
}
