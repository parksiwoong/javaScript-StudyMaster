/***
 *Generator
 * 함수의 실행을 중간에 멈췄다가 재개할 수 있는 독특한 기능
 * 제너레이터는 값을 미리 만들어 두지 않음
 * 메모리 관리측면에서 효율적 (필요한 순간에만 연산해서 값을 주기 때문에)
 *  외부로 부터 값을 입력받을 수 도 있음.
 * Generator는 next(), return(), throw(); 가지고있음
 *제너레이터는 다른작업을 하다가 다시 돌아와서 next()해주면 진행이 멈췄던 부분부터 이어서 실행

     * iterable
     *  - Symbol.iterator 메서드가 있다.
     *  - Symbol.iterator 는 iterator를 반환 해야한다.
     * iterator
     *  - next 메서드를 가진다.
     *  - next 메서드는 value와 done 속성을 가진 객체를 반환한다.
     *  - 작업이 끝나면 done은 true가 된다.
 * */

function* fn() { //제너레이터는 펑션 옆에 *을 사용해서 만들고 내부에  yield 키워드를 사용함 , yield 에서 함수를 멈출 수 도 있음
    console.log(1);
    yield 1; //값을 생략하면 undefined반환
    console.log(2);
    yield 2;
    console.log(3);
    console.log(4);
    yield 3;
    return "finish";
}
const a = fn(); // Generator 객체 반환 실행
a.next(); // 1 //{value: 1, done: true} //가장가까운 일드문을 만날때까지 실행되고 데이터 객체를 반환됨
a.next(); // 2 //{value: 2, done: true} //가장가까운 일드문을 만날때까지 실행되고 데이터 객체를 반환됨
a.next(); // 3 4 //가장가까운 일드문을 만날때까지 실행되고 데이터 객체를 반환됨
a.next(); // finish // {value: finish, done: true}//가장가까운 일드문을 만날때까지 실행되고 데이터 객체를 반환됨
a.next(); //undefined 값이 더이상 없어서 {value: undefined, done: true}

a.return('END'); // {value: "END", done:true} // 그 즉시 done 속성값이 true가 됨 , 이후에 next를 실행해도 value를 얻을 수 없고 done은  true

/* 예외처리를 위해 try catch로 감싸서 해봄 */

function* fn() { //제너레이터는 펑션 옆에 *을 사용해서 만들고 내부에  yield 키워드를 사용함 , yield 에서 함수를 멈출 수 도 있음
    try {
        console.log(1);
        yield 1; //값을 생략하면 undefined반환
        console.log(2);
        yield 2;
        console.log(3);
        console.log(4);
        yield 3;
        return "finish";
    }catch (e){
        console.log(e);
    }
}
const a = fn();

/* iterator */
const arr = [1,2,3,4,5];
const it = arr[Symbol.iterator](); //undefined
it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}
it.next(); // {value: 4, done: false}
it.next(); // {value: 5, done: false}
it.next(); // {value: undefined, done: true} //즉 배열은 반복 가능한 객체

/* iterable */
const arr = [1,2,3,4,5];
for(let num of arr){
    console.log(num)
};
//1
//2
//3
//4
//5
//undefined

a[Symbol.iterator]() === a; //true // a는 심볼.이터레이터를 사용한 값이 즉 자기자신이라는거


/********* **/
//next() 에 인수 전달

function* fn(){
    const num1 = yield "첫번째 숫자를 입력해 주세요";
    console.log(num1);

    const num2 = yield "두번째 숫자를 입력해주세요";
    console.log(num2);

    return num1 + num2;
}

const a = fn();

a.next(); // 를 하게 되면 num1 에서 멈춘다 .// {value: "첫번째 숫자를 입력해주세요", done: false}
a.next(2); // 를 하게 되면 방금 넣어준 숫자 2는 num1 에 저장이 됨 // {value: "두번째 숫자를 입력해주세요", done: false}
a.next(4); // {value: 6, done: true} 이렇게 제너레이터는 외부로 부터 값을 입력받을 수 도 있음.


/* while 문 */
//  while문으로 무한반복해도 브라우저가 뻗지 않음
function* fn(){
    let index = 0;
    while(true){
        yield index++;
    }
}
 const a = fn();


/* yield 로 다른 Generator를 불러올 수 있음 */
function* gen1(){
    yield "W";
    yield "O";
    yield "R";
    yield "L";
    yield "D";
}

function* gen2(){
    yield "Hello,";
    yield* gen1();
    yield "!";
}
console.log(...gen2()); // hello, W O R L D !