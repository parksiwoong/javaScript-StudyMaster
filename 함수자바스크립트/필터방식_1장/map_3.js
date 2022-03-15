var users = [
    {id: 1 , name : "ID", age: 32},
    {id: 2 , name : "HA", age: 25},
    {id: 3,name: "BJ", age: 32},
    {id: 4 , name : "PJ", age: 28},
    {id: 5 , name : "JE", age: 27},
    {id: 6,name: "JM", age: 32},
    {id: 6,name: "HI", age: 24}
];
// chapter_1문법에서 바꾼 코드
function filter(list, predicate){
    var new_list  = [];
    for (var i = 0, ren= list.length; i <ren; i++){
        if (predicate(list[i])){
            new_list.push(list[i]);
        }
    }
    return new_list;
}

//맵방식으로 이번엔
function map(list, iteratee){
    var new_list = [];

    for(var i =0, len = list.length; i < len; i++){
        new_list.push(iteratee(list[i]));
    }
    return new_list;
}
//30 미만
var users_under_30 = filter(users, function (user){
    return user.age < 30
});
console.log(users_under_30.length);

//30 미만사람들 나이
var ages = map(users_under_30, function(user){
    return user.age;
});
console.log(ages);

//30대 이상인 수
var users_over_30 = filter(users, function(user){return user.age >= 30});
console.log(users_over_30);
!!ㅃㅁ케ㅣㅡ12

var names = map(users_over_30, function(user){return user.name;} );
console.log(names.length);