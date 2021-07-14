/****
 * 클로저 ( Closure)
 *
 * 함수와 렉시컬 환경의 조합
 * 함수가 생성될 당시의 외부 변수를 기억
 * 생성 이후에도 계속 접근 가능
 * */

/* 어휘적 환경(Lexical Environment )*/

let one;
one =1;

function addOne(num){  //내부 Lexical 환경에서 5를 받고  one은 내부에 없으니 외부에서 받아옴 // 순서가 내부 -> 없으면 외부에서 받아옴
    console.log(one + num);
}
addOne(5);

//ex
function makeAdder(x){
    return function (y){ //y를 가지고 있고 상위함수인 makeAdder 의 x에 접근 가능
        return x + y;
    }
}
 const add3 = makeAdder(3);
    console.log(add3(2)); //5 //add3함수가 생성된 이후에도 상위함수인 makeAdder 의 x에 접근 가능

 const add10 = makeAdder(10);
 console.log(add10(5)); //15
 console.log(add3(1)); //4

//ex2
function makeCounter(){
    let num = 0; //은닉화

    return function (){
        return num++; //외부함수의 num
    };
}
let counter = makeCounter();

console.log(counter()); //0
console.log(counter()); //1
console.log(counter()); //2
