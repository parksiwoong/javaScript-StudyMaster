//코드 2-28
var a = eval('10+5');
console.log(a); //15

var add = new Function('a,b' 'return a + b;');
add(10,5); //15
