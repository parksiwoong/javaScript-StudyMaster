//Computed property

/*
let a = 'age';

let user = {
    name : 'Mike',
    age : 30,  // age 대신 [a]로 사용가능  이렇게 대괄호로 묶어주면 a라는 함수가 아니라 변수 a에 할당된값 'age' 값이 들어감
}*/

// 이렇게 변수 식자체를 넣는것도 가능함
const user = {
    [1+4] : 5,
    ["안녕"+ "하세요"] : "hello"
}
/*
Object.assign()         //객체 복제
Object.Keys()           //값 배열반환
Object.values()
Object.entries()        //키/값 배열 반환
Object.fromEntries()    // 객체로 만들어주는거
*/

/*  // Object.assign() : 객체 복제 */
    const user = {
    name : 'Mike',
    age : 30
    };

const cloneUser = user; // X , 유저변수에는 객체 자체가 들어가있는게 아니라 객체가
                        // 저장되어있는 메모리주소인 객체에 대한 참조값이 저장되어있는거
                    //하나의 객체를 두 변수가 접근하고있기때문에 , 동일하게 복제하려면 assign 을 써야함

/* Object.assign() : 객체 복제 */
const newUser = Object.assign({},user); // {} 초기값  두번쨰 매개변수가 {}랑 병합됨, 다른 메모리할당됨

Object.assign({gender:'male'}, user ); // 이렇게 하면 총 3개의 propert를 가지는거 , 만약 병합을 하는데 키값이 같으면 덮어쓰게 됨
// gender:'male' , name : 'Mike' , age"30,

/*   Object.values() : 값 배열반환 */
Object.values(user);

/* Object.entries(): 키/값 배열 반환 */
// 키와 값을 모두 반환하고싶다면
Object.entries(user); // [ "name", "Mike"] , ["age",30], ["gender" , "male"]

/* Object.fromEntries() : entries 와는 반대로 키/값 배열을 객체로 반환 하는거 */
const arr = [
    ["name", "Mike"],
    ["age", 30],
    ["gender", "male"]
]
// 객체로 만들어주는거
Object.fromEntries(arr);
// {name : 'Mike' , age : 30 , gender: 'male',}


// 예제 1

let n = "name";
let a = "age";

const  user = {     // 5:5, name:"Mike", age:30}
    [n] : 'Mike' ,  // 대괄호를 묶어줘서  name 이 들어가는거
    [a] : 30,       // 대괄호를 묶어줘서  aeg 이 들어가는거
    [1 + 4] : 5,    // 계산식도 가능
}
console.log(user);

// 예제 2
function makeObj(key, val){
    return{
        [key] : val
    }
}
const obj = makeObj("나이", 33);  // 어떤게 키값이 될지 모를때 유용함
console.log(obj);

/*************** 총 정리 *************/
const user = {
    name: "Mike",
    age: 30,
}
const user2 = user;  // 둘 다 "Mike" 가 나옴 // new  를 안적어서 하나의 객체를 보고있음
//그래서 복사를 할때는 assign 해야함
const user3 = Object.assign({}, user); //초기값에 유저가 들어가는거
console.log(user3);

const result = Object.keys(user); // ["name", "age"] 키값만 가져오는거
const result1 = Object.values(user); // ["Mike",30] 벨루값만 가져오는거
const result2 = Object.entries(user); // [Array(2), Araay(2)] 키값과 벨루값 둘 다
                                      // ["name","Mike"] , ["age",30]

let arr = [                            //
    ['mon','월'],
    ['tue','화']
]
const result = Object.fromEntries(arr) // {mon: "월", tue: "화"} 배열을 객체로 만드는방법
console.log(result);