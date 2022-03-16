

console.log(log_length(
    map(filter(users, u=> u.age), u => u.name)));

var under_30 = u => u.age <30;
var over_30 = u => u.age >=30;

console.log(log_length(
    map(filter(users, under_30), u => u.age)));

console.log(log_length(
    map(filter(users, over_30),u => u.name)));

var ages = list => map(list, v => v.age);
var names = list => map(list, v => v.name);

console.log(log_length(ages(filter(users, under_30))));
console.log(log_length((names(filter(users, over_30)))));

//마지막으로 한번만 고쳐보자
var bvalues = key => list => map(list, v=> v[key]);
var ages = bvalues('age');
var names = bvalues('name');

function bvalues(key){
    return function(list){
        return map(list, function(v) {return v[key];});
    }
}
// ----
var ages = bvalues('age');
var names = bvalues('name');
var under_30 = function(u){return u.age < 30;};
var over_30 = function(u){return u.age>= 30;};
console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));

function bvalues(key){
    var value = bvalue(key);
    return function(list){return map(list, value);}
}