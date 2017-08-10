var totalDefaultImages = 10;
var defaultImageLinks = [];
var ageLowerBound = 0;
var ageUpperBound =100;
var gender = "ANY";
var imagePointer = undefined;
var _data = undefined;
var _defaultImageLinks = [];
var _totalDefaultImages = 0;


function onBodyLoad() {
	
	document.getElementById("Page2").style.display = "none";
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
}


function sendDataToServer() {
	applyFilters();
	document.getElementById("matchContainer").innerHTML = "";
	_defaultImageLinks = [];
	//'{"image": ' + fd  + ',"age1": ' + ageLowerBound + ', "age2": ' + ageUpperBound + ', "gender": "' + gender +'","ethinicity": "ASIAN"}',
    var url = "http://172.16.44.248:4567/predictions";  

	var file_data = $("#fileupload").prop("files")[0];
   // localStorage("UploadedFile",file_data);
	var fd = new FormData();

		fd.append("image", file_data);
		fd.append("age1",ageLowerBound);
		fd.append("age2",ageUpperBound);
		fd.append("gender",gender);
		fd.append("ethinicity","ANY");

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
	        // document.write(data);
	        //
	        //$.cookie.json = true;
	       // $.cookie("_data",JSON.stringify(data));
	       // console.log(data['age']);
	       _data = data;
	       console.log(_data);

	        var x = _data['celebrities'].length;

			_totalDefaultImages = x;
		   for(var i = 0;i<_totalDefaultImages;i++) {
		 	//	var uri = './Resources/' + i.toString() + '.jpg';
				//console.log(uri);

			_defaultImageLinks.push(getImageFromBase64(i));
		    //console.log(i);
			}
			var holder = document.getElementById("matchContainer");

		    for(var j = 0;j<_totalDefaultImages;j++) {

		          var newDiv = document.createElement("div");
		          newDiv.setAttribute("class","cover-item");
		          newDiv.style.backgroundImage = 'url(' + _defaultImageLinks[j] +')';
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


	       document.getElementById("Page1").style.display = "none";
	       document.getElementById("Page2").style.display = "block";

	     //	console.log(JSON.stringify(data));
	       	//console.log(data);
	      //window.location.href = "./results.html";
	        
	    },
	    error: function(xhr, ajaxOptions, thrownError) {
	        // handle your fail response here
	        alert("Oops cant't process your request");
	    }
	});		
	

}

function doStuffOnSuccess() {

}

function applyFilters() {

	var x = document.getElementById('ageLowerBound').value;
	var y = document.getElementById('ageUpperBound').value;
	var z = document.querySelector('input[name = "gender"]:checked').value;

	if(x != "")
		ageLowerBound=x;
	else
		ageLowerBound = 0;

	if(y!= "") 
		ageUpperBound = y;
	else
		ageUpperBound = 200;

	if(gender != null)
	gender = z;
	else
	gender = "ANY";
	//alert(gender);
}

/*
$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});*/