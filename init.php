<?php
//set timer
ini_set('max_execution_time', 300);


//initialize database by drawing in files
//get into database
 $db_connection = mysqli_connect('localhost','root', '', 'daniel');
 
 
 //create table
  //generate the basic table for words
 $sql_input_query = "CREATE TABLE questions(
 question varchar(200),
 answers varchar(1000),
 correctAnswer int,
 catNumber int
 )";

 //query to create the database
 $result = $db_connection->query($sql_input_query);
 
 
 
 //open the file
 $file_pointer = fopen("c:/xampp/htdocs/questions.txt","r+");
 
 //hold a variable for the options output string
 //it must be declared outside of the loop so it is not constantly destroyed
 $output_options_string = "";
 
 //loop until the end of the file is reached
 while(!feof($file_pointer)){
	 
	//get the first line
	$line_1 = fgetss($file_pointer, 512);
	$line_1 = rtrim($line_1);
	
	//copy the first line which we know is a question into question String
	$question_string = $line_1;
	
	//loop over the answers and append them together
	//this loop goes on until the typeline variable is set to true
	$type_line_hit = false;
	$variable_question_type = 0;
	
	$correct_answer_int = -999;
	while($type_line_hit == false){
		
		//read in another line
		$line_1 = fgetss($file_pointer, 512);
		$line_1 = rtrim($line_1);
		
		 
		
		//check to see if the line we are on is the type line
		$word_array = explode(":",$line_1);
		//now check to see if the word "Type" is the first value in the word array
		if(strcmp("Type",$word_array[0]) == 0){
			//set the type line hit to true
			$type_line_hit = true;
			$variable_question_type = $word_array[1];
			
			//read in the next line and then see if what we get is good
				$line_1 = fgetss($file_pointer, 512);
				$line_1 = rtrim($line_1);
			//then go on to parse out the answer from the strings by exploding
			//the input string and then selecting it out of an array
			$temp_array = explode(":",$line_1);
			$correct_answer_int = $temp_array[1];
			
			//draw in 1 extra line to deal with space between questions
			$line_1 = fgetss($file_pointer, 512);
		}else{ //the case where we are not on the type line 
			 
			//start pulling out some strings and concatinating them together
			$output_options_string = $output_options_string.":".$line_1;
		}
		
	}//end type_line_hit loop
	
	 //insert the values into the database
 $sql_input = "INSERT INTO questions VALUES ('$question_string','$output_options_string','$correct_answer_int','$variable_question_type');";

  echo  $sql_input;
 
			//printout a break for tracing purposes
			?> <br></br> <?php
	//reset the options output string
	$output_options_string = "";
	
	//now run the actual query to insert
	$result = $db_connection->query($sql_input);
 }//end feof loop
 
 

 //mysql_query($sql_input,$db_connection) or die ("Invalid insert " . $db_connection->error) ;
 
 
 


 echo "Done";
 
 
 
 

?>