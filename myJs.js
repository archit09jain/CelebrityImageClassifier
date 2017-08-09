var totalDefaultImages = 10;
var defaultImageLinks = [];
var ageLowerBound = 0;
var ageUpperBound =100;
var gender = "ALL";
var imagePointer = undefined;
var _data = undefined;


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
	        localStorage.setItem("_data",JSON.stringify(data));
	     
	       	//console.log(data);
	       window.location.href = "./results.html";
	        
	    },
	    error: function(xhr, ajaxOptions, thrownError) {
	        // handle your fail response here
	        alert("Oops cant't process your request");
	    }
	});		
	

}


function applyFilters() {
	ageLowerBound=document.getElementById('ageLowerBound').value;
	ageUpperBound=document.getElementById('ageUpperBound').value;
	gender = document.querySelector('input[name = "gender"]:checked').value;
	//alert(gender);
}


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

});