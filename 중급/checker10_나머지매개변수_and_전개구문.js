/*** 나머지 매개변수, 전개구문 (Rest parameters, Spread syntax) */
 // ... 이렇게 점 3개로 시작함

// 인수 전달
function showName(name){ // showName안에 매개변수 name 은 개수 제한이 없음
    console.log(name);
}
showName('Mike'); //'Mike'
showName('Mike', 'Tom') // ?

showName(); // name에 아무것도 넣지않았으니 undefined 가 찍힘
//함수에 인수를 얻는 방법은 2가지가 있다. // arguments 와 나머지 매개변수로 가능하다
//화살표함수에는 arguments를 쓸 수 없음

/**** ****************
 arguments
 함수로 넘어 온 모든 인수에 접근
 함수내에서 이용 가능한 지역 변수
 length / index
 Array 형태의 객체
 배열의 내장 메서드 없음 (forEach, Map)
 * */

function showName(name) {
    console.log(arguments.length);
    console.log(arguments[0]);
    console.log(arguments[1]);
}
showName('Mike','Tom')