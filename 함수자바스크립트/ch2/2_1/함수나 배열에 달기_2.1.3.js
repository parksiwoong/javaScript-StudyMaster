/** 2-6 */
function obj8() {}
obj8.a = 1;
obj8.b = 2;
console.log(obj8.a) //1
console.log(obj8.b) //2
//함수도 객체로 쓰임 key / value가능

/** 2-7 호이스팅 */
/*
obj9.a = 1;
obj9.b = 2;
console.log(obj9.a + obj9.b);*/

/** 2-8 배열에 숫자가 아닌 key 사용 */
var obj10 = [];
obj10.a = 1;
console.log(obj10); //1
console.log(obj10.length); //0
//배열도 객체며 key사용가능 근데 key로 사용하면 length는 변하지 않음

//2-9 배열에 숫자로 key 사용하기
var obj11 = [];
obj11[0] = 1;
obj11[1] = 2;
console.log(obj11); // [1,2]
console.log(obj11.length) //2
//배열에 숫자로 key를 직접할당해도 push와 동일하게 동작함, length 도 같이 올라련

console.log(obj11.length);

//2-10 한번에 length 올리기
var obj12 = [];
obj12.length = 5;
console.log(obj12);

var obj13 = [1, 2];
obj13[5] = 5;
console.log(obj13);
//[1,2,3,4,5]
console.log(obj13.length);
//6
obj13.push(6);
console.log(obj13);
// [ 1,2,5: 5,6 :6]

console.log(obj13.length); //7

// 성능차이
var l = 100000;
var list = [];
for(var i = 0; i <l; i++){list.push(i); }
//3ms ~ 4.8ms

var l = 100000;
var list = [];
for (var i = 0; i <l ; i++){list[list.length] = i};
//2.3ms ~ 3.4ms

var list = [];
list.length = l;
for(var i = 0 ; i < l; i++){
    list[i] = i;
}

var l = 100000;
var list = Array(l);
for(var i =0; i < l; i++){
    list[i]=i;
}


Array.apply(null, {length: 3});
console.log(obj13['len' + 'gth']);

obj13['len' + 'ght'] = 10
console.log(obj13.length); //10