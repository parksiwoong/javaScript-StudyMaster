// ' ," ,`  문자열을 찍을때 크게 상관은 없지만 `(desc) 이건 for 안에 ${} 이렇게 뭐가들어갈지 모를때 사용할때 좋다
//하지만 표현을 하고싶은 " ' 이런것들이 있을때 그것의 반대껄로 감싸줘야한다
let html = '<div class = "box_title"> 제목 영역</div>' // html같은경우는 '' 로 감싸는게 편하다 "" 를 자주 사용하기 때문
let desc = "It's 3 o'clock." // 반면 영어로된 문장은 ""로 감싸주는게 좋다
//dese는 $를 이용해 변수를 표현하거나 표현식을 쓸 수 있다
let name ='Mike';
let result = `My name is ${name}.` //My name is Mike.
let add = `2 더하기 3은 ${2+3} 입니다.` // 2더하기 3은 5입니다.

//dese
//여러줄'
let desc = '오늘은 맑고 화창한' +
    '날씨가 계속 되겠습니다';

let desc = '오늘은 맑고 화창한\n 날씨가 되겠습니다.';
let desc = '오늘은 맑고 화창한              /*error! 한줄로 표기해야함 이런식으로 줄바꿈하면 에러남*/'
          //  날씨';

// length: 문자길이
let desc ='안녕하세요';
desc.length //6

// 또 하나 문자와 대괄호로 특정 위치에 접근가능
//         0,1,2,3,4,5
let desc ='안녕하세요';
desc[2] //하

// toUpperCase()/toLowerCase() 대소문자로 다 바꿔주는거
let desc = "Hi guys. Nuce to Meet yuer.";
desc.toUpperCase(); // "HI GUYS. NUCE TO MEET YOU"
desc.toLowerCase(); // "hi guys. nice to meet you."

// str.indexOf(text) 문자를 받아 몇번째인지 알려주는거, 호환된 문자가 여러개라도 첫번째 문자만 반환해줌
let desc = "Hi guys. Nuce to Meet yuer.";
desc.indexOf('to'); // 14 만약 찾는게 없다면 -1로 반환해줌

if(desc.indexOf('Hi')){  //if(desc.indexOf('Hi')) > -1 {   ㅇ렇게 -1을 붙여줘야 찾음
    // 이렇게 쓰면 저 메세지를 볼 수 없음 hi로 시작하는게 아니라 indexOf는 0으로 시작 하기때문
    console.log('Hi가 포함된 문장입니다..');
}

// str.slice(n, m) 특정 문자열만 뽑아내는거 // n(시작접) 부터 m(문자열끝까지))까지 양수면 그 숫자까지 (포함x) 음수면 끝부터 셈
let desc ="abcdefg";

desc.slice(2) // "cdefg" 2부터시작해서 끝문자까지 반환
desc.slice(0,5)     //"abcde"  인덱스 0부터 5앞전까지, (4)까지 반환
desc.slice(2,-2) // "cde" 인덱스 2에서 끝에서 2번째까지 반환

//str.substring(n,m) // n과 m사이 문자열 반환 , n과 m을 바꿔도 동작함 , 음수는 0으로 인식
desc.substring(2,5) //"cde"
desc.substring(5,2) //"cde"

//str.substr(n,m) //n이 시작 m개만큼의 갯수를 가져옴
desc.substr(2,4) // "cdef"
desc.substr(-4,2) // "de" 뒤에서 -4까지가면 d 부터

//str.trim(): 앞 뒤 공백 제거
let desc ="  coding   ";    // "coding"

//str.repeat(n) : n번 반복

let hello = "hello!";
hello.repeat(3); //hello!hello!hello! 3번반복

// 응용하여 숫자 제외하고 나머지를 넣는 로직 짜는거
let list = [
    "01. 들어가며",
    "02. js의 역사",
    "03. 자료형",
    "04. 함수",
    "05. 배열",
    ];

// 이렇게 숫자 제외하고 사용도 가능
let newList = [];
for(let i=0;i<list.length;i++){
    newList.push();
        list[i].slice(4);
}
console.log(newList); // ["들어가며","js의 역사","자료형","함수","배열"]

//로직2 , 금칙어 : 콜라
function  hasCola(str){
    if(str.indexOf('콜라')){
        console.log('금칙어가 있습니다.')
    }else {
        console.log('통과')
    }
}
hasCola('와 사이다가 짱이야') //-1 //금칙어가 있습니다..
hasCola('콜라') // 0 // 통과 // if 0은 false이기 떄문에 else로 넘어감
//잘 동작하게 만드려면   if(str.indexOf('콜라') > -1 ){ 이렇게 -1보다 큰지 체크를 해줘야함

//includes 활용법
function  hasCola(str){
    if(str.includes('콜라')){  //includes로 콜라가 있는지만 확인하면됨
        console.log('금칙어가 있습니다.')
    }else {
        console.log('통과')
    }
}