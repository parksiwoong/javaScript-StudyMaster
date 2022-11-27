//코드 2-28
var a = eval('10+5');
console.log(a); //15

var add = new Function('a,b' ,'return a + b;');
add(10,5); //15

function L(str){
    var splitted = str.split('=>');
    return new Function(splitted[0], 'return (' + splitted[1] + ');');
}
L ('n => n * 10')(10);//100
L('n => n * 10')(20);//200
L('n => n * 10')(30);//300

L('a, b => a + b')(10,20);//30
L('a, b => a+b')(10,5);//15

//2-30 10,000번 선언해 보기
console.time('익명 함수');
for(var i = 0; i <10000; i++){
    (function(v) {return v;})(i);
}
console.timeEnd('익명 함수'); // 익명 함수 : 0.9ms ~1.7ms
console.time('new Function');
for(var i = 0; i <10000; i++){
    L('v => v')(i); //new Function
}
console.timeEnd('new Function'); //new Function: 337ms~420ms