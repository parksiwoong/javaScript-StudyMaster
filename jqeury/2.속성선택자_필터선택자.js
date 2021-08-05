/**
 * 기본 선택자
*  요소[속성=값]  속성과 같은 문서 객체를 선택합니다.
*  요소[속성!=값] 속성 안의 값이 특정 값과 같은 문서 객체를 선택합니다.
*  요소[속성~=값] 속성 안의 값이 특정 값을 단어로 시작하는 문서 객체를 선택합니다.
*  요소[속성^=값]  속성 안의 값이 특정 값으로 시작하는 문서 객체를 선택합니다.
*  요소[속성$=값]  속성 안의 값이 특정 값으로 끝나는 문서 객체를 선택합니다.
*  요소[속성=값]  속성 안의 값이 특정 값을 포함하는 문서 객체를 선택합니다.
 * */

/* 속성 선택자는 입력 양식과 관련된 태그를 선택할때 많이 사용합니다.
*   input 태그들은 태그 선택자로 구분할 수 없습니다. */

/* -- jsp --
<body>
<input type="text" />
<input type="password" />
<input type="radio" />
<input type="checkbox" />
<input type="file" />
</body>
*/

$(document).ready(function (){
    $('input[type=text]').val('Hello jQuery..!'); //val 메서드는 매개변수를 입력하면 input태그의 value속성을 지정하고,
                                                  // 매개변수를 입력하지 않으면 value속성을 검사하게 됩니다. ( 적으면 전달되는것)
});

/*************************************************************************************/
/* 필터 선택자 : 선택자 중에 : 기호를 포함하는 선택자를 필터 선택자라고 부릅니다.   */

// 입력 양식 필터 선택자
/* 속성선택자는 uput태그의 type속성 따라 문서객체를 선택했다면
*  더 간단한 방법은 필터 선택자 */

/**
 * jQuery의 입력 양식 필터 선택자(1)
 * 선택자형태      설명
 * 요소:button    input 태그 중 type 속성이 button인 문서 객체와 button 태그를 선택함
 * 요소:checkbox  input 태그 중 type 속성이  check인 태그를 선택함
 * 요소:file      input 태그 중 type 속성이 file인 문서 객체를 선택함
 * 요소:image     input 태그 중 type 속성이 image인 문서 객체를 선택함
 * 요소:password  input 태그 중 type 속성이 password인 문서 객체를 선택함
 * 요소:radio     input 태그 중 type 속성이 radio인 문서 객체를 선택함
 * 요소:reset     input 태그 중 type 속성이 reset인 문서 객체를 선택함
 * 요소:submit    input 태그 중 type 속성이 submit인 문서 객체를 선택함
 * 요소:text      input 태그 중 type 속성이 text인 문서 객체를 선택
 *
 *
 * 입력 양식 필터 선택자는 'input:button'의 형태로 선택하면 됨
 * jQuery의 입력 양식 필터 선택자(2)
 * 선택자형태       설명
 * 요소:checked    체크되어 있는 입력 양식을 선택합니다.
 * 요소:disabled   비활성화된 입력 양ㅅ익을 선택합니다.
 * 요소:enabled    활성화된 입력 양식을 선택합니다.
 * 요소:focus      초점이 맞추어져 있는 입력 양식을 선택합니다.
 * 요소:input      모든 입력 양식을 선택합니다(input, textarea,select,button 태그)
 * 요소:selected   option 객체 중 선택된 태그를 선택합니다
 * */



// -- jsp --
/*
<body>
    <select>
        <option>Apple</option>
        <option>Bag</option>
        <option>Cat</option>
        <option>Dog</option>
        <option>Elephant</option>
    </select>
</body>
*/

// setTimeout()함수로 웹페이지를 실행하고 5초 정도 후에 선택자로 간단한 연습
$(document).ready(function (){
    //5초 후에 코드를 실행 ( :selected 필터는 굉장이 많이 사용됨 내용을 따로 외워두는게 좋음
    setTimeout(function (){
        //변수 선언
        var value = $('select > option:selected').val();

        //출력
        alert(value);
    }, 5000);
});

/*************************************************************************************/
/* 위치 필터 선택자 */

/**
 * jQuery의 위치 필터 선택자(1)
 * 선택자형태      설명
 * 요소:odd       홀수 번째에 위치한 문서 객체를 선택함
 * 요소:even      짝수 번째에 위치한 문서 객체를 선택함
 * 요소:first     첫 번째에 위치한 문서 객체를 선택함
 * 요소:last      마지막에 위치한 문서 객체를 선택함
 *
 * */

// jsp
/*
<body>
    <table>
        <tr><th>이름</th><tr>혈액형</tr><tr>지역</tr></tr>
        <tr><th>강민수</th><tr>AB형</tr><tr>서울특별시</tr></tr>
        <tr><th>구지연</th><tr>B형</tr><tr>미국 켈리포니아</tr></tr>
        <tr><th>김미화</th><tr>AB형</tr><tr>미국 메사추세츠</tr></tr>
    </table>
</body>
*/

// 테이블 줄무늬가 되게 하려면 홀수 색과 짝수 색 다르게, 첫번째 글자 색은 흰색에 검정색 배경색
$(document).ready(function (){
    $('tr:odd').css('background','#F9F9F9');
    $('tr:even').css('background','#9f9f9f');
    $('tr:first').css('background', '#000000').css('color','#FFFFF');
});

/*************************************************************************************/
/* 함수 필터 선택자 */
//jQuery는 함수 형태의 필터 선택자도 제공함

/**
 * jQuery의 함수 필터 선택자(1)
 * 선택자형태                설명
 * 요소:contains(문자열)    특정 문자열을 포함하는 문서 객체를 선택함
 * 요소:eq(n)              n번째에 위치하는 문서 객체를 선택함
 * 요소:gtn(n)             n번째 초과에 위치하는 문서객체를 선택함
 * 요소:has(h1)            h1태그가 있는 문서 객체를 선택함
 * 요소:lt(n)              n번째 미만에 위치하는 문서 객체를 선택함
 * 요소:not(선택자)         선택자와 일치하지 않는 문서 객체를 선택함
 * 요소:nth-child(3n+1)    3n+1번째에 위치하는 문서 객체를 선택함(1,4,7, ...)
*/
//필터 선택자는 기본선택자에 비해 활용도가 많이 떨어짐, 그래서 외우지말고 필요할때 찾아쓰도록
$(document).ready(function (){
    $('tr:eq(0)').css('background','#F9F9F9');
    $('tr:nth-child(3n+1)').css('background','#9f9f9f');
    $('tr:nth-child(3n+2)').css('background', '#000000').css('color','#FFFFF');
    $('tr:nth-child(3n)').css('background', '#000000')
});

