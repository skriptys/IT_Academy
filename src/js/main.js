var questions = ['First name', 'Last name', 'Gender', 'Age'];
var answers = [];

for (var i = 0; i < questions.length; i++){
  
 answers[i] = prompt ('Введите' + questions[i]); 
  
}

alert (answers);