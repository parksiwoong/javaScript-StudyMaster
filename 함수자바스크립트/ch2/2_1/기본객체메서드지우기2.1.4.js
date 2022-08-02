//코드 2-12 기본객체의 메서드 지우기
var obj = {a:1, b:2 , c:3, length: 6};
delete obj.a;
delete obj['b']
delete obj['C'.toLowerCase()];
console.log(obj);

delete Array.prototype.push;
var arr1 = [1,2,3];
//arr1.push(4);

//코드 2-13 일반적인 함수 정의
function add1(a,b){
    return a + b;
}
var add2 =function(a,b){
    return a + b;
};
var m = {
    add3: function(a,b){
        return a+b
    }
}
    //hi();
//코드 2-16 선언한 적 없는 변수 참조하기
//var a = hi;

//코드 2-17 실행하지 않고 참조만 해보기
console.log(add1);
console.log(add2); // undefined

function add1(a,b){
    return a+b;
}
var add2 = function (a,b ){
    return a+ b;
};
