<?php

//this section will be the server side for generating the daily quiz for the player

$var_x = $_POST['external_count'];

if(isset($_POST['percentage'])){
	$percentage = $_POST['percentage'] * 100;
	goto score_database_access;
}



//generate a different random number daily. based on this number it will be decided which question bank is selected from
  $interval = 1; // Interval in seconds generates every day
  srand(floor(time() / $interval)); 
  $int_random = rand(1, 3); 
 // echo "<br>$int_random</br>";
  
  

//arrays for questions and answers
$questions_array = [];
$answers_array = []; 
$correct_answers_array = [];
  
//connect to the database and draw out all questions within category
$db = new mysqli('localhost','root','','daniel');
 if ($db->connect_error):
       die ("Could not connect to db " . $db->connect_error);
    endif;
	
	//select out the questions from the dataset array from database
	$query = "select questions.question from questions where questions.catNumber = $int_random";
	$result = $db->query($query);
	$rows = $result->fetch_all(MYSQLI_ASSOC);
	
		$count = 0;
		foreach($rows as $row){
			$questions_array[$count] = $row['question'];
			$count++;
		}
	
	//select out the correct answers from the array
	$query = "select questions.correctAnswer from questions where questions.catNumber = $int_random";
	$result = $db->query($query);
	$rows = $result->fetch_all(MYSQLI_ASSOC);
	
		$count = 0;
		foreach($rows as $row){
			$correct_answers_array[$count] = $row['correctAnswer'];
			$count++;
		}
	
	//select out the choices from the array
	$query = "select questions.answers from questions where questions.catNumber = $int_random";
	$result = $db->query($query);
	$rows = $result->fetch_all(MYSQLI_ASSOC);
	
		$count = 0;
		foreach($rows as $row){
			$answers_array[$count] = $row['answers'];
			$count++;
		}
	
	//generate the size of the quiz
	//generate a random number daily for the length of the quiz. the quiz will be at least 3 questions and at most as many questions as there are questions
  $interval = 1; // Interval in seconds generates every hour
  srand(floor(time() / $interval)); 
  $int_question_count = rand(3,count($questions_array)); 
  //echo "<br>$int_question_count</br>";
  
  //I have this variable so I know the absolute highest question I can draw 
  //from on the quiz
	$max_quiz_size = count($questions_array);
	
	
	//this loop creates an array of random numbers equal to the length of the quiz
	//based on the numbers generated, questions will be selected out of the array
	$count = 0;
	$selected_questions_array = [];
	while($count < $int_question_count){
			$random = rand(0,count($questions_array)- 1);
	
		
		if(in_array($random,$selected_questions_array)){
			//do nothing and regenerate
		}
		else{
			$selected_questions_array[$count] = $random;
			$count++;
		}
		
	}
	
	$temp = $_SESSION['views'];
	
	//check to see if var x is greater than the length of the quiz
	if($var_x > $int_question_count - 1){
		$string_1 = "Ending_Reached";
		$string_2 = "Ending_Reached";
		$string_3 = "Ending_Reached";
		
		//echo out some xml
	$xml = new DomDocument('1.0','UTF-8');
	
	//generate the xml here for the ajax call
	$output = $xml->createElement('element',$string_1);
	$xml->appendChild($output);
	$output = $xml->createElement('element',$string_2);
	$xml->appendChild($output);
	$output = $xml->createElement('element',$string_3);
	$xml->appendChild($output);
	
	echo $xml;
	echo $xml->saveXML();
		
		
		goto skip_2;
	}
	
	
	
	//Here is where you need to increment the counter
	$int_first_question = $selected_questions_array[$var_x];
	
	
	
	
	//DO NOT CHANGE ANY OF THESE LINES BELOW HERE
	//select out the questions for the quiz	
	$string_1 = $answers_array[$int_first_question];
	//echo "<br>$string</br>";
	
	//select out the questions for the quiz	
	$string_2 = $correct_answers_array[$int_first_question];
	//echo "<br>$string</br>";
	
	//select out the questions for the quiz	
	$string_3 = $questions_array[$int_first_question];
	//echo "<br>$string</br>";
	

	
	//echo out some xml
	$xml = new DomDocument('1.0','UTF-8');
	
	
	$output = $xml->createElement('element',$string_1);
	$xml->appendChild($output);
	$output = $xml->createElement('element',$string_2);
	$xml->appendChild($output);
	$output = $xml->createElement('element',$string_3);
	$xml->appendChild($output);
	echo $xml->saveXML();
	
	//increment for the next page use
	$_SESSION['views'] = $_SESSION['views']+1;

skip_2:	
//this line essencially means to quit the program. I wrote this when I was new to PHP
//and because I couldn't find a System.exit() like command I just did this.
	goto exit_1;

	
Error_Message:

echo "<br>Sorry You have already taken the quiz for today!!! Please Come back Tomorrow</br>";	

//this line essencially means to quit the program. I wrote this when I was new to PHP
//and because I couldn't find a System.exit() like command I just did this.
goto exit_1;

score_database_access:

//put the new score into the database
 //get into database
 $db_connection = mysqli_connect('localhost','root','','daniel');
 
 //generate the query for the input to put the values into the database for scores
  $sql_input = "INSERT INTO scores VALUES ('1','$percentage')";
  mysql_query($sql_input,$db_connection) or die ("Invalid insert " . $db_connection->error) ;
  
  
  //retrieve the average of all scores from the database
  //connect to the database and draw out all questions within category
	$db = new mysqli('localhost','root','','daniel');
	if ($db->connect_error):
       die ("Could not connect to db " . $db->connect_error);
    endif;
  
	//select out the choices from the array
	$query = "SELECT AverageScore FROM scores WHERE UserID = '1'";
	$result = $db->query($query);
	$rows = $result->fetch_all(MYSQLI_ASSOC);
	
		
		//create a new dom for the total
		$xml = new DomDocument('1.0','UTF-8');
		
		$total_score = 0;
		$count = 0;
		$whole_average = 0;
		foreach($rows as $row){
			$test  = $row['AverageScore'];
			$total_score = $total_score + intval($test);
			$count++;
	
		}
		//create the whole average
		$whole_average = $total_score/($count*100);
		
		$output = $xml->createElement('s',$whole_average);
		$xml->appendChild($output);
	
	
	echo $xml->saveXML();
	
	
	
	
exit_1:
	



?>