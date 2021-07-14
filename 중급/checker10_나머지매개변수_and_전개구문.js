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
 *********** */

function showName(name) {
    console.log(arguments.length);
    console.log(arguments[0]);  //Mike
    console.log(arguments[1]);  //Tom
}
showName('Mike','Tom');

/*** 나머지 매개변수 ( Rest parameters)
 * 정해지지않은 갯수의 인수를 배열로 해주는거  */
function showName(...names){
    console.log(names);
}

showName(); //[]
showName('Mike'); // ['Mike']
showName('Mike','Tom');   // ['Mike','Tom']


//예제 : 나머지 매개변수, 전달받은 모든 수를 더해함
add(1,2,3);
add(1,2,3,4,5,6,7,8,9,10);

function add(...nunbers){
    let result = 0;
    numbers.forEach((num) => (result += num));
    console.log(result);
}
// reduce로  모든 수 더하기
function add(...numbers){
    let result = numbers.reduce((prev, cur) => prev + cur);
    console.log(result);
}

/*** 나머지 매개변수
 * user 객체를 만들어 주는 생성자 함수를 만들기 */
//나머지매개변수(...)는 항상 마지막에 쓰기
function  User(name, age, ...skills){
    this.name=name;
    this.age = age;
    this.skills = skills;
}
const user1 = new User('Mike', 30, 'html','css');
const user2 = new User('Tom', 20, 'JS','React'); // User{nmae:"Tom" ,age:20,skills: Array(2)}   // skills: ["JS","React"] 나머지 매개변수는 이런식으로 들어가게된다.
const user3 = new User('Jane', 10, 'English');

console.log(user1);
console.log(user2);
console.log(user3);

/*** 전개구문(Spread syntax) : 배열 */
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let result = [...arr1, ...arr2];
console.log(result); // [1,2,3,4,5,6]

let result = [0,...arr1, ...arr2,7,8,9];
console.log(result); //[0,1,2,3,4,5,6,7,8,9,10]

/*** 전개구문(Spread syntax) : 객체 */
let user = {name:'Mike'}
let mike = {...user, age:30}

console.log(mike) // {name: "Mike", age:30}

/*** 전개구문(Spread syntax) : 복제 //복제도 간단하게 Object.assign() 을 안써도 된다 */
let arr =[1,2,3];
let arr2 = [...arr]; //[1,2,3]

let user = {name:'Mike', age:30};
let user2 = {...user};  //user2에 Tom으로 바꾸어도 user엔 아무런 영향이 미치지않는다.

user2.name ="Tom";

console.log(user.name);     //"Mike"
console.log(user2.name);    //"Tom"

/*** 전개 구문
 * arr1 을 [4,5,6,1,2,3]으로  */
let arr1 = [1,2,3];
let arr2 = [4,5,6];

arr2.forEach(num => {
    arr1.unshift(num) // 앞에다 456넣어야되니 unshift 결과 :[6,5,4,1,2,3]  // 틀린이유  4부터 123 제일 앞에 들어가다보니 마지막 6이 제일앞에 들어가게 됨
})
//해결방법
arr2.reverse().forEach(num => { // reverse로 역순을 한번 만들어줌
    arr1.unshift(num) // 앞에다 456넣어야되니 unshift 결과 :[4,5,6,1,2,3]
})

//더 편하게 하는 방법
arr1 =[...arr2, ...arr1]; // [4,5,6,1,2,3]


// user에 다 집어넣기
let user ={name : "Mike"};
let info ={age: 30};
let fe = ["JS", "React"];
let lang = ["Korean", "English"];

//1번방법
user = Object.assign({},user,info, {
   skills:[],
});
fe.forEach(item => {
    user.skills.push(item);
});
lang.forEach(item => {
    user.skills.push(item);
}); // {name : "Mike", age:30 , skills: Array(4)} // skills [ 0: "JS" 1: "Reackt" ...]

//2번방법 전개구문방법
user = {
    ...user,
    ...info,
    skills:[...fe,...lang],
};