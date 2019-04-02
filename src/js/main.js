function test(){
var eng = ['green', 'yellow', 'red', 'black'];
var rus = ['зеленый', 'желтый', 'красный', 'черный'];

do{
var index = Math.floor(Math.random() * (eng.length -1));
var answer = prompt (eng [index]);
if (rus [index] == answer){

alert ('Красаучег');
} else {

    alert (' Иди подучи');
}
} while (confirm ('continue?'));
}

test();