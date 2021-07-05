//객체 리터럴
/*let user = {
    name : 'Mike',
    age : 30,
}*/

//생성자 함수는 보통 첫글자를 대문자로, 생성자 함수는 붕어빵틀 or 와플펜이라 생각하면됨

// new 함수명(); 을 실행하게 되면
/*function User(name, age){
    // this ={} 생략됨 , 빈객체를 만들고 this를 할당함
    this.name= name;
    this.age=age;
    //return this 생략됨
}*/

let user1 = new User('Mike', 30);
let user2 = new User('Jane', 22);
let user3 = new User('Tom', 17);

// new user1();  // new 를 붙여서 실행하면 위에 알고리즘이 동일하게 동작함 그래서 생성자는 대문자로 구분을 주는게 좋음

function User(name, age ){
    this.name = name;
    this.age = age;
    this.sayName = function (){
        console.log(this.name);
    }
}
let user5 = new User('Han', 40);
user5.sayName(); // 'Han'
/* ----------------   */
function Item(title, price) {
    this.title = title;
    this.price = price;
    this.showPrice = function (){
        console.log(`가격은 ${price}원 입니다. `);
    }
}
// 생성자 함수는 잊지말고  new 를 붙여줘야한다 안붙이면 그냥 함수가 실행되는거,
// const item2 = Item('가방', 4000); 이 함수는 아무것도 리턴해주는게 없기때문에 undefind가 뜸
const item1 = new Item('인형', 3000);
const item2 = new Item('가방', 4000);
const item3 = new Item('지갑', 5000);

console.log(item1,item2,item3);

item3.showPrice(); //  '가격은 5000원 입니다.'