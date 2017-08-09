var defaultImageLinks = [];
var totalDefaultImages = 10;
var _data = undefined;

$(document).ready(function(){
	
  for(var i = 1;i<=totalDefaultImages;i++) {
		var uri = './Resources/' + i.toString() + '.jpg';
		//console.log(uri);
		defaultImageLinks.push(uri);
	}
	var holder = document.getElementById("matchContainer");

    for(var i = 0;i<totalDefaultImages;i++) {

          var newDiv = document.createElement("div");
          newDiv.setAttribute("class","cover-item");
          newDiv.style.backgroundImage = 'url(' + defaultImageLinks[i] +')';
          holder.appendChild(newDiv);
    }
    console.log(holder);
    //console.log(ageLowerBound);
    var holder2 = document.getElementById("bestMatchAttrib");

    _data = JSON.parse(localStorage["_data"]);

    getImageFromBase64();
});

function redirectToIndex() {
	window.location="./index.html";
}


function getImageFromBase64() {

    var image = new Image();
    image.src = 'data:image/png;base64,' + _data['celebrities'][0]['imgB64'];
    document.body.appendChild(image);

    return image;
}