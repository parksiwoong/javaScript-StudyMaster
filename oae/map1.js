
window.onload = function() {
    if("" != null && "" != ""){
        fn_search();
    }
}
// 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('3d8aa0e0394c2c6c21036779bf295498');

var filter = "win16|win32|win64|mac";
var isMobile = false;
var selectedMarker = null;
if(navigator.platform){
    if(0 > filter.indexOf(navigator.platform.toLowerCase())){
        isMobile = true;
    }
}

// 카카오 로그인 버튼을 생성합니다.
function getNavi(nm, pX, pY){
    Kakao.Navi.start({
        name: nm,
        x: parseFloat(pX),
        y: parseFloat(pY),
        coordType: 'wgs84'
    });
}

var positions = [];
var mylat = "0"; // 내 위도
var mylon = "0"; // 내 경도
var infowindow;
var infowindows = [];

var markers = [];

var rcvData = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new daum.maps.Map(mapContainer, mapOption);

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
if (navigator.geolocation) {

    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(posi) {

        mylat = posi.coords.latitude; // 위도
        mylon = posi.coords.longitude; // 경도

        var locPosition = new daum.maps.LatLng(mylat, mylon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

            message = '';
        message += '<div class="layer_info" style="width:60px; height:25px">';
        message += '		<ul>';
        message += '			<li>현재위치</li>';
        message += '		</ul>';
        message += '</div>';

        // 마커를 생성합니다
        var marker = new daum.maps.Marker({
            map: map,
            position: locPosition
        });

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new daum.maps.CustomOverlay({
            position: locPosition,
            content: message
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);

        // 현재 지도 기준으로 주차장 정보 세팅
        fn_getMapInfo();
    });

} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    var locPosition = new daum.maps.LatLng(33.450701, 126.570667),
        message = '현재위치 확인불가!'

    displayMarker(locPosition, message);
}

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new daum.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// daum.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new daum.maps.ZoomControl();
map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

// 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
daum.maps.event.addListener(map, 'dragend', function() {
    fn_getMapInfo();
});

// 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
daum.maps.event.addListener(map, 'zoom_changed', function() {
    fn_getMapInfo();
});

function fn_getMapInfo(){
    // 지도 레벨
    var currLevel = map.getLevel();

    // 먼저 열린 infowindow 다 닫아주고 시작.
    closeInfowindow();

    if(currLevel > 3){ // 지도의 뷰 레벨이 3보다 클때는 정보를 더이상 가져오지 않는다.
        if(currLevel == 4){
            alert("현재의 지도 레벨은 " + currLevel + " 레벨 입니다.\n3레벨 이상에서는 더 이상 주차장 정보를 가져오지 않습니다.");
        }
    }else{
        positions = [];

        // 지도 중심좌표를 얻어옵니다
        var latlng = map.getCenter();

        // 지도의 현재 영역을 얻어옵니다
        var bounds = map.getBounds();

        // 영역의 남서쪽 좌표를 얻어옵니다
        var swLatLng = bounds.getSouthWest();

        // 영역의 북동쪽 좌표를 얻어옵니다
        var neLatLng = bounds.getNorthEast();

        fn_getInfo(swLatLng.getLng(), neLatLng.getLng(), swLatLng.getLat(), neLatLng.getLat());
    }

}

function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new daum.maps.Marker({
        map: map,
        position: locPosition
    });

    var iwContent = message; // 인포윈도우에 표시할 내용


    // 인포윈도우를 생성합니다
    infowindow = new daum.maps.InfoWindow({
        content : iwContent
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);

    // 현재 지도 기준으로 주차장 마커 세팅
    fn_getMapInfo();
}

function setMarker(){

    removeMarker(); //이거 지우면 이벤트 이전에 세팅되었던 마커도 그대로 남아있음.

    for (var i = 0; i < positions.length; i ++) {

        var imageSrc = '/mpis/images/ico_parking_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new daum.maps.Size(31, 42),  // 마커 이미지의 크기
            imgOptions =  {},
            markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new daum.maps.Marker({
                map: map,
                position: positions[i].latlng, // 마커의 위치
                image: markerImage
            });

        markers.push(marker);

        // 마커에 표시할 인포윈도우를 생성합니다
        infowindow = new daum.maps.InfoWindow({
            content: positions[i].content
        });

        infowindows.push(infowindow);

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        daum.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow, positions[i].buldSn, positions[i].cnt, positions[i].x, positions[i].y));
    }
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    $(markers).each(function(idx){
        this.setMap(null);
    });
    markers = [];
    infowindows = [];
}

// 인포윈도우 닫기
function closeInfowindow(){
    $(infowindows).each(function(idx){
        this.close();
    });
}

function createMarkerImage(markerSize, chk) {
    var markerImage;

    if(chk == 1){
        markerImage = new daum.maps.MarkerImage(
            '/mpis/images/ico_parking_blue.png', // 스프라이트 마커 이미지 URL
            markerSize, // 마커의 크기
            {}
        );
    }else{
        markerImage = new daum.maps.MarkerImage(
            '/mpis/images/ico_parking_orange.png', // 스프라이트 마커 이미지 URL
            markerSize, // 마커의 크기
            {}
        );
    }

    return markerImage;
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow, buldSn, cnt, x, y) {
    return function() {
        var normalImage = createMarkerImage(new daum.maps.Size(31, 42),1);//기본
        var clickImage = createMarkerImage(new daum.maps.Size(31, 42),2);//클릭

        closeInfowindow(); //열기전에 다 닫기

        // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 클릭 이미지로 변경합니다
        if (!selectedMarker || selectedMarker !== marker) {
            // 클릭된 마커 객체가 null이 아니면
            // 클릭된 마커의 이미지를 기본 이미지로 변경하고
            !!selectedMarker && selectedMarker.setImage(normalImage);

            // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
            marker.setImage(clickImage);
        }

        // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
        selectedMarker = marker;

        $("#accordion  " + "section" + " " + "h1" + " img").removeClass("open");
        $("#accordion  " + "section" + " " + "h1" + " img").addClass("closed");

        $("#" + "accordion" + " " + "section" + " " + "p").slideUp();
        $("#pid_"+cnt).slideDown();
        $("#h1id" + cnt + " img").addClass('open');
        $("#h1id" + cnt + " img").removeClass('closed');

        $("#accordion").children()[cnt].focus();

        findPoint(x, y, buldSn, cnt);
        infowindow.open(map, marker);
    };
}

// 지도에 표시할 주차장정보 가져오기
function fn_getInfo(sGpsX, eGpsX, sGpsY, eGpsY){
    $.ajax({
        url:'/mpis/pub/eai/list/box2.do',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType:'json',
        data:"sGpsX=" + sGpsX + "&eGpsX=" + eGpsX + "&sGpsY=" + sGpsY + "&eGpsY=" + eGpsY,
        type:"post",
        success:function(rsData){
            closeInfowindow();
            positions = [];
            var infoLayer = ""; //지도에 표시할 주차장정보 레이어
            var pList = ""; //검색 목록

            rcvData = rsData.list;
            var cnt = 0;
            $(rcvData).each(function(){
                $(this).each(function(idx){
                    var text;
                    var textarr;
                    if(this.text != "" && this.text != undefined){
                        text = this.text;
                        textarr = text.split('|');
                    }
                    infoLayer = '';
                    /* if(this.text != "" && this.text != undefined){
                        infoLayer += '<div class="layer_info" style="height:'+Number(Number(230)+Number(textarr.length*10))+'px;">';
                    }else{
                        infoLayer += '<div class="layer_info" style="height:230px;">';
                    }
                    infoLayer += '	<h3><span class="layer_info_tit">'+ nullStr(this.buldNm) +'</span><span class="layer_info_top"><a href="javascript:closeInfowindow();"><img src="/mpis/images/ico_close.png"></a></span></h3>';
                    infoLayer += '	<div class="layer_info_detail">';
                    infoLayer += '		<ul>';
                    infoLayer += '			<li>주소 : '+ nullStr(this.rdnmadr) +'</li>';

                    infoLayer += '			<li>기계식주차장 이용가능 대수 : '+ nullStr(this.totCnt) +'</li>';
                    if(this.noInspChk == "이용가능"){
                        infoLayer += '			<li>이용가능여부 : <span style="color:#0e66a9;">'+ nullStr(this.noInspChk) +'</span></li>';
                    }else{
                        infoLayer += '			<li>이용가능여부 : <span style="color:red;">'+ nullStr(this.noInspChk) +'</span></li>';
                    }
                    $(textarr).each(function(idx2){
                        if(idx2 == "0"){
                            infoLayer += '			<li>주차가능차량 제원 : '+nullStr(textarr[idx2])+'</li>';
                        }else{
                            infoLayer += '			<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp'+nullStr(textarr[idx2])+'</li>';
                        }
                    });
                    infoLayer += '			<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp(길이×너비×높이)</li>';
                    infoLayer += '			<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<span style="color:red;">*이하의 차량만 수용가능</span></li>';
                    infoLayer += '		</ul>';
                    infoLayer += '	</div>';
                    infoLayer += '</div>'; */

                    if(this.text != "" && this.text != undefined){
                        infoLayer += '<div class="layer_info" style="height:'+Number(Number(350)+Number(textarr.length*20))+'px;width:460px;">';
                    }else{
                        infoLayer += '<div class="layer_info" style="height:350px;width:460px;">';
                    }
                    infoLayer += '	<h3><span class="layer_info_tit">'+ nullStr(this.buldNm) +'</span><span class="layer_info_top"><a href="javascript:closeInfowindow();"><img src="/mpis/images/ico_close.png"></a></span></h3>';
                    infoLayer += '	<div class="layer_info_detail" style="padding:0px 8px;">';
                    infoLayer += '		<div class="table-type_pp01_parking" style="border-top:0px;">';
                    infoLayer += '			<table style="width:430px;">';
                    infoLayer += '				<colgroup>';
                    infoLayer += '					<col width="27%">';
                    infoLayer += '					<col width="33%">';
                    infoLayer += '					<col width="40%">';
                    infoLayer += '				</colgroup>';
                    infoLayer += '				<tr>';
                    infoLayer += '					<td colspan="3" style="font-size:20px;">'+ nullStr(this.rdnmadr) +'</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '				<tr>';
                    if(this.noInspChk == "이용가능"){
                        infoLayer += '					<td rowspan="2" style="text-align:center;"><img src="/mpis/images/parking_ok.png" style="width:53px;height:57px;font-size:17px;"><br/>이용가능</td>';
                    }else{
                        infoLayer += '					<td rowspan="2" style="text-align:center;font-size:12px;"><img src="/mpis/images/parking_no.png" style="width:53px;height:57px;"><br/>일부 이용가능<br/>또는 불가능</td>';
                    }
                    infoLayer += '					<td style="font-size:17px;">주차가능대수</td>';
                    infoLayer += '					<td style="font-size:17px;">'+ nullStr(this.totCnt) +'</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '				<tr>';
                    infoLayer += '					<td style="font-size:17px;">관리인</td>';
                    infoLayer += '					<td style="font-size:17px;">'+ nullStr(this.eduPerson) +'</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '				<tr>';
                    infoLayer += '					<td style="font-size:17px;">주차가능<br/>차량제원</td>';
                    infoLayer += '					<td colspan="2" style="font-size:17px;">';
                    $(textarr).each(function(idx2){
                        if(idx2 == "0"){
                            infoLayer += '						'+nullStr(textarr[idx2])+'kg 이하';
                            infoLayer += '						<br/>(길이×너비×높이, 중량)';
                        }else{
                            infoLayer += '						<br/>'+nullStr(textarr[idx2])+'kg 이하';
                            infoLayer += '						<br/>(길이×너비×높이, 중량)';
                        }
                    });
                    infoLayer += '					</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '				<tr>';
                    infoLayer += '					<td colspan="4">제공된 정보는 주차장 여건에 따라 차이가 있을 수 있습니다.</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '	</div>';
                    infoLayer += '</div>';

                    positions.push({"content":infoLayer, "latlng":new daum.maps.LatLng(this.localY, this.localX), "buldSn":this.buldSn, "cnt":cnt, "x":this.localX, "y":this.localY});
                });
                cnt++;
            });
            setMarker();

            setSearchList( rcvData );

        },
        error:function(xhr, status, error){
            //alert(error);
        }
    });
}

//시군구 조회
function fn_getSigungu(){

    var sido = $("#searchSido option:selected").text();

    $.ajax({
        url: '/mpis/pub/parking/json/getSigungu.do',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType:'json',
        data:"sido=" + sido,
        type:"post",
        success:function(rsData){
            $("select[name=searchSigungu] option").remove();

            $("#searchSigungu").append('<option value="">선택</option>');
            $(rsData.sigunguList).each(function(){
                $("#searchSigungu").append('<option value="'+this.codeNm+'">'+this.codeNm+'</option>');
            });

        },
        error:function(xhr, status, error){
            alert(error);
        }
    });
}

// 주차장 검색버튼 클릭
function fn_search(){
    var searchSido = $("#searchSido").val();
    var searchSigungu = $("#searchSigungu").val();
    var searchDetail = $("#searchDetail").val();
    var searchBuldNm = $("#searchBuldNm").val();

    if(searchSido == ""){
        alert("시/도를 선택해주세요.");
        $("#searchSido").focus();
        return;
    }

    if(searchSigungu == ""){
        alert("시/군/구를 선택해주세요.");
        $("#searchSigungu").focus();
        return;
    }

    $.ajax({
        url:'/mpis/pub/eai/list/parking2.do',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType:'json',
        data:"&searchSido=" + searchSido + "&searchSigungu=" + searchSigungu + "&searchDetail=" + searchDetail + "&searchBuldNm=" + searchBuldNm,
        type:"post",
        success:function(rsData){
            closeInfowindow();
            positions = [];
            rcvData = rsData.list;
            var cnt = 0;

            $(rcvData).each(function(){
                $(this).each(function(idx){
                    var text;
                    var textarr;
                    if(this.text != "" && this.text != undefined){
                        text = this.text;
                        textarr = text.split('|');
                    }
                    infoLayer = '';
                    /* if(this.text != "" && this.text != undefined){
                        infoLayer += '<div class="layer_info" style="height:'+Number(Number(230)+Number(textarr.length*10))+'px;">';
                    }else{
                        infoLayer += '<div class="layer_info" style="height:230px;">';
                    }
                    infoLayer += '	<h3><span class="layer_info_tit">'+ nullStr(this.buldNm) +'</span><span class="layer_info_top"><a href="javascript:closeInfowindow();"><img src="/mpis/images/ico_close.png"></a></span></h3>';
                    infoLayer += '	<div class="layer_info_detail">';
                    infoLayer += '		<ul>';
                    infoLayer += '			<li>주소 : '+ nullStr(this.rdnmadr) +'</li>';
                    infoLayer += '			<li>기계식주차장 이용가능 대수 : '+ nullStr(this.totCnt) +'</li>';
                    if(this.noInspChk == "이용가능"){
                        infoLayer += '			<li>이용가능여부 : <span style="color:#0e66a9;">'+ nullStr(this.noInspChk) +'</span></li>';
                    }else{
                        infoLayer += '			<li>이용가능여부 : <span style="color:red;">'+ nullStr(this.noInspChk) +'</span></li>';
                    }
                    $(textarr).each(function(idx2){
                        if(idx2 == 0){
                            infoLayer += '			<li>주차가능차량 제원 : '+nullStr(textarr[idx2])+'</li>';
                        }else{
                            infoLayer += '			<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp'+nullStr(textarr[idx2])+'</li>';
                        }
                    });
                    infoLayer += '			<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp(길이×너비×높이)</li>';
                    infoLayer += '			<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<span style="color:red;">*이하의 차량만 수용가능</span></li>';
                    infoLayer += '		</ul>';
                    infoLayer += '	</div>';
                    infoLayer += '</div>'; */

                    if(this.text != "" && this.text != undefined){
                        infoLayer += '<div class="layer_info" style="height:'+Number(Number(350)+Number(textarr.length*20))+'px;width:460px;">';
                    }else{
                        infoLayer += '<div class="layer_info" style="height:350px;width:460px;">';
                    }
                    infoLayer += '	<h3><span class="layer_info_tit">'+ nullStr(this.buldNm) +'</span><span class="layer_info_top"><a href="javascript:closeInfowindow();"><img src="/mpis/images/ico_close.png"></a></span></h3>';
                    infoLayer += '	<div class="layer_info_detail" style="padding:0px 8px;">';
                    infoLayer += '		<div class="table-type_pp01_parking" style="border-top:0px;">';
                    infoLayer += '			<table style="width:430px;">';
                    infoLayer += '				<colgroup>';
                    infoLayer += '					<col width="27%">';
                    infoLayer += '					<col width="33%">';
                    infoLayer += '					<col width="40%">';
                    infoLayer += '				</colgroup>';
                    infoLayer += '				<tr>';
                    infoLayer += '					<td colspan="3" style="font-size:20px;">'+ nullStr(this.rdnmadr) +'</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '				<tr>';
                    if(this.noInspChk == "이용가능"){
                        infoLayer += '					<td rowspan="2" style="text-align:center;"><img src="/mpis/images/parking_ok.png" style="width:53px;height:57px;font-size:17px;"><br/>이용가능</td>';
                    }else{
                        infoLayer += '					<td rowspan="2" style="text-align:center;font-size:12px;"><img src="/mpis/images/parking_no.png" style="width:53px;height:57px;"><br/>일부 이용가능<br/>또는 불가능</td>';
                    }
                    infoLayer += '					<td style="font-size:17px;">주차가능대수</td>';
                    infoLayer += '					<td style="font-size:17px;">'+ nullStr(this.totCnt) +'</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '				<tr>';
                    infoLayer += '					<td style="font-size:17px;">관리인</td>';
                    infoLayer += '					<td style="font-size:17px;">'+ nullStr(this.eduPerson) +'</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '				<tr>';
                    infoLayer += '					<td style="font-size:17px;">주차가능<br/>차량제원</td>';
                    infoLayer += '					<td colspan="2" style="font-size:17px;">';
                    $(textarr).each(function(idx2){
                        if(idx2 == "0"){
                            infoLayer += '						'+nullStr(textarr[idx2])+'kg 이하';
                            infoLayer += '						<br/>(길이×너비×높이, 중량)';
                        }else{
                            infoLayer += '						<br/>'+nullStr(textarr[idx2])+'kg 이하';
                            infoLayer += '						<br/>(길이×너비×높이, 중량)';
                        }
                    });
                    infoLayer += '					</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '				<tr>';
                    infoLayer += '					<td colspan="4">제공된 정보는 주차장 여건에 따라 차이가 있을 수 있습니다.</td>';
                    infoLayer += '				</tr>';
                    infoLayer += '	</div>';
                    infoLayer += '</div>';

                    positions.push({"content":infoLayer, "latlng":new daum.maps.LatLng(this.localY, this.localX), "buldSn":this.buldSn, "cnt":cnt, "x":this.localX, "y":this.localY});
                });
                cnt++;
            });
            setMarker();

            setSearchList( rsData.list );
            moveSearchMap1();
        },
        error:function(xhr, status, error){
            alert(error);
        }
    });
}

// 검색목록 세팅
function setSearchList( jsonData ){
    var pList = "";
    var cnt = 0;
    var buldsn = "";
    $(jsonData).each(function(){
        $(this).each(function(idx){
            if(cnt==0){
                buldsn = this.buldSn;
            }
            pList += "<section id='tab_"+cnt+"' tabindex='"+cnt+"'>";
            pList += "	<h1 id='h1id_"+cnt+"'>";
            pList += "	<span class='acc_img'><div id='sectionid_"+cnt+"'></div><img src='/mpis/images/arrowSprite.png' class='closed'></span>";
            pList += "	<span class='acc_tit' onclick=\"findPoint('"+this.localX + "', '" + this.localY + "', '"+this.buldSn+"','"+cnt+"');\"> " + nullStr(this.buldNm) + "</span> ";
            pList += "	</h1>";
            pList += "	<p id='pid_"+cnt+"' style='padding:0px;'>";
            pList += "		<span style='padding:10px;'><em class='acc_dot'></em><span class='acc_sub'><a href=\"javascript:findLoadMd('" + nullStr(this.rdnmadr) + "', '" + this.localY + "', '" + this.localX + "');\">길찾기</a></span></span>";
            pList += "		<span id='eqpinfo"+cnt+"'></span>";
            pList += "	</p>";
            pList += "</section>";
        });
        cnt++;
    });

    $(".p_search_all_list").html( pList );

    accordion.init("accordion");

    setBuldinfo(buldsn,0);
}

// 검색된 주차장 클릭
function findPoint(fX, fY, sn, idx){
    setBuldinfo(sn,idx);

    var locPosition = new daum.maps.LatLng(fY, fX);
    var normalImage = createMarkerImage(new daum.maps.Size(31, 42),1);//기본
    var clickImage = createMarkerImage(new daum.maps.Size(31, 42),2);//클릭

    fY = Math.round(fY*1000000000)/1000000000;
    fX =  Math.round(fX*1000000000)/1000000000;

    // 지도 중심좌표를 클릭위치로 변경
    map.setCenter(locPosition);

    closeInfowindow();

    $(markers).each(function(idx){

        var gps = this.getPosition();
        var localY = Math.round(gps.getLat()*1000000000)/1000000000;
        var localX = Math.round(gps.getLng()*1000000000)/1000000000;

        if(fY == localY && fX == localX){
            infowindows[idx].open(map, this);

            // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
            // 마커의 이미지를 클릭 이미지로 변경합니다
            if (!selectedMarker || selectedMarker !== markers[idx]) {
                // 클릭된 마커 객체가 null이 아니면
                // 클릭된 마커의 이미지를 기본 이미지로 변경하고
                !!selectedMarker && selectedMarker.setImage(normalImage);

                markers[idx].setImage(clickImage);
            }

            // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
            selectedMarker = markers[idx];
        }
    });
}

function setBuldinfo(sn, idx){
    var infoLayer = "";
    $.ajax({
        url:'/mpis/pub/eai/list/buldinfo.do',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType:'json',
        data:"buldSn=" + sn,
        type:"post",
        success:function(rsData){
            setEqpList( rsData.eqpList,idx );
        },
        error:function(xhr, status, error){
            alert(error);
        }
    });

}

function setEqpList( jsonData, num){
    var infoLayer = "";
    var cnt = 0;
    $(jsonData).each(function(){
        cnt++;
        $(this).each(function(idx){
            infoLayer += '<div class="layer_info_1" id="layer_info_'+num+'_'+cnt+'">';
            infoLayer += '	<h3><span class="layer_info_1_tit" onclick=\"clickeqp('+num+','+cnt+')\">'+cnt+'호기 ('+this.noInspChk+')</span></h3>';
            infoLayer += '	<div class="layer_info_1_detail" id="layer_info_1_detail_'+num+'_'+cnt+'" style="display:none;">';
            infoLayer += '		<ul>';
            infoLayer += '			<li>종류 : '+ nullStr(this.eqpTy) +'</li>';
            infoLayer += '			<li>대수 : '+ nullStr(this.totNoh) +'</li>';
            infoLayer += '			<li>설치일 : '+ nullStr(this.useInspDd)+' </li>';
            infoLayer += '			<li>검사일 : '+ nullStr(this.inspDd)+' </li>';
            infoLayer += '			<li>검사결과 : '+ nullStr(this.inr)+' </li>';
            infoLayer += '		</ul>';
            infoLayer += '	</div>';
            infoLayer += '</div>';
        });
    });

    $("#eqpinfo"+num).html(infoLayer);

    $(".layer_info_1").css({"height":"47px"});
    $("#layer_info_"+num+"_1").css({"height":"170px"});
    $("#layer_info_1_detail_"+num+"_1").css({"display":"block"});
}

// 다음 길찾기 페이지로 이동
function findLoadMd(nm, X, Y){
    if(isMobile){
        getNavi(nm, Y, X);
    }else{
        var daumWindow = window.open("about:blank");
        daumWindow.location.href = "http://map.daum.net/link/to/" + nm + "," + X + "," + Y;
    }
}

function moveSearchMap(){
    var sido = $("#searchSido option:selected").text();
    var sigungu = $("#searchSigungu option:selected").text();
    var detail = $("#searchDetail").val();

    var addr = sido + " " + sigungu + " " + detail;

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new daum.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(addr, function(result, status) {

        // 정상적으로 검색이 완료됐으면
        if (status === daum.maps.services.Status.OK) {

            var coords = new daum.maps.LatLng(result[0].y, result[0].x);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);

            fn_getMapInfo();
        }
    });
}

function moveSearchMap1(){
    var sido = $("#searchSido option:selected").text();
    var sigungu = $("#searchSigungu option:selected").text();
    var detail = $("#searchDetail").val();

    var addr = sido + " " + sigungu + " " + detail;

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new daum.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(addr, function(result, status) {

        // 정상적으로 검색이 완료됐으면
        if (status === daum.maps.services.Status.OK) {

            var coords = new daum.maps.LatLng(result[0].y, result[0].x);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);

            //fn_getMapInfo();
        }
    });

}

function nullStr( val ){
    if(val == undefined || val == "null" || val == "undefined" || val == "-"){
        val = "-";
    }
    return val;
}

function clickeqp(num, cnt){
    $(".layer_info_1").css({"height":"47px"});
    $("#layer_info_"+num+"_"+cnt).css({"height":"170px"});
    $(".layer_info_1_detail").css({"display":"none"});
    $("#layer_info_1_detail_"+num+"_"+cnt).css({"display":"block"});
}
