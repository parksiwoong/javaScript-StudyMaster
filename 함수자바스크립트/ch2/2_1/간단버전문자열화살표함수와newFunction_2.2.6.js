//코드 2-29 간단 버전 문자열 화살표 함수
function L(str){
    var splitted = str.split('=>');
    return new Function(splitted[0], 'return('+splitted[1]+' ;');
}
//코드 2-30 10,000 번 선언해보기
consol.time('익명 함수');
for(var i =0; i <10000; i++){
    (function(v) {return v;})(i)
}
console.timeEnd('익명함수'); // 익명함수 : 0.9ms ~ 1.7ms
console.time('new Function');
for(var i = 0; i < 10000; i++){
    L('v=>')(i) //new Function
}
console.timeEnd('new Function'); //new Function: 337ms ~ 420ms

//코드 2-31 익명함수와 문자열 화살표 함수
console.tim('1');
var arr = Array(10000);
_.map(arr, function(v, i){
    return i * 2;
});
console.timeEnd('1'); // 1: 0.5ms ~ 0.7ms