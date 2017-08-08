var totalDefaultImages = 10;
var defaultImageLinks = [];
var ageLowerBound = 0;
var ageUpperBound =100;
var gender = "ALL";
var imagePointer = undefined;



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
         	

          newDiv.addEventListener("click", function() {

          		imagePointer = newDiv.style.backgroundImage;
          		//console.log(defaultImagePointer.style);
          });
          holder.appendChild(newDiv);
    }
    console.log(holder);
}


function chooseFile() {
    $("#fileupload").click();
    imagePointer = undefined; 
}


//still pending outputs not consistent
function getCurrentImage() {

	if(imagePointer == undefined) {
		imagePointer = $("#fileupload").prop("files")[0];
		if(imagePointer == undefined)
				alert("No Image Selected or Uploaded");
	}
	else {
		return imagePointer;
	}
}

function sendDataToServer() {

	//'{"image": ' + fd  + ',"age1": ' + ageLowerBound + ', "age2": ' + ageUpperBound + ', "gender": "' + gender +'","ethinicity": "ASIAN"}',
    var url = "http://172.16.44.248:4567/predictions";  

	var file_data = $("#fileupload").prop("files")[0];
	var fd = new FormData();

		fd.append("image", file_data);
		fd.append("age1",ageLowerBound);
		fd.append("age2",ageUpperBound);
		fd.append("gender",gender);
		fd.append("ethinicity","ASIAN");

		$.ajax({
	    	type: "POST",
            enctype: 'multipart/form-data',
            url: "http://172.16.44.248:4567/predictions",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
	    success: function(data) {
	        // handle your successful response here
	        document.write(data["message"]);
	    },
	    error: function(xhr, ajaxOptions, thrownError) {
	        // handle your fail response here
	        alert("Oops cant't process your request");
	    }
	});		
	

}

v
function applyFilters() {
	ageLowerBound=document.getElementById('ageLowerBound').value;
	ageUpperBound=document.getElementById('ageUpperBound').value;
	gender = document.querySelector('input[name = "gender"]:checked').value;
	//alert(gender);
}

function post_to_url(path, params, method) {
        method = method || "post";

        var form = document.createElement("form");

        form._submit_function_ = form.submit;

        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("enctype","application/json");

        for(var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form._submit_function_();
    }