//1.3.2 값에서 함수로


// function findByName(list, name){
//     for(var i =0 , len = list.length; i < len; i++){
//         if(list[i].name == name) return list[i];
//     }
// };
// function findById(list, id){
//     for(var i = 0, len = list.length; i < len; i++){
//         if(list[i].id == id) return list[i];
//     }
// }
// function fiondByAge(list, age){
//      for(var i = 0, len = list.length; i < len ; i++){
//          if(list[i].age == age) return list[i];
//      }
// }
var users = [
    {id: 1 , name : "ID", age: 32},
    {id: 2 , name : "HA", age: 25},
    {id: 3,name: "BJ", age: 32},
    {id: 4 , name : "PJ", age: 28},
    {id: 5 , name : "JE", age: 27},
    {id: 6,name: "JM", age: 32},
    {id: 6,name: "HI", age: 24}
];
var users2 = [
    new User(1, "ID" , 32),
    new User(2, "HA", 25),
    new User(3, "BJ", 32),
    new User(4, "PJ", 28),
    new User(5, "JE", 27),
    new User(6, "JM", 32),
    new User(7, "HI", 24),
]

function User(id, name, age){
    this.getId = function(){
        return id;
    }
    this.getName = function(){
        return name;
    }
    this.getAge = function(){
        return age;
    }
};
function find(list, predicate){
    for(var i = 0 , len = list.length; i<len; i++){
        if(predicate(list[i])) return[i];
    }
}

// console.log(
//     find(users2, function(u){return u.getAge() == 25; }).getName()
// );
console.log(
  find(users, function(u){return u.name.indexOf('P') != -1; })
);
console.log(
    find(users, function (u){return u.age == 32 && u.name == 'JM';})
)