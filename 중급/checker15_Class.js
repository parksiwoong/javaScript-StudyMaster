/*** Class
 * 지금까지 비슷한 객체를 생성하기 위해서 생성자를 썼지만
 * class 는 ES6 에 추가된 스펙
 * */

//생성자 만들때 썼던 메서드
const User = function (name, age){
    this.name = name ;
    this. age = age ;
    this.showName = function (){
        console.log(this.name);
    };
};
// 뉴를 빼고 실행하면 생성자는 user메서드에 return이 없기때문에 undefined 가 나옴
const mike = new User("Mike", 30);

// class 로 만들때
/*
Class User2{
    constructor(name , age){
        this.name = name;
        this.age = age ;
    }
    showName(){
        console.log(this.name);
    }
}
*/
//클래스는 new 없이 실행 불가능함
const tom = new User2("Tom", 19);

for (const p in mike){ // for in 문은 예전 시간에 프로토 타입을 포함된 프로퍼티를 다 보여주고 객체가 가지고 있는 프로퍼티만 감별하기위해서 해즈온 프로퍼티를 사용해야 했음 , 클래스의 메서드는 포인문에서 제외됨
    console.log(p);
}

/***************************************/
//클래스에서의 상속은 extends 를 사용
// extends
class Car {
    constructor(color){
        this.color = color;
        this.wheels = 4;
    }
    drive(){
        console.log("drive..");
    }
    stop() {
        console.log("STOP!");
    }
}
    class Bmw extends Car{
        park(){
            console.log("PARK");
        }
    }
const z4 = new Bmw("blue");


/***************************************/
// 메소드 오버라이딩(method overriding)
class Car {
    constructor(color) {
        this.color = color;
        this.wheels = 4;
    }
    drive() {
        console.log("drive..");
    }
    stop() {
        console.log("STOP!");
    }
}

class Bmw extends Car{
    park(){
        console.log("PARK");
    }
    stop(){ //동일한 메소드의 이름으로 정의하게되면 덮어쓰게 됨
        super.stop(); // 만약 분모의 메소드를 그대로 쓰면서 확장하고싶다면 super 를 쓰면됨
        console.log("OFF");
    }
}
const z4 = new Bmw("blue");

/***************************************/
//constructor // 생성자 오버라이딩
class Car {
    constructor(color) { // 클래스의 콘스트럭트는 {} 빈객체를 만들어주고 this로 이 객체를 가르키게 됨, 반면 extends를 써서 만든 자식 클래스는 빈객체가 만들어지고  this를 할당하는 작업을 건너뜀
        this.color = color;
        this.wheels = 4;
    }
    drive() {
        console.log("drive..");
    }
    stop() {
        console.log("STOP!");
    }
}

class Bmw extends Car{
    constructor(color) {
        super(color); // super 를 이용해 부모객체들을 호출 해주고 디스.프로퍼티로 할당 해주어야함 
        this.navigation = 1; //constructor를 쓰려면 this가 아닌 부모생성자(super)를 반드시 먼저 생성해야함
    }
    park() {
        console.log("PARK");
    }
}
const z4 = new Bmw("blue");
