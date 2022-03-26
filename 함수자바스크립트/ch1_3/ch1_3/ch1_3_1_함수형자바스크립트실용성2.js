var users = [
    {id: 1 , name : "ID", age: 32},
    {id: 2 , name : "HA", age: 25},
    {id: 3,name: "BJ", age: 32},
    {id: 4 , name : "PJ", age: 28},
    {id: 5 , name : "JE", age: 27},
    {id: 6,name: "JM", age: 32},
    {id: 6,name: "HI", age: 24}
];
function filter(list, predicate){
    var new_list = [];
    for(var i =0, ren = list.length; i < ren; i++){
        if(predicate(list[i])){
         new_list.push(list[i]);
        }
    }

}
/*console.log(
    filter(users, function(user){return user.id == 3})[0]
);*/


//이름 찾아서 넣을때 이게 제일 좋은 방법인거 같음 원하는 user를 찾는방법
var user;
for (var i = 0, len = users.length; i < len; i++){
 if(users[i].id==3){
     user = users[i];
     break;
 }
}
console.log(user);

function findById(list, id){
    for(var i =0, len = list.length; i<len; i++){
        if(list[i].id == id){
            return list[i];
        }
    }
}
console.log(findById(users, 3));
console.log(findById(users, 5));

//나이로 찾는 함수
function findByAge(list, age){
    for(var i = 0, len = list.length; i <len; i++){
        if(list[i].age == age)return list[i];
    }
}
console.log(findByAge(users, 28));

function findByName(list, name){
    for(var i =0 , len = list.length; i< len; i++){
        if(list[i].name == name)return list[i];
    }
}
console.log("이름에 맞는 아이가 들어왔니",findByName(users, 'BJ'));

//인자를 하나 더 늘리면 중복을 제거할 수 있다

function findBy(key, list, val){
    for(var i = 0, len = list.length; i <len; i++){
        if(list[i][key]===val)return list[i];
    }
}
console.log(findBy('name', users, 'BJ'));

function User(id, name, age){
    this.getId = function(){
        return id;
    };
    this.getName = function(){
        return name;
    }
    this.getAge = function(){
        return age;
    }
}
    var users2 = [
        new User(1, "ID" , 32),
        new User(2,"HA", 25),
        new User(3,"BJ", 32),
        new User(4, "PJ", 28),
        new User(5, "JE", 27),
        new User(6, "JM", 32),
        new User(7, "HI", 24),
    ]

    function findBy(key, list,val){
    for(var i = 0, len = list.length; i < len; i++){
        if(list[i][key]===val)return list[i];
    }
 }
 console.log(findBy('age',users2))