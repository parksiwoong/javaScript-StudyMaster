/***
 * Promise
 * 예를 들면 작업을 맡겨놓고 그 작업이 되면 알려주는것,  그동안 다륵작업을 수행할 수 있음.
 * */

const pr = new Promise((resolve, reject) =>{ // resolve자리는 성공한경우 , reject 자리는 실패했을경우 , 이렇게 어떤일이 완료되어 실행되는 함수를 callback함수라고 한다.
    //판메자는 주문을 받으면 3초동안 뭔가를 하고 실패인지 성공인지 알려줌
    //code
    setTimeout(()=>{ // 이 코드는 pending(대기) 였다가 3s(초) 후에 rejected(거부됨) 으로 바뀜
        reject(new Error('error..'))
    },3000)
});

/*** ********************************************/
const pr = new Promise((resolve, reject) =>{
    setTimeout(()=>{ // 이 코드는 pending(대기) 였다가 3s(초) 후에 OK 으로 바뀜
        resolve('OK')
    },3000)
});
pr.then( //then을 이용해서 result와 rejected를 처리 할 수 있음
    function (result){}, //첫번째 함수는 이행되었을때 실행하는 함수 , 여기 result에는 OK라는 값이 들어옴
    function (err){}    //두번째 함수는 거부되었을때 실행되는 함수 , 저 err에는 에러값이 들어옴
);

/*** ********************************************/
// 작성을 하면 이런 모습이 됨
const pr = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        resolve('OK')
    },3000);
});
pr.then( //then을 이용해서 result와 rejected를 처리 할 수 있음
    function (result){
        console.log(result + '가지러 가자');
    },
    function (err){
        console.log('다시 주문해주세요');
    }
);

/*** ********************************************/
//catch 로 묶은모습
const pr = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        resolve('OK')
    },3000)
});
/*
pr.then(
    function (result){},
    function (err){},
    )*/   // 이 모습을 밑에 모습으로 바꿀 수 있다.
pr.then(
    function (result){}
).catch(
    function (err){}
)

/*** ********************************************/
// finally
// 파이너리는 이행이든 거부든 처리가 완료되면 항상 실행됨
// 로딩화면같은걸 없앨때 유용함
pr.then(
    function (result){}
).catch(
    function (err){}
).finally(
    function (){
        console.log('---주문끝----')
    }
)


/*** ********************************************/
//실제사용예제

const pr = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //resolve("OK");
        reject(new Error("err.."));
    },1000);        // 시작 OK 끝 , 시작 err.. 끝
});

console.log("시작");
pr.then((result)=>{
    console.log(result);
})
    .catch((err) =>{
        console.log(err);
    })
    .finally(()=>{
        console.log("끝");
    });

/*** ********************************************/
// 콜백함수로 예제 만들기
const f1 = (callback)=>{
  setTimeout(function (){
      console.log("1번 주문 완료");
      callback();
  },1000);
};
const f2 = (callback)=>{
    setTimeout(function (){
        console.log("2번 주문 완료");
        callback();
    },3000);
};
const f3 = (callback)=>{
    setTimeout(function (){
        console.log("3번 주문 완료");
        callback();
    },2000);
};

console.log('시작');
f1(function (){
    f2(function (){//1번주문 후 2번주문을 하기위해
        f3(function (){//2번주문 후 3번주문을 하기위해 f2안에 f3을 적어줌
            console.log("끝");
        });
    });
});
//시작
// 1번 주문 완료
// 2번주문 완료
// 3번주문 완료
// 끝

/*** ********************************************/
//콜백함수를 사용하지않고  프로미스로 사용해보기

const f1 = ()=>{
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res("1번 주문 완료");
        },1000);
    });
};
const f2 = (message)=>{
    console.log(message);
    return new Promise((res, rej)=>{
    setTimeout( ()=>{
        res("2번 주문 완료");
     },1000);
    });
};
const f3 = (message)=>{
    console.log(message);
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res("3번 주문 완료");
        },1000);
    });
};

// 프로미스 체이닝(Promises chaining) : 이렇게 연결 연결 연결 되는거
console.log('시작');
f1().then((res) => f2(res))
    .then((res) => f3(res))
    .then((res) => console.log(res))
    .catch(console.log)
    .finally(()=>{
        console.log("끝");
    });
//시작
// 1번 주문 완료
// 2번주문 완료
// 3번주문 완료
//  끝

//  promise.all 은 한꺼번에 실행하고 모두 이행되면 값을 사용할 수 있는거 ,시간도 절약가능
// 제일 오래걸리는 3초면 모든 제품을 받을 수 있는데 이때 쓸 수 있는게  promise.all 임
Promise.all([f1(), f2(), f3()]).then((res) => {
    console.log(res);
}); // ["1번 주문 완료", "2번 주문완료" ,"3번 주문완료"]


// Promise.race() :  promise.all은 모든 작업이 완료 되어야하지만 race는 1등으로 완주(안료)되면 끝나버림
