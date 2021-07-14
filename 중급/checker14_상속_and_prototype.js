/***
 * 상속과 prototype
 * 객체.prototype = function () {...} 등 이런식으로 배열안에 추가를 할 수 있다.
   * */

// 바퀴수랑 컬러는 동일할때 어떻게 처리하면 좋을지
const bmw= { //색상 ,바퀴수 ,네비 ,드라이브라는 메서드
    color : "red",
    wheels: 4,
    navigation: 1,
    drive(){
        console.log("drive..");
    },
};
const benz = {
    color : "black",
    wheels: 4,
    drive(){
        console.log("drive..");
    },
};
const audi = {
    color : "blue",
    wheels: 4,
    drive(){
        console.log("drive..");
    },
};

// 위에 차들에 공통점이 겹치는게 많다.
// 이럴때 __proto__ 로 해결 가능
const car = {
    wheels: 4,
    driv(){
        console.log("drive..");
    }
};
const bmw = { color : "red", navigation: 1,};
const audi = { color : "blue",};
const benz = { color : "black",};

bmw.__proto__ = car;  //bmw는 car에 상속을 받을 수 있음
benz.__proto__ = car;
audi.__proto__ = car;

//계속 상속 가능
const x5 = {
    color:"white",
    name : "x5",
};
x5.__proto__ = bmw;  // x5 는 bmw 상속받고 , bmw 는 car를 상속 받아올수있음 , 찾는값이 없을땐 상속에서 찾아옴


//하지만 __proto__ 로 사용하면 너무 귀찮아서 생성자함수는 간편하게 쓰려고 쓰는거기에 다른방법으로 사용해본다

const car1 = {
    wheels: 4,
    drive(){
        console.log("drive..");
    }
};

const Bmw = function (color) {
    this.color = color;
};

Bmw.prototype.wheels =4;
Bmw.prototype.drive= function (){
    console.log("drive..");
};
Bmw.prototype.navigation = 1;
Bmw.prototype.stop = function (){
    console.log("STOP~");
};

const x5 = new Bmw("red"); // prototype 으로 하면 중복을 줄일 수 있음
const z4 = new Bmw("blue");

x5.stop(); // STOP~
x5.wheels(); // 4
x5.drive(); // drive..
//bmw.__proto__ = car;  //bmw는 car에 상속을 받을 수 있음
//benz.__proto__ = car;

/* instanceof : 생성자함수가 새로운 객체를 만들어 낼때 그 객체는 생성자의 인스턴스라고 불리어 진다.
 instanceof로 객체와 생성자를 비교할 수 있고 해당 객체가 그 생성자로 부터 생성된것인지 판단해서 true 혹은 false 로 반환해줌 */

//z4 instanceof Bmw //true
z4.constructor === Bmw; // true //콘스트럭트는 생성자 Bmw를 가르킨다.