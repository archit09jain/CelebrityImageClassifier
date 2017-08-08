var totalDefaultImages = 10;
var defaultImageLinks = [];


function onBodyLoad() {
	
	for(var i = 1;i<=totalDefaultImages;i++) {
		var uri = './Resources/' + i.toString() + '.jpg';
		//console.log(uri);
		defaultImageLinks.push(uri);
	}

	console.log(defaultImageLinks);
    var holder = document.getElementById("thumbnailContainer");

    for(var i = 0;i<totalDefaultImages;i++) {


          var newDiv = document.createElement("div");
          newDiv.setAttribute("class","cover-item");
          newDiv.style.backgroundImage = 'url(' + defaultImageLinks[i] +')';

          holder.appendChild(newDiv);
    }
    console.log(holder);
}

function chooseFile() {
      $("#fileupload").click();
   }

function applyFilters() {
	var ageLowerBound=document.getElementById('ageLowerBound').value;
	var ageUpperBound=document.getElementById('ageUpperBound').value;
	var gender = document.querySelector('input[name = "gender"]:checked').value;
	//alert(gender);
}