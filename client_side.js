//initiating ajax
			var xmlHttp = createXmlHttpRequestObject();
			
			//create the variables for the quiz data
			var question_answers;
			var correct_answer;
			var arr_length;
			var external_count = 0;
			var user_score = 0;
			
			function createXmlHttpRequestObject(){
				var xmlHttp;
				
				if(window.ActiveXObject){
					try{
						xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");//for internet explorer
					}catch(e){
						xmlHttp = false;
					}
				}
				else{
					try{
						xmlHttp = new XMLHttpRequest();//for firefox and others
					}catch(e){
						xmlHttp = false;
					}
					
				}
				
				//if object couldn't be sent
				if(!xmlHttp)
					alert("object creation failed");
				else
					return xmlHttp;
				
			}
				
				
	function check_cookie(){
		//generate today's date for cookie
			var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();

				if(dd<10) {
				dd='0'+dd
					} 

				if(mm<10) {
					mm='0'+mm
				} 

			today = mm+'/'+dd+'/'+yyyy;
			
			
			var cookie_input = document.cookie.split(';');
			
			
			
			
			var temp_3 = "" + cookie_input[0];
			today = today.trim();
			temp_3 = temp_3.trim();
			//alert(temp_3);
			//alert(today);
			if(temp_3 == today){
				error_1();
			}
			
			//alert("miss");
			//give the user a cookie immediately
			//document.cookie = today;
		alert("quiz generator hit");
		quizGenerator();
		
	}			
				
				
				
				
				
				
	//this function generates the quiz based on elements from the database			
	function quizGenerator(){		
	
			//remove the button that initializes the game
			var elem = document.getElementById('theButton');
			elem.parentNode.removeChild(elem);
			
            
		
			
			
			if(xmlHttp.readyState==4 ||xmlHttp.readyState==0){
				var button_clicked;
				
				xmlHttp.onreadystatechange = handleServerResponse;
				//make request handle and send
				xmlHttp.open("POST", "server_side.php",true);
				
				//Send the proper header information along with the request
				xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				
				
				
				xmlHttp.send("external_count="+external_count);
				
			
				  if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					//alert(http.responseText);
					}

				
				
				
			}
			else{
				setTimeout('process()',1000);
			}
	
			 
	}
	
	
	
	function handleServerResponse(){
		
		//check the status of the server and pull out data
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				
				xmlResponse = xmlHttp.responseText;
				var string_from_php = xmlResponse;
				alert(string_from_php);
				//parse out all of the values from the responce
				var split_string_array = string_from_php.split("<element>");
			
				
				var split_second_string_array = split_string_array[1].split("</element>");
				var split_third_string_array = split_string_array[2].split("</element>");
				var split_fourth_string_array = split_string_array[3].split("</element>");
				var final_question_array = split_fourth_string_array[0].split('&');
				
				
				var string_question = final_question_array[0];	
				var string_options = split_second_string_array[0];
				var string_correct_answer = split_third_string_array[0];
				correct_answer = parseInt(string_correct_answer);
				
			
				
				//create an element to add to the form
				var Title_Element_new = document.createElement('p');
				var label_new = document.createTextNode(string_question);
				Title_Element_new.appendChild(label_new);
				document.body.appendChild(Title_Element_new);
				
				alert(string_question);
				
				//parse out the options array
				var options_array = string_options.split(":");
				arr_length = options_array.length;
				var counter = 1;
				
				
				while(counter < arr_length){
					var answer = options_array[counter];
					
				//make the radio buttons
				var Title_Element = document.createElement('input');
				var label = document.createTextNode(counter);
				Title_Element.setAttribute('type','Radio');
				Title_Element.setAttribute('value',counter);
				Title_Element.setAttribute('name','Answer');
				Title_Element.setAttribute('id',counter);
				
				document.body.appendChild(Title_Element);
				
				//create text for the radio button
				var Title_Element_2 = document.createElement('p');
				var label = document.createTextNode(answer);
				
				Title_Element_2.appendChild(label);
				Title_Element_2.appendChild(Title_Element);
				document.body.appendChild(Title_Element_2);
				counter++;
				}
				
				//once out of the while loop create a button for the next question
				var buttonnode= document.createElement('input');
				buttonnode.setAttribute('type','button');
				buttonnode.setAttribute('name','NextQuestion');
				buttonnode.setAttribute('value','Next Question');
				buttonnode.setAttribute('id','theButton');
				document.body.appendChild(buttonnode);
				document.getElementById("theButton").onclick = question_click_handler;
				
					//check if the end has been reached
				if(string_question == 'Ending_Reached'){
					quizOver();
				}
				
				
				//setTimeout('process()',1000);
			}
			else{
				//alert("error");
			}
		}
		
		
		
	}
	
	//this section of code deals with when the button is clicked
	function question_click_handler(){
		
		var counter = 1;
		var flag = 0;
		while(counter < arr_length && flag != 1){
		if (document.getElementById(counter).checked) {
			flag = 1;
		}
			counter++;
		}
		
		
		//if no button is selected regenerate the questions;
		if(flag != 1){
		// alert("Nothing Selected");
		}
		
		//create a variable to see what the user answered
		var user_answer = counter - 1;
		
		if(user_answer == correct_answer){
			user_score++;
		}
		
		
		alert(user_answer);
		alert(correct_answer);
		external_count++;
		
		
		
		//clear out all of the old elements of the screen
		clear_screen();
		
		quizGenerator();
		
		
		
		
	}
	
	
	function clear_screen(){
		//create counter variable
		var counter = 1;
		
		//remove out the text
		document.body.innerHTML = document.body.innerHTML.replace( /ERROR: AffiliateID invalid/g, "");
			
			//remove a radio button		
		while(counter < arr_length){
			var elem = document.getElementById(counter);
			elem.parentNode.removeChild(elem);
			counter++;
		}
		
		//remove out the text
		var p_list = document.getElementsByTagName("p");
		for(var i=p_list.length-1; i>=0; i--){
        var p = p_list[i];
            p.parentNode.removeChild(p);
        
		}
		return;
	}
	
	function quizOver(){
		
		
		//remove the button that initializes the game
			var elem = document.getElementById('theButton');
			elem.parentNode.removeChild(elem);
		
		//remove the remaining elements after you exit
		clear_screen();
		
		//prepare variables for score
		var score_string = "Your Score was: " + user_score + " out of " + external_count; 
		var percentage = user_score/external_count;
		var display_percentage = percentage*100;
		display_percentage = parseFloat(Math.round(display_percentage * 100) / 100).toFixed(2);
		//alert(display_percentage);
		var user_percentage_string = display_percentage + "";	
		user_percentage_string = "You got: " + display_percentage +"% correct";
		score_string = score_string + "\n" + user_percentage_string;
		
		
		
		
			//create an element to add to the form
				var Title_Element_new = document.createElement('p');
				var label_new = document.createTextNode(score_string);
				
				Title_Element_new.appendChild(label_new);
				document.body.appendChild(Title_Element_new);
				
				
		
		//open up the connection again to send more information
		if(xmlHttp.readyState==4 ||xmlHttp.readyState==0){
				var button_clicked;
				
				xmlHttp.onreadystatechange = handleServerResponse2;
				//make request handle and send
				xmlHttp.open("POST", "server_side.php",true);
				
				//Send the proper header information along with the request
				xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				
		
				xmlHttp.send("percentage="+percentage);
				
			
				  if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					//alert(http.responseText);
					}

				
				
				
			}
			else{
				setTimeout('process()',1000);
			}
		
		
		
	
	}
	
	
	
	
	
	
	
	
	//another handler for server responces
	function handleServerResponse2(){
		
		//create the improved array
		var improved_array_from_php_2;
		
		
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				
				xmlResponse = xmlHttp.responseText;
				var string_from_php = xmlResponse;
				
				//pull out the average that was calculated on the server
				var percentage_array = string_from_php.split('<s>'); 
				var next_split_array = percentage_array[1].split('</s>');
				var percentage_double = parseFloat(next_split_array[0]);
				percentage_double = percentage_double * 100;
				var display_percentage = parseFloat(Math.round(percentage_double * 100) / 100).toFixed(2);
				
				var output_string = "The average Score for today's Quiz is:  " + display_percentage;
				
				
				//create an element to add to the form
				var Title_Element_new = document.createElement('p');
				var label_new = document.createTextNode(output_string);
				
				Title_Element_new.appendChild(label_new);
				document.body.appendChild(Title_Element_new);
		
		
		}
		
		}
		
		
	
		
		
		
		
		
		
	}
	
	
	function error_1(){
		
		alert("Sorry You Cannot Take This Quiz: Please Try again Tommorow");
		
		
		//create an element to add to the form
				var Title_Element_new = document.createElement('p');
				var label_new = document.createTextNode("Sorry Try Again Tomorrow");
				
				Title_Element_new.appendChild(label_new);
				document.body.appendChild(Title_Element_new);
		die();
		
	}
			   