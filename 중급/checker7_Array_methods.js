// Array
// 기초부분에서 배운거
//push(): 뒤에 삽입   //pop(): 뒤에 삭제   //unshift(): 앞에 삽입   //shift(): 앞에 삭제

// arr.splice(n,m) : 특정 요소 지움 n(시작) 부터 (m)개수를 지우는거
let arr = [1,2,3,4,5];
arr.splice(1,2); //1부터 두개 지우기
console.log(arr); //[1,4,5]

// arr.splice(m,m,x) : 특정 요소 지우고 추가
let arr = [1,2,3,4,5];
arr.splice(1,3,100,200);
console.log(arr); //[1,100,200,5] //1부터 3개지우고 그 사이에 x에 들어있는 값을 넣어주는거

arr.splice(1, 0, 300,"굿") // 중간에 0을 넣게 되면 아무것도 지우지 않고 추가하는거 가능
console.log(arr); //[1,300,굿,100,200,5]

// arr.splice() : 삭제된 요소 반환
let arr = [1,2,3,4,5];
let result = arr.splice(1,2); // 삭제한것을 다시 반환받을 수 있음
console.log(arr);  //[1,4,5]
console.log(result); //[2,3]

// arr.slice(n,m) : slice는 splice와 비슷하게 생겼지만 n부터 m까지 반환
let arr=[1,2,3,4,5];
arr.slice(1,4); // [2,3,4] m은 포함하지않고 바로앞자리 인덱스까지 의미
arr.slice();    //괄호안에 아무것도 안넣으면 배열이 복사됨

/* arr.concat(arr2,arr3 ..): 합쳐서 새배열 반환 */
let arr = [1,2];
arr.concat([3,4]); //[1,2,3,4]
arr.concat([4,5],5,6); // [1,2,3,4,5,6]

// arr.forEach(fn) : 배열의 반복, 함수를 인수로 받음
let users =['Mike', 'Tom','Jane'];
users.forEach((item,index,arr) => {  //첫번째(item)는 해당요소 , 두번째(index) ,3번째 (해당배열)을 의미함
});
// forEach 사용 예시
arr.forEach((namem, index)=>{
    console(`${index+1}.${name}`); //1. Mike 2. Tom 3. jane
});

// arr.indexOf /arr.lastIndexOf  문자열의 indexOf와 사용법이 같음
let arr =[1,2,3,4,5,6,1,2,3];
arr.indexOf(3); // 발견하면 해당요소의 인덱스를 반환하고 없으면 -1를 반환 //2
arr.indexOf(3,3) // 7 // 인수가 두개인 경우 두번째인수는 시작위치를 의미함 //
arr.lastIndexOf(3); //7 //끝에서부터 탐색하고싶다면 lastIndexOf 사용

// arr.includes(): 포함하는지 확인 //인덱스를 확인할 필요 없고 포함하는지만 알고 싶다면 includes 사용
let arr = [1,2,3];
arr.includes(2); //true
arr.includes(8); //false

/* arr.find(fn)/ arr.findIndex(fn) : 인덱스처럼 찾는다는 의미는 동일하지만 보다 복잡한 연산이 가능하도록 함수(fm)를 연결할 수 있음  */
//짝수를 찾는다던지 성인을 찾아낸다던지 할 수 있음
// *주의할점* 첫번째 true값만 반환하고 끝 만약 없으면 undefined 를 반환

// find 짝수 구하는 예제
let arr = [1,2,3,4,5];
const result = arr.find((intem)=>{
    return item % 2 ===0;
});
console.log(result); // 2 // index가 2개

// 미성년자 찾는 예제
let userList = [ //이렇게 객체가 들어가있는 배열에는 indexOf로는 찾기 힘드니 find로 찾아봄
    { name : "Mike", age:30},
    { name : "jane", age: 27},
    { name : "Tom", age: 10}
];

userList.find((user)=>{
    if(user.age<19){
        return true;
    }
    return false;
});
console.log(result); // {name:"Tom" , age :10}

userList.findIndex((user)=>{ //findIndex는 조건에 맞는 인덱스를 찾아냄 , 첫번째 걸리는값만 반환함
    if(user.age<19){
        return true;
    }
    return false;
});
console.log(result); //2 (0 index Mike ,1 index jane, 2 index name Tom <-정답 2번째 인덱스

/* arr.filter(fn) : 만족하는 모든 요소를 배열로 반환 (findIndex처럼 하나만 반환하는거와 반대로 맞는것들 다 반환) */

/* arr.reverse() : 역순으로 재정렬 */
//최근 가입된 순대로 보여준다거나 , 최신게시판 순대로 보여주고싶을때 자주사용됨
let arr =[1,2,3,4,5];
arr.reverse(); //[5,4,3,2,1]

/* arr.map(fn) : 함수를 받아 특정 기능을 시행하고 새로운 배열을 반환 */
//예제: 나이로 확인하기 귀찮아서 맵을 이용해 새로운 배열을 만들어줄 거
let userList = [
    { name : "Mike", age:30},
    { name : "jane", age: 27},
    { name : "Tom", age: 10}
];

let newUserList = userList.map((user, index)=>{
    return Object.assign({}, user , {
        id: index +1,
        isAdult: user.age > 19,
    });
});
console.log(newUserList); // 0: {name : "Mike", age:30,id: 1, isAdult: true}, {name : "jane", age:27,id: 2, isAdult: true}, {name : "Mike", age:10,id: 3, isAdult: false},

//join, split

let arr = ["안녕","나는","철수야"];
let result = arr.join();    // 아무것도 전달하지 않으면 안녕,나는,철수야 식으로 쉼표로 구분되어 나오게됨
let result = arr.join("-"); // 안녕-나는-철수야
console.log(result);
let result = arr.split(","); // 배열로 나눠주는거 ["Mike", "Jane","Tom", "Tony"]
let result = arr.split();   // 빈문자로 넣게되면 ["안","녕","나","는","철","수","야"]각글짜마다 구분하여 배열로 만들어줌

// Array.isArray() 객체와 배열을 구분하기위해 쓰는거
let user ={
    naem: "Mike",
    age: 30,
};
let userList =["Mike","Tom","jane"];

console.log(Array.isArray(user));       //false 객체라서 false 가 나옴
console.log(Array.isArray(userList));   //true // 배열이 맞아서 true