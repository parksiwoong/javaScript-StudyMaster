/* 배열메서드_2      */

/***** arr.sort()  : 배열 재정렬, 배열자체가 변경되니 주의 , 인수로 정렬 로직을 담은 함수를 받음 */
let arr = [1,5,4,2,3];
arr.sort();
console.log(arr); // [1,2,3,4,5]

let arr = ["a","c","d","e","b"];
arr.sort();
console.log(arr); // ["a","b","c","d","e"] 알파벳도 순서대로 정렬가능

let arr = [27, 8, 5, 13]; // 그냥 이렇게 하게되면 문자로 인식하여 [13, 27, 5, 8] 로 인식한다

//함수 전달방법 1
function fn(a,b){
    return a - b;
}
//함수 전달방법2  //2번째로 써서 보내보겠음
arr.sort((a,b)=>{
    return a - b; //a와 b를 확인해서 a가 작으면 a를 앞으로 보냄 ,0을 반환받으면 가만히 있고 , a가 크면 b가 더 작으니 b를 앞으로 보냄
});
// 함수 전달받는방법1
arr.sort(fn);
// 함수 전달받는방법2
console.log(arr)

/**** sort같은 걸 사용할때 보통 Lodash 같은 라이브러리를 다운받아 사용함 https://lodash.com/
 *      _.sortBy(arr); :  어떤 로직이 들어가있는지 신경 안써도되고 숫자든 문자든 객체든 원하는 기준으로 정렬해줌
 *
 * */

/****
    arr.reduce()
    인수로 함수를 받음
    (누적 계산값,현재값) =>{ return 계산값 };
    배열돌면서 최종값을 반환받는거
 * */

// 배열의 모든 수 합치기 *******************
let arr = [1,2,3,4,5];
// for , for of , forEach
let result =0;
arr.forEach(num =>{
   // result = result + num;
    result += num;
});
console.log(result); //15

// 위의 로직을 한번에 처리할 수 있는것이 reduce() 이다.
const result = arr.reduce((resv, cur)=>{ // 첫번쨰값(resv)은 계산값 , 두번째값(cur) 현재값
    return prev + cur; //지금까지 계산된값에 현재값을 더해주는거
},100); //100으로 시작하고 거기에 prev(1) + cur(2) 하고 한바퀴 돌아와 prev(3) + cur(3) 하여 또 돌고 prev(6)+cur(4) .. prev(10)+cur(5) 하여 15를 구한 후 초기값이100으로 시작하여 100에다가 1더하고 ..
        //해서 총 115가 되는거
console.log(result);


//map말고 reduce를 써서 배열을 반환하는거
let userList = [
    {name:"Mike",age:30},
    {name:"Tom" ,age:10},
    {name:"Jane",age:27},
    {name:"Sue",age:26},
    {name:"Harry",age:42},
    {name:"Steve",age:60}
];
// reduce를 써서 성인들만 배열로 뽑아보는 방법
let result = userList.reduce((prev, cur)=>{ // 계산된값과 현재값
    if(cur.age>19){
        prev.push(cur.name);
    }
    return prev;   //["Mike","Jane","Sue","Harry","Steve"]
},[]) //초기값(누진값) []

// reduce를 써서 나이의 합을 구하는방법
let result = userList.reduce((prev, cur)=>{ // 계산된값과 현재값
    return prev += cur.age;  // 총 더한 나이 196
},0) //초기값(누진값) 0

// reduce를 써서 이름이 3자인사람
let result = userList.reduce((prev, cur)=>{ // 계산된값과 현재값
    if(cur.name.length===3){
        prev.push(cur.name);
    }
    return prev;
},[]) //초기값(누진값) 0
