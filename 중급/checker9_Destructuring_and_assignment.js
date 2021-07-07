/********
 * 구조분해 할당 ( Destructuring assignment )
 * 구조 분해 할당 구문은 배열이나 객체의 속성을 분해해서
 * 그 값을 변수에 담을 수 있게 하는 표현식
 * */

//배열 구조 분해
let [x, y] = [1,2]; //x에 1들어가고 y에 2 들어감
console.log(x); //1
console.log(y); //2

//예제
let users = ['Mike','Tom','Jane'];
let [user1, user2 , user3] = users;
// ∥ 위의 의미가 밑에 코드와 의미가 같음
let user1 = users[0]; //console.log(user1); // 'Mike'
let user1 = users[1]; //console.log(user2); // 'Tom'
let user1 = users[2]; //console.log(user3); // 'Jane'
// ∥ 위의 의미가 밑에 코드와 의미가 같음
// 지난시간에 배운 split 을 이용한 구조분해 할당
let str = "Mike-Tom-Jane";
let [user1, user2, user3] = str.split('-');  // ["Mike","Tom","Jane"]

// 만약 배열 구조분해할당중 해당하는 값이 없다면??
let [a,b,c] = [1,2]; // c에는 undefined 가 들어간다
let [a=3,b=4,c=5] = [1,2]; // 기본값에 세팅해주면 미리 주면 에러를 방지할 수 있다. //[1,2,5]
/**************  ***************** ************* *********** */
//일부 반환값 무시
let [user1, ,user2] =  ["Mike","Tom","Jane","Tony"]; // user1에 Mike ,2번째엔 값이 없어 생략 ,user2에 Jane 이 들어간다  ,Tony도 값을 받을곳이 없어서 생략

//배열구조분해로 바꿔치기
let a = 1;
let b = 2; //a의값과 b의 값을 바꾸려면 c를만들어 해야한다 그걸 쉽게하기위해
[a,b] = [b,a];

//객체도 구조분해가 가능함
let user = {name: 'Mike', age:30};
let {name, age}= user; // = 이 코드와 같음 let name=user.name; let age = user.age; 이건 순서를 신경쓰지않고 {age, name} 이렇게 바꿔 넣어도 됨
console.log(name); // 'Mike'
console.log(age) // 30

//객체 구조분해 : 새로운 변수 이름으로 할당
let {name: userName, age: userAge} = user; //let user = {name: 'Mike', age:30}; 이걸 저런식으로 바꿔준거
/**************  ***************** ************* *********** */
//객체 구조 분해 : 기본값 , 배열과 마찬가지로 객체를 분해할때도
let user = {name: 'Mike', age:30};
let {name, age, gender}= user; // 젠더엔 아무것도 들어가지 않아서 undefined ,
// 이럴때 값을 넣어주면 사용가능
let {name , age , gener = 'maie'} = user;