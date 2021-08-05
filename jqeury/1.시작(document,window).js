/*
*   jQuery를 사용한 모든 웹 페이지는 다음 코드로 시작합니다.
 */
$(document).ready(function (){

});
/**
 * (document).ready()는 문서가 준비되면 매개변수로 넣은 콜백함수를 실행하라는 의미입니다. jQuery이벤트 메서드 중 하나입니다.
 * 이 메서드는 다음과 비슷한 기능을 수행
 *
 */
window.onload = function (){

};

/*
* 고전이벤트 모델은 한번에 하나의 이벤트만 연결할 수 있습니다.
* 반면에 jQuery의 이벤트 메서드는 표준 이벤트 모델이나
* 인터넷 익스플로러 이벤트 모델과 마찬가지로 이벤트로 여러개의 함수를 연결 할 수있습니다.
* */
// 경고창 세개가 연달아 표시가능
$(document).ready(function (){
    alert('First READY');
});
$(document).ready(function (){
    alert('Second READY');
});
$(document).ready(function (){
    alert('Third READY');
});

// $(document).ready()의 간단한 표기방식
$(function (){ });

//$ 는 특수 기호 _ 이다 , jQuery라고 식별해주는 식별자로 사용함

window.jQuery = window.$ = jQuery;

/**
 * **************************************************************************************/

/* jQuery  에서 가장 많이 사용하는 형태
* (첫번째) 매개변수에 바꼬자하는 스타일 속성이름
* (두번째) 메서드에 스타일 속성 값을 입력
* */
 $('hi').css('color', 'red');
// 선택자         메서드

$(document).ready(function (){
    $('*').css('color','red'); //* 전체 컬러 설정
    $('h1.p').css('color','orange'); // h1 태그와 p태그의 스타일을 모두 변경
    $('#taget').css('bacground','red'); // taget의 id 의 배경을 빨간색으로 변경, id는 하나만 존재해야함
    $('h1#taget').css('bacground','red'); //h1태그의 아이디는 taget 이라고 정확하게 명시하면 좋음
    $('body > * ').css('bacground','red'); // body 안의 자손들 전부 선택 , 바로밑에 자식라인만 선택됨
    $('body  * ').css('bacground','red');// 바로밑에 자식 말고도 그 밑에 자식들도 모두 선택됨
});
