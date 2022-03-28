// 1.3.3 함수를 만드는 함수와 find, filter 조합하기
var users = [
    {id: 1 , name : "ID", age: 32},
    {id: 2 , name : "HA", age: 25},
    {id: 3,name: "BJ", age: 32},
    {id: 4 , name : "PJ", age: 28},
    {id: 5 , name : "JE", age: 27},
    {id: 6,name: "JM", age: 32},
    {id: 6,name: "HI", age: 24}
];
// var users2 = [
//     new User(1, "ID" , 32),
//     new User(2, "HA", 25),
//     new User(3, "BJ", 32),
//     new User(4, "PJ", 28),
//     new User(5, "JE", 27),
//     new User(6, "JM", 32),
//     new User(7, "HI", 24),
// ]
function find(list, predicate){
    for(var i = 0 , len = list.length; i<len; i++){
        if(predicate(list[i])) return[i];
    }
}
function bmatch1(key, val){
    return function(obj){
        return obj[key] === val;
    }
}
console.log(find(users, bmatch1('id', 1)));
