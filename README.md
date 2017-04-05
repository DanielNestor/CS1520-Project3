Language Quiz of the Day Generator:
By Daniel Nestor

Environment Project was run on
OS: Windows 7
Browser: Google Chrome Version 56.0.2924.87
Server: Xampp V3.2.1 Apache Server
Database: MySQL

This program takes in a formatted text file in the htdocs folder on xampp called "questions.txt" and loads
a database with the information provided. The text must be formatted in the form  listed below. This program
utilizes both Javascript and PHP to provide asynchronus access to the questions without reloading the page
The user can create their own questions by adding their own to the "questions.txt" file. 

To run this program first initialize the database with the text by running
localhost/init.php

Then to run the actuall quiz run as
localhost/project3.php


Format of the text file
for the text file to be read by the program it must be formatted properly in this form

Question<br />
Answer 1<br />
Answer 2<br />
Answer ...<br />
Type:#<br />
Answer:#<br />
Blank Line<br />

Question<br />
This line is exactly as it sounds, Put question here example: "How many Days are there in a year?";

Answer<br />
Beneath the question line you can put possible answers to the question each new answer needs to be on an new line.
For example:
365
269
130
80
79

<Type:#> 
This line determines what type of question is being asked. This quiz game categorizes the inputs it gets and will only
display questions of one type per quiz. To make the type just type "Type:$number_that_you_want"
Example:
Type:5

<Answer:#> 
This line marks the answer. The count starts at 1 and goes as long as as many questions as the user made. For our example
the correct way to write this line would be "Answer:1" because the correct answer is on the first line.

<Blank Line>
This is just to separate questions. They all must be separated by exactly one line

An example text file is provided in the repo so that you can see an example of how it is made





Known Bugs:

There seems to be a problem with the Ajax calls at times timing out for no appearant reason. In later versions I should have a fix
