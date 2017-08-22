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
    var url = "http://172.16.44.36:4567/predictions";  

	var file_data = $("#fileupload").prop("files")[0];
   // localStorage("UploadedFile",file_data);
	var fd = new FormData();

		fd.append("image", file_data);
		fd.append("age1",ageLowerBound);
		fd.append("age2",ageUpperBound);
		fd.append("gender",gender);
		//fd.append("ethinicity","ANY");

		$.ajax({
	    	type: "POST",
            enctype: 'multipart/form-data',
            url: "http://172.16.44.36:4567/predictions",
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
	        if(x == 0){
	        	alert("No Data Found!! Please Change the filters.");
	        	return;
	        }
			_totalDefaultImages = Math.min(x,9);
		   for(var i = 0;i<_totalDefaultImages;i++) {
		 	//	var uri = './Resources/' + i.toString() + '.jpg';
				//console.log(uri);

			_defaultImageLinks.push(getImageFromBase64(i));
		    //console.log(i);
			}
			var holder = document.getElementById("matchContainer");

			var div1 = document.createElement("div");
		    div1.setAttribute("class","container");

		    var div2 = document.createElement("div");
		    div2.setAttribute("class","row");


		    for(var j = 0;j<_totalDefaultImages;j++) {

		    	 
		    	var div3 = document.createElement("div");
		    	div3.setAttribute("class","col-md-4");


		    	var div4 = document.createElement("div");
		    	div4.setAttribute("class","thumbnail");

		    	var img = document.createElement("img");
		    	img.style.width = "100%";
		    	img.src = _defaultImageLinks[j];

		    	var div5 = document.createElement("div");
		    	div5.setAttribute("class","caption");

		    	var para = document.createElement("p");

		    	var actorDisplayData = "<center><h5> Name: " + _data['celebrities'][j]['name'] + ", Age:" + _data['celebrities'][j]['age'] + ", " + _data['celebrities'][j]['gender'] + ", " + _data['celebrities'][j]['probability']+  "%";

		    	para.innerHTML = actorDisplayData;


		    	div4.appendChild(img);
		    	div5.appendChild(para);
		    	div4.appendChild(div5);
		    	div3.appendChild(div4);
		    	div2.appendChild(div3);



		    	  /*var parentDiv = document.createElement("div");
		 
		    	  var newDiv1 = document.createElement("div");
		    	  var newDiv2 = document.createElement("div");

		    	  parentDiv.setAttribute("class","container-fluid");
		    	  
		    	  newDiv1.setAttribute("class","cover-item");
		    	  //newDiv1.style.height="80%";
		          newDiv1.style.backgroundImage = 'url(' + _defaultImageLinks[j] +')';

		          newDiv2.setAttribute("class","caption");
		          newDiv1.style.backgroundRepeat = "no-repeat";
		          newDiv2.innerHTML = _data['celebrities'][0]['name'];
		          
		    	 // var newDiv2 = document.createElement("div");
		    	  //newDiv2.setAttribute("class","row");
		    	  
		        //  parentDiv.appendChild(innerDiv);
		          parentDiv.appendChild(newDiv1);
		          //parentDiv.appendChild(newDiv2)
		          holder.appendChild(parentDiv); */
		    }

		    
		    div1.appendChild(div2);
		    holder.appendChild(div1);

		    //console.log(localStorage['UploadedFile'] );
		   //2 document.getElementById("leftPlaceholder").style.backgroundImage = 'url(' + getImageFromBase64FromData(_data['orignalImgB64']) + ')';
		    document.getElementById("rightPlaceHolder").style.backgroundImage = 'url(' + getImageFromBase64(0) + ')'
		    //console.log(ageLowerBound);
		    var holder2 = document.getElementById("bestMatchAttrib");

		    var htmlToBeRendered = "<h2 class='lead text-muted'>Expected Age : " 
		    + _data['age'] + " </script></h2> <h2 class='lead text-muted'>Expected Gender: " 
		    + _data['gender'] 
		    //+ "</h2><h2 class='lead text-muted'>Ethinicity:" 
		    //+_data['ethinicity'] 
		    +"</h2> <h2 class='lead text-muted'>Matching Probability: " 
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

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function imageIsLoaded(e) {
	document.getElementById("leftPlaceholder").style.backgroundImage = "url(" + e.target.result + ")";
    //$('#').attr('src', e.target.result);

};
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