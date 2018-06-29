
	var elementget;
	function travel(x){
		// console.log(x);
		x.oncontextmenu = function(){
			justrightclick(x);
		};
		// if (x.style){
	 //        x.style.color = "white";
	 //        x.style.backgroundColor = "black";
	 //        x.style.borderColor = "white";

	 //    }
	 	
		if (x.childNodes){
	        for (var j=0; j<x.childNodes.length; j++){
	            travel(x.childNodes[j]);
	        }
	    }
	    if (x.getElementsByTagName){
	    	for (var j=0; j<x.getElementsByTagName("frame").length; j++){
				var theFrame = x.getElementsByTagName("frame")[j];
				var theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
				travel(theFrameDocument);
			}
	    }
	    
	}

	travel(document.body);
	for (var j=0; j<document.getElementsByTagName("frame").length; j++){
		var theFrame = document.getElementsByTagName("frame")[j];
		var theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
		travel(theFrameDocument);
	}
	
	// document.body.onscroll = function(){
	// 	travel(document.body);
	// };

	function justrightclick(x){
		// console.log(x);
		if (!elementget){
			// console.log(x);
			elementget = x;
			// alert('get'+ x.tagName);
			showhelpbox();
		} else {
			return;
		}
	}

	var mynewwindow;
	function showhelpbox(){
		mynewwindow = window.open("", "", "width=400,height=300");
		if (!mynewwindow){
			elementget = undefined;
		} else {
			mynewwindow.onbeforeunload = function () {
			    elementget = undefined;
			    travel(document.body);
				for (var j=0; j<document.getElementsByTagName("frame").length; j++){
					var theFrame = document.getElementsByTagName("frame")[j];
					var theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
					travel(theFrameDocument);
				}
			}
			// console.log(mynewwindow.document.body);
			var currentdate = new Date();
			var nowtime =  pad(currentdate.getHours())+":"+pad(currentdate.getMinutes())+":"+pad(currentdate.getSeconds())+"."+pad(currentdate.getMilliseconds());
			mynewwindow.document.body.innerHTML = 'The thing you want to click:<div style="border: 2px solid red;">'+elementget.outerHTML+'</div><div style="red"></div><br>Time to click:<br><input id="usertimeinput" type="time" step="0.01" value="'+nowtime+'"></input><br><button id="buttongo">Go</button>';
			mynewwindow.document.getElementById("buttongo").onclick = function(){
				startclicker();
			}
		}
		
	}


	function startclicker(){
		var usertimeinput = mynewwindow.document.getElementById("usertimeinput").value;
		var currentdate = new Date();
		var timegap = (Number(usertimeinput.substring(0,2))-currentdate.getHours())*60*60*1000+(Number(usertimeinput.substring(3,5))-currentdate.getMinutes())*60*1000+(Number(usertimeinput.substring(6,8))-currentdate.getSeconds())*1000;
		if (usertimeinput.length>8){
			timegap+=Number(usertimeinput.substring(9,12))-currentdate.getMilliseconds();
		} else {
			timegap+=0-currentdate.getMilliseconds();
		}
		if (timegap<0){
			if (confirm("It will be tommerow, are you sure?")){
				timegap+=24*60*60*1000;
			} else {
				return;
			}
		}
		setTimeout(function(){
			elementget.click();
			mynewwindow.close();
			elementget = undefined;
		}, timegap);
		mynewwindow.document.write("Click at "+usertimeinput+"<br><hr>Countdown<br><div id='countdownidisplay' style='font-size:30px;'></div>");
		var distance = timegap;
		var timerdisplay = setInterval(function() {
		    distance-=100;
		    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		    //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		    var minutes = Math.floor((distance) / (1000 * 60)); //% (1000 * 60 * 60)) / (1000 * 60));
		    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		    var miliseconds = Math.floor((distance % (1000)));
		    mynewwindow.document.getElementById("countdownidisplay").innerHTML = minutes + "m " + seconds + "s " + miliseconds.toString().substring(0,1) + "00ms";
		    if (distance <= 0) {
		        clearInterval(timerdisplay);
		    }
		}, 100);
	}

	function pad(num) {
        var s = num+"";
        if (s<10){
           s = "0" + s;
        }
        return s;
    }
	// var currentdate = new Date(); 
 //    var nowdate =  pad(currentdate.getFullYear())+"-"+pad(currentdate.getMonth()+1)+"-"+pad(currentdate.getDate());
 //    var nowtime =  pad(currentdate.getHours())+":"+pad(currentdate.getMinutes())+":"+pad(currentdate.getSeconds())+":"+pad(currentdate.getMilliseconds());
