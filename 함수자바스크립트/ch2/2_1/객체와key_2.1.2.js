
/** 코드 2-1 ekdidgks key/value 정의 방법*/
var obj = {a: 1, "b" : 2};
obj.c = 3;
obj['d'] = 4;
var e = 'e'
obj[e] = 5;
function f() {return 'f'; }
obj[f()] =6;
console.log(obj);

/**코드 2-2 띄워쓰기, 특수 문자 , 숫자*/
var obj2 = {" a a a ":1};
obj2[' b b b '] = 2;
console.log(obj2)

//특수 문자를 써도 key로 만들 수 있다.
var obj3 = { "margin-top": 5};
obj3["padding-bottom"] = 20;
console.log(obj3)
//{mvargin-top: 5, padding-bottom:20}

//숫자키도 key로 쓸 수 있다.
var obj4 = {1:10};
obj4[2] = 20;
console.log(obj4);
// {1: 10, 2: 20}

/** 2-3 코드가 실행되지 않는 key 영역 */
//var obj5 = { (true ? "a" : "b"): 1 };
// {} 안쪽의 key 영역에서는 코드 실행 불가

/** 2-4 코드가 실행되는 key 영역 */
var obj6 = {};
obj6 [true ? "a" : "b"] =1;
console.log(obj6)

/** 코드 2-5 es6 에서 동작하는 {} 안쪽에 대괄호 사용*/
var obj5 = { [true ? "a" : "b"]: 1}
console.log(obj5)

