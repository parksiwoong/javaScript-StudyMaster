

//변수

// var는 한번 선언된 변수를 다시 선언할 수 있다.
// var 는 선언하기 전에 사용할 수 있다.
// 최상위로 끓어올려줄 수 있기때문 (호이스팅)
// 할당은 되지않지만 호이스팅(변수명선언만)이 되기때문

// let 도 호이스팅은 되지만 TDZ(Temporal Dead Zone) 영역에선 사용 할 수 없다.
// TDZ 영역에 있는건 사용 할 수 없음

let name = 'Mike';           // Temporal Dead Zone 영역
console.log(name); //Mike   // 함수 선언 및 할당
//let name = 'Jane' // erorr!
console.log(name);          // 사용 가능


/*let age = 30;
function showAge(){     // Temporal Dead Zone 영역
    console.log(age);   // Temporal Dead Zone 영역

    let age = 20;       // Temporal Dead Zone 영역
}
showAge();*/

// 변수의 생성 과정
// 1. 선언단계
// 2. 초기화 단계
// 3. 할당 단계


// var 1. 선언 및 초기화 단계 //초기화: undefined 를 할당해주는 단계
//     2. 할당 단계

// let 1. 선언 단계
//     2. 초기화 단계
//     3. 할당 단계

// const 1. 선언 + 초기화 + 할당

//var : 함수 스코프 (function-scoped)
//let, const : 블록스코프(block-scoped)

// 코드블럭에서 선언된 변수는 코드블럭에서만 유효하며 외부에서는 사용 불가능 , 지역변수
function add(){
    //Block-level scoped
}
if(f){
    //Block-level scoped
     }
for (let i=0; i<10; i++){
    //Block-level scoped
    }

// 중괄호 내부에서만 사용가능한것이 블록스코프 , var 도 함수 내에서 선언이 되면 함수 밖에서 사용하지못함
// 유일하게 벗어날 수 없는 스코프가 함수라고 보면 됨

