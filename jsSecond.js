var defaultImageLinks = [];
var totalDefaultImages = 10;

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
    console.log(ageLowerBound);
});

function redirectToIndex() {
	window.location="./index.html";
}
