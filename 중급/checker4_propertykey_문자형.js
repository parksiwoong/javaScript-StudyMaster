//property key : 문자형 (심볼형)

const obj = {
    1: '1입니다,',
    false : '거짓'
}
Object.keys(Obj); // ["1", "false"]
obj['1'] // "1입니다."
obj['false'] // "거짓"

/* Symbol // 유일한 식별자, 유일성 보장 */
const a = Symbol(); // new를 붙이지 않습니다!

console.log(a) // a===b; //false , a==b; //false

/* property key : 문자형 (심볼형) */
const id = Symbol('id') // 'id' 로 설명을 붙여줄 수 있음
const user= {
    name : 'Mike',
    age  : 30,
    [id] : 'myid'
}
console.log(user); // {name: "Mike",age:30, Symbol(id):"myid"}
user[id]; // "myid"
Object.keys(user); // ["name", "age"]  keys, valuses, entries 등 Computed property 들은 심볼형은 건너뛰고 보여줌
Object.values(user); // ["Mike",30]
Object.entries(user); // [Array(2), Array(2)]
for(let a in user){} // 이것도 심볼 건너뜀

//특정위치에 원본을 건드리지 않고 속성도 추가 가능

const user1 = {
    name : 'Mike',
    age : 30
}
const id1 = Symbol('id');
user1[id] = 'myid' ;
user1.name = 'myname'; // x 이건 덮어쓰는건 안되겠쥬?

/*
* Symbol.for() : 전역심볼
* 하나의 심볼만 보장받을 수 있음 , 코드어디에서든 사용가능
* 없으면 만들고, 있으면 가져오기 때문
* Symbol 함수는 매번 다른 symbol 값을 생성하지만,
* Symbol.for 메소드는 하나를 생선한 뒤 키를 통해 같은 Symbol을 공유
* */

// id1 === id2; <- true
const id = Symbol.for('id');
const id2 = Symbol.for('id');
//이름을 얻고싶다면
Symbol.keyFor(id1) // 생성할때 별명을 'id' 적어준걸 알려줌

//하지만 전역심볼이 아닌 심볼은 이름을 알 수 없다 대신 description 으로 알 수 있다.
const id = Symbol('id 입니다.');
id.description; // "id 입니다."

// 심볼들만 보는거
Object.getOwnPropertySymbols(user); // [Symbol(id)]
// 심볼형키를 포함한 객체 모든키를 보여줌 , 하지만 내장함수들은 이런 메소드들을 사용하지 않는다 (..?)
reflect.ownKeys(user);  // ["name" , "age" , Symbol(id)]

/* 심볼 사용 예시 */
// 다른 개발자가 만들어 놓은 객체
const user = {
    name : "Mike",
    age  : 30,
}


//내가 작업
//user.showName = function (){}; // 이런걸 만약 추가하게 되면 사용자가 접속했을때 말도안되는 메세지를 보게됨 // His showName is function(){}.
const showName = Symbol('show name'); // 그래서 심볼로 만들면 이건 걸리지 않고 His name is Mike. His age is 30. 만 찍히게 된다
user[showName] = function (){
    console.log(this.name);
}
user[showName](); // Mike  따로 출력 가능하다 , 심볼을 쓰면 내가 만든 메서드도 잘 동작하고 다른개발자가 만들어놓은 코드도 영향을 미치지않는선에서 메서드 추가 가능

//사용자가 접속하면 보는 메세지
for (let key in user){
    console.log(`His ${key} is ${user[key]}`);
}
