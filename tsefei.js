var feild1 = document.getElementsByName("sess")[0];
var feild2 = document.getElementsByName("subject")[0];
feild2.value = "PMATH";
var feild3 = document.getElementsByName("cournum")[0];
feild3.value = 351;
document.getElementsByTagName("form")[0].submit();

//---------------------------------------------------------------nextpage
var checking2 = setInterval(function(){
	var cotaleft = parseInt(document.getElementsByTagName("td")[12].innerText)-parseInt(document.getElementsByTagName("td")[13].innerText);
	if (cotaleft>0){
		alert('wow, someone drop');
		clearInterval(checking2);
	}
},60000);
//-----new


var mynewwindow = window.open("http://www.adm.uwaterloo.ca/infocour/CIR/SA/under.html", "MsgWindow", "width=200,height=100");


var checking1 = setInterval(function(){
	if (mynewwindow.document){
		clearInterval(checking1);
		var feild1 = mynewwindow.document.getElementsByName("sess")[0];

		var feild2 = mynewwindow.document.getElementsByName("subject")[0];

		feild2.value = "PMATH";

		var feild3 = mynewwindow.document.getElementsByName("cournum")[0];

		feild3.value = 351;

		mynewwindow.document.getElementsByTagName("form")[0].submit();
		var checking2 = setInterval(function(){
			var cotaleft = parseInt(mynewwindow.document.getElementsByTagName("td")[12].innerText)-parseInt(mynewwindow.document.getElementsByTagName("td")[13].innerText);
			console.log(cotaleft);
			if (cotaleft>0){
				alert('wow, someone drop');
				clearInterval(checking2);
			}
			mynewwindow.location.reload();
		},60000);
	}
},500);
