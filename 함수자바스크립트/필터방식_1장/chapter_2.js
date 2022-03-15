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

//30살 보다 적은사람들을 구하는 함수
/*  var temp_users = [];
    for(var i =0, len = users.length; i < len; i++){
        if(users[i].age < 30){
            temp_users.push(users[i]);
        }
}*/
var users_under_30 = filter(users, function(user){
    return user.age < 30
    });
console.log(users_under_30.length);


//위에 숫자 사람만큼 나이 확인
var ages = [];
for(var i = 0, len = users_under_30.length; i <len; i++){
    ages.push(users_under_30[i].age);
}
console.log(ages);

//30대 보다 높은사람
var users_over_30 = filter(users, function(user){
    return user.age >= 30
});
console.log(users_over_30.length);

var names = [];
for(var i =0 , len = users_under_30.length; i < len; i++){
    names.push(users_under_30[i].name);
};

console.log(names);