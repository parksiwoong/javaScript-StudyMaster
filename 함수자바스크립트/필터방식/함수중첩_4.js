//함수중첩

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

//
var ages = map(
    filter( users, function(user){return user.age < 30}),
    function (user){return user.age;});
//나이 몇명인지 length로 보여주기
console.log(ages.length);
// 나이 보여주기
console.log(ages);

var names = map(
    filter(users, function(user){ return user.age >= 30 }),
       function(user) {return user.name});

console.log(names.length);
console.log(names);

//함수중첩2
function log_length(value){
    consol.log(value.length);
    return value;
}
consol.log(log_length(
            map(
                filter(uesrs, function(user){return users.age <30}),
                function(user){return user.age;}
            )
        )
)
function fileter(list, predicate){
    var new_list = [];
    for(var i = 0, len =list.length; i < len; i++){
        if(predicate(list[i])) {
            new_list.push(list[i]);
        }
        return new_list;
    }
};
function map(list, iteratee){
    var new_list = [];
    for(var i = 0, len = list.length; i < len; i++){
        new_list.push(iteratee(list[i]));
    }
}

function log_length(value){
    console.log(value.length);
    return value;
};

console.log(log_length(
    map(filter(users, function(user){return user.age <30}),
         function(user){return user.age;}
    )));
    console.log(log_length(
        map(filter(users,
        function(user) {return user.age>=30}),
         function(user) {return user.name; })));
