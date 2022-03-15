

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
