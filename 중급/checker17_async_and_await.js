/***
 * async await
 * 저번시간에 promise를 배웠지만 async await를 사용하면 rpomise의 then 메소드를 호출하는거보다 가독성이 좋아짐
 * */

async function getName(){
    return "Mike";
}
console.log(getName()); // Promise{<fulfilled>:"Mike"}


// await -------------------
async function getName(){
    return Promise.resolve("Tom");
}

getName().then((name)=>{
    console.log(name);
});

//----------------
function getName(name){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(name);
        }, 1000);
    });
}
async function showName(){
    const result = await getName("Mike"); //getName에서 resolve된 값을 1초후에 넣어주는거
    console.log(result);
}

console.log("시작");
showName();
//시작
//Mike

/*** *****************지난 시간에 했던 Promise를 async await로 바꿔서 사용 해보기 ***************************/
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


// f1().then((res) => f2(res))
//     .then((res) => f3(res))
//     .then((res) => console.log(res))
//     .catch(console.log)
//     .finally(()=>{
//         console.log("끝");
//     });
//가독성이 명확한 async가 프로미스 덴을 쓰는거보다 보기 더 편해서 자주 쓰는편
async function order(){
    const result1 = await f1();
    const result2 = await f2(result1);
    const result3 = await f2(result2);
    console.log(result3);
    console.log("종료");
}
order();
//시작
//1주문 완료
//2주문 완료
//3주문 완료
//종료

// async 는 그냥 .catch문이 아니라 try catch를 써주면 됨
async function order(){
    try {
        const result1 = await f1();
        const result2 = await f2(result1);
        const result3 = await f2(result2);
        console.log(result3);
    }catch (e){
        console.log(e) //여기서 적절한 에러를 처리해주고 사용하면됨
    }
    console.log("종료");
}
order();

// async promise.all 까지 쓰는방법


const f1 = ()=>{
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res("1번 주문 완료");
            //rej(new Error("err.."));
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

async function order(){
    try {
        const result = await Promise.all([f1(),f2(),f3()]);
    }catch (e){
        console.log(e) //여기서 적절한 에러를 처리해주고 사용하면됨
    }
    console.log("종료");
}
order(); // ["1번 주문 완료" , "2번 주문 완료" , "3번 주문 완료"] 종료
