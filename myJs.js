function chooseFile() {
      $("#fileupload").click();
   }

function applyFilters() {
	var ageLowerBound=document.getElementById('ageLowerBound').value;
	var ageUpperBound=document.getElementById('ageUpperBound').value;
	var gender = document.querySelector('input[name = "gender"]:checked').value;
	alert(gender);
}