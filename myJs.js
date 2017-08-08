var totalDefaultImages = 10;
var defaultImageLinks = [];
var ageLowerBound = 0;
var ageUpperBound =100;
var gender = "ALL";


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


function sendDataToServer() {

    var url = "http://172.16.44.248:4567/predictions";
    var data = new FormData($('#fileupload')[0]);
    var dataString = JSON.stringify(data.serializeObject());
    $.post(url, {data: dataString }, 'json');  
		/*
		var file_data = $("#fileupload").prop("files")[0];
		var fd = new FormData();

		fd.append("file", file_data);
		fd.append("isFirst", true);

		$.ajax({
	    url: "http://172.16.44.248:4567/predictions",
	    type: "POST",
	    async: true, // set to false if you don't mind the page pausing while waiting for response
	    cache: false,
	    dataType: "json",
	    data: '{"image": ' + fd  + ',"age1": ' + ageLowerBound + ', "age2": ' + ageUpperBound + ', "gender": "' + gender +'","ethinicity": "ASIAN"}',
	    contentType: "application/json; charset=utf-8",
	    success: function(data) {
	        // handle your successful response here
	        document.write(data["message"]);
	    },
	    error: function(xhr, ajaxOptions, thrownError) {
	        // handle your fail response here
	        alert("Oops cant't process your request");
	    }
	});		
	*/
}

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