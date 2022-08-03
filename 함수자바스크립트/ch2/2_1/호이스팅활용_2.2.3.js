//코드 2-18 호이스팅을 이용하여 return문 아래 함수 선언하기
function add(a,b) {
    return valid() ? a + b : new Error();

    function valid(){
        return Number.isInteger(a) && Number.isInteger(b);
    }
}

console.log(add(10,5)) // 15;
console.log(add(10,"a")) //Error

//코드 2-19 호이스팅을 이용해 코드의 순서를 이해하기 편하게 배치
app.post('/login', function(req, res){
    db.select("users", { where: { email: req.body.email}}, function(err, user){
        function end(user){
            req.session.user = user;
            res.redirect('/');
        }
        if(user && user.password === req.body.password) return end(user);

        db.insert("users", {
            email: req.body.email,
            password: req.body.password
        },function (err, user){
            end(user);
        })
    })
})

add.post('/login', function (req, res){
    db.select("users", {where: {email: req.body.email}},function (err, user){

        if(user && user.password === req.body.password) return end(user);

        db.insert("users", {
            email: req.body.email,
            password : req.body.password
        }, function (err, user){
            end(user);
        });
        function end(user){
            req.session.user = user;
            res.redirect('/');
        }
    })
})

//2.2.4 괄호없이 즉시 실행하기
//코드 2-20 일반적인 즉시 실행 방식
    (function(a) {
        console.log(a);
        //100
    })(100);

//에러난 경우
function(e){
    console.log(e)
}(100);

//코드2-25 괄호 없이 정의가 가능한(즉시 실행도 가능한) 다양한 상황
!function(a){
    console.log(a) //1
}(1);

true && function(a){
    console.log(a); //1
}(1);

1 ? function(a){
    console.log(a); //1
}(1) : 5;

0, function(a){
    console.log(a); //1
}(1);

var b = function(a){
    console.log(a);
}(1);

function f2(){}
f2(function(a){
    console.log(a) //1
}(1));


var f3 = function c(a){
    console.log(a);
}(1);

new function(){
    console.log(1);
}

//코드 2-26
var pj = new function(){
    this.name = 'PJ';
    this.age = 28;
    this.constructor.prototype.hi = function(){
        console.log('hi');
    }
}

console.log(pj);
pj.hi();

//코드 2-27 즉시 실행하며 this 할당하기
var a = function(a){
    console.log(this, a);
},call([1],1)