
var defaultImageLinks = [];
var totalDefaultImages = 3;
var _data = undefined;

$(document).ready(function(){
	

  _data = JSON.parse(localStorage["_data"]);


  var x = _data['celebrities'].length;

  totalDefaultImages = x;
  for(var i = 0;i<totalDefaultImages;i++) {
	//	var uri = './Resources/' + i.toString() + '.jpg';
		//console.log(uri);

		defaultImageLinks.push(getImageFromBase64(i));
    //console.log(i);
	}
	var holder = document.getElementById("matchContainer");

    for(var i = 0;i<totalDefaultImages;i++) {

          var newDiv = document.createElement("div");
          newDiv.setAttribute("class","cover-item");
          newDiv.style.backgroundImage = 'url(' + defaultImageLinks[i] +')';
          holder.appendChild(newDiv);
    }
    //console.log(localStorage['UploadedFile'] );
    //document.getElementById("leftPlaceHolder").style.backgroundImage = 'url(' + localStorage['UploadedFile'] + ')';
    document.getElementById("rightPlaceHolder").style.backgroundImage = 'url(' + getImageFromBase64(0) + ')'
    //console.log(ageLowerBound);
    var holder2 = document.getElementById("bestMatchAttrib");

    var htmlToBeRendered = "<h2 class='lead text-muted'>Name : "
    + _data['celebrities'][0]['name'] + "</h2> <h2 class='lead text-muted'>Age : " 
    + _data['age'] + " </script></h2> <h2 class='lead text-muted'>Gender: " 
    + _data['gender'] + "</h2><h2 class='lead text-muted'>Ethinicity:" 
    +_data['ethinicity'] +"</h2> <h2 class='lead text-muted'>Matching Probability: " 
    + _data['celebrities'][0]['probability'] + "</h2>";
    holder2.innerHTML = htmlToBeRendered;

  

});

function redirectToIndex() {
	window.location="./index.html";
}


function getImageFromBase64(index) {

    var image = new Image();
    image.src = 'data:image/png;base64,' + _data['celebrities'][index]['imgB64'];
    //document.body.appendChild(image);

    return image.src;
}
