// ' ," ,`  문자열을 찍을때 크게 상관은 없지만 `(desc) 이건 for 안에 ${} 이렇게 뭐가들어갈지 모를때 사용할때 좋다
//하지만 표현을 하고싶은 " ' 이런것들이 있을때 그것의 반대껄로 감싸줘야한다
let html = '<div class = "box_title"> 제목 영역</div>' // html같은경우는 '' 로 감싸는게 편하다 "" 를 자주 사용하기 때문
let desc = "It's 3 o'clock." // 반면 영어로된 문장은 ""로 감싸주는게 좋다
//dese는 $를 이용해 변수를 표현하거나 표현식을 쓸 수 있다
let name ='Mike';
let result = `My name is ${name}.` //My name is Mike.
let add = `2 더하기 3은 ${2+3} 입니다.` // 2더하기 3은 5입니다.

//dese
//여러줄
