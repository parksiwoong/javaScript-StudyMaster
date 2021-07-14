/***
 * call, apply, bind :
 *  함수 호출 방식과 관계없이 this 를 지정할 수 있음음
 *
 *  */



/* call
 call 메서드는 모든 함수에서 사용할 수 있으며, this를 특정값으로 짖어할 수 있음 */
const mike = {
    name: "Mike",
};

const tom = {
    name: "Tom",
};

function showThisName(){
    console.log(this.name); // 여기서 디스는 윈도우를 가르킴
}

showThisName.call(mike); // Mike   this.name으로 주어진 객체 메서드인거처럼 사용 가능
showThisName.call(tom);     //Tom

function update(birthYear, occupation){
    this.birthYear = birthYear;
    this.occupation = occupation;
};

update.call(mike, 1999, 'singer')
consol.log(mike); // {name: "Mike" , birthYear: 1999, occupation: "singer"}

/*apply : 매개변수를 처리하는 방법을 제외하면  call과 완전히 같음,
          call은 일반적인 함수와 마찬가지로 매개변수를 직접 받지만, apply는 매개변수를 배열로 받음 */
 //apply는 배열요소를 함수매개변수로 사용할때 유용함
update.apply(mike, [1999, 'singer']);
consol.log(mike); // {name: "Mike" , birthYear: 1999, occupation: "singer"}

const nums = [3,10,1,6,4];
//const minNum = Math.min(...nums); //1
//const maxNum = Math.max(...nums); //10

const minNum = Math.min.apply(null, nums); // nums(2번째매개변수) 로 배열을 전달하면 그 요소를 차례대로 인수로 사용함 null(1번째매개변수) 에는 딱히 this가 필요하지 않아서 아무거나 넣은거
// = Math.min.apply(null, [3,10,1,6,4])  // 어플라이는 어레이로 받는다.
const minNum = Math.min.call(null, ...nums); // 콜은 차례대로 매개변수가 들어가야하니 스프래드(...) 연산자를 사용했음
// = Math.min.apply(null,3,10,1,6,4)

/* bind : 함수의 this값을 영구히 바꿀 수 있다.*/
const mike = {
    name: "Mike",
}

function update(birthYear, occupation){
    this.birthYear = birthYear;
    this.occupation = occupation;
}

const updateMike = update.bind(mike); // 항상 mike 를 this로 받는다.
updateMike(1980, "police");
console.log(mike); // {name: "Mike", birthYear: 1980 , occupation: "police}


// 실제 사용 예제
const user = {
    name: "Mike",
    showName: function (){
        console.log(`hello, ${this.name}`);
    },
}
user.showName(); //hello, Mike

user.showName(); // user는 this
let fn = user.showName;
fn(); // hello,  // fn 만 호출해서 this가 없는거라 hello만 출력됨

fn.call(user); //call 을 사용하고 this로 사용할값 user를 넣어주면 hello, Mike 값이 잘나옴
fn.apply(user); //똑같이 잘 나옴

let boundFn = fn.bind(user);
boundFn(); // hello, Mike