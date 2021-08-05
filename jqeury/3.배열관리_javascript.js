/**
 * 배열 관리
 * jQuery로 배열 관리 할때는 each() 메서드를 사용
 *
 * each()메서드는 두가지 형태로 사용됨
 * 1. $.each(object, function (index, item){})
 * 2. $(selector).each(function(index, item){})
 *
 * */

/* 자바스크립트 배열관리 */
$(document).ready(function (){
    //변수 선언
    var array = [
        { name : 'Hanbit Media', link: 'http://hanb.co.kr'},
        { name : 'Naver', link: 'http://naver.com'},
        { name : 'Daum', link: 'http://daum.net'},
        { name : 'Paran', link: 'http://paran.com'},
    ]
});


// $.each()메서드의 첫번째 매개변수에 배열넣고 두번째 매개변수에는 매개변수로 index와 item을 갖는 함수를 넣음

$(document).ready(function (){
    //변수 선언
    var array = [
        { name : 'Hanbit Media', link: 'http://hanb.co.kr'},
        { name : 'Naver', link: 'http://naver.com'},
        { name : 'Daum', link: 'http://daum.net'},
        { name : 'Paran', link: 'http://paran.com'},
    ]

    // $.each()  메서드를 사용  index는 (배열인댁스 또는 키)를 의미호고 item은 (키 또는 값)을 의미
    $.each(array,function (index,item){
        //변수를 선언함
        var output = '';

        // 문자열을 만듬
        output += '<a href= "'+ item.link +'" >';
        output += ' <h1>' + item.name + '</h1>';
        output += '</a>';
    });
});


// $.each() 메서드의 콜백 함수
$(document).ready(function (){
    $.each(array, function(index, item){
        //변수를 선언함
        var output = '';

        // 문자열을 만듬
        output += '<a href= "'+ item.link +'" >';
        output += ' <h1>' + item.name + '</h1>';
        output += '</a>';
    });
});
