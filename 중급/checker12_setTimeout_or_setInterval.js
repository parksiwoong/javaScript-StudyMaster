/***
 * setTimeout / setInterval
 * 일정시간이 지난 후 함수를 실행 / 일정 시간 간격으로 함수를 반복
 * */

/* setTimeout */
function fn(){
    console.log(3)
}
setTimeout(fn, 3000); //3초후에 로그를 찍어주는거 첫번째 fn자리는 일정시간 후에 실행되는 함수 이고 , 두번째는 시간 3000 = 3s

setTimeout(function (){  // 이렇게 써도 됨
    console.log(3)
}, 3000);

/* clearTimeout: 예정된 작업을 없애는거 */
const tId= function showName(name){
    console.log(name);
}
setTimeout(showName, 3000, 'Mike'); // (함수, 시간 , 인수)
clearTimeout(tId);


/* setInterval 셋타임아웃과 사용법은 동일함, 한번실행하고 끝나는것과 달리 계속 반복수행함 */
function showName(name){
    console.log(name);
}

const tId = setInterval(showName, 3000, 'Mike'); // (함수, 시간 , 인수)

// ex 유저가 얼마나 접속했는지 보여주는거
let num =0;

function showTime(){
    console.log(`안녕하세요. 접속하신지 $(num++)초가 지났습니다.`);
}
setInterval(showTime, 1000); // 안녕하세요.. 1초가 지났습니다.


// 유저 접속시간을 멈추고 싶을때
function showTime(){
    console.log(`안녕하세요. 접속하신지 $(num++)초가 지났습니다.`);
    if(num > 5){
        clearTimeout(tId);
    }
}
const tId = setInterval(showTime, 1000); // 5초가 지나면 멈춘다.
