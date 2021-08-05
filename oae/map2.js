/*
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>지도</title>
    <style>
        /!*  주차마크공간 css *!/
        #mapwrap{position:relative;overflow:hidden;}
        .category, .category *{margin:0;padding:0;color:#000;}
        .category {position:absolute;overflow:hidden;top:145px;left:10px;width:150px;height:50px;z-index:10;
        border:1px solid black;font-family:'Malgun Gothic','맑은 고딕',sans-serif;font-size:12px;text-align:center;background-color:#fff;}
        .category .menu_selected {background:#FF5F4A;color:#fff;border-left:1px solid #915B2F;border-right:1px solid #915B2F;margin:0 -1px;}
        .category li{list-style:none;float:left;width:50px;height:45px;padding-top:5px;cursor:pointer;}
        .category .ico_comm {display:block;margin:0 auto 2px;width:22px;height:26px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png') no-repeat;}
        .category .ico_coffee {background-position:-10px 0;}
        .category .ico_store {background-position:-10px -36px;}
        .category .ico_carpark {background-position:-10px -72px;}

        /!*  좌표주소 css *!/
        /!* .map_wrap {position:relative;width:100%;height:350px;} *!/
        .title {font-weight:bold;display:block;}
        .hAddr {position:absolute;left: 50%; transform: translateX(-50%); top: 91px;color: #f3f3f3; border-radius: 2px;background:#fff;background:rgb(75 75 75 / 80%);z-index:1;padding:5px;}
        #centerAddr {display:block;margin-top:2px;font-weight: normal;}

        .bAddr {padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
        /!* 상세주소 *!/
        .hAddr_detail {position:absolute; height:100px; top: 239px;color: #f3f3f3;  border-radius: 2px;background:#fff;background:rgb(75 75 75 / 80%);z-index:1;padding:5px;}
        .title_detail {font-weight:bold;display:block;}

        /!* fadeIn 변수  *!/
        @keyframes fadeIn{
        from{opacity: 0; transform: translateY(20px);}
        to{opacity: 3; transform: none;}
    }

        /!* 세부 내용 *!/
        .dtladdress{position: fixed;width:100%; background:white; height:212px; bottom: -200px; z-index: 99999; transition:all .35s;}

        /!*      .dtladdress:active { position: relative; top:-60%;  z-index: 99999;  height: 400px; animation-name: fadeIn; animation-duration: 3s;
        animation-iteration-count: 3; animation-timing-function: ease; transition: all 0.3s; }  *!/

        /!*  @keyframes clickEffect{ 0%{postition:absolute;width:100%; background:white; }
        100%{ position: relative; top:-60%;  z-index: 99999;  height: 400px; animation-name: fadeIn; animation-duration: 3s;
        animation-iteration-count: 3; animation-timing-function: ease; transition: all 0.3s; } }*!/
    </style>

    <script type="text/javascript"
            src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=7c8813225e2ee056ab75aed39e98847d&libraries=services,clusterer,drawing"></script>
    <script src="http://developers.kakao.com/sdk/js/kakao.min.js"></script>
    <link rel="stylesheet"
          href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script
        src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <body style="margin: 0px; padding: 0px;">
    <!--   <input type='BUTTON' value=" 창닫기" onClick='self.close()'> -->


    <!-- 지도가 표시될 div // currentMap-->
    <div id="currentMap" style="position:relative; width:100%; height: calc(100vw);">
        <div id="map" style="postition:relative; overflow:hidden; width:100%;height:100%;">
            <div class="dtladdress" id="dtladdress">
                <div class=dtadrs>
                    <table style="height: 100%; width: 100%; text-align: center; border-bottom: 1px solid;">
                        <colgroup>
                            <col width="27%">
                                <col width="33%">
                                    <col width="40%">
                        </colgroup>
                        <tr>
                            <td colspan="3" style="font-size:20px;" id="info_ranmadr"></td>
                        </tr>
                        <tr >

                            <td rowspan="3" style="text-align:center;"><img src="/parking_ok.png" style="width:53px;height:57px; font-size:17px;"><br/>이용가능</td>
                        </tr>
                        <tr>
                            <td style="font-size:17px;">주차가능대수</td>
                            <td colspan="2" style="font-size:17px;" id="info_totCnt"></td>
                        </tr>
                        <tr>
                            <td style="font-size:17px;">관리인</td>
                            <td style="font-size:17px;" id="info_eduPerson">eduPerson<hr></td>
                        </tr>
                        <tr>
                            <td style="font-size:17px;">주차가능차량제원</td> <!-- <br/> -->
                            <td colspan="2" style="font-size:17px;" id="info_text">"kg 이하</br>(길이×너비×높이, 중량)</td>
                    </tr>
                    <tr>
                        <td colspan="4">제공된 정보는 주차장 여건에 따라 차이가 있을 수 있습니다.</td>
                    </tr>
                </table>
                <!-- 	<li id="infotest"></li>
                    <li id="infotest_hp"></li>
                    <li id="infotest_adrs"></li>  -->
            </div>
            <div style="display:grid; width: 100%;grid-template-columns: auto auto auto ;column-gap: 10px;">
                <!-- <div class="touch" style="grid-template-columns: auto auto auto ; "> -->
                <button id="info_call"></button>
                <button></button>
                <button></button>
                <!-- 	</div> -->
            </div>
        </div>
    </div>

    </div>
    <script>

        /!*
        var detailAdd = marker.info; *!/

        var bgMapCont = document.getElementById('map');
        var options = {
        center: new kakao.maps.LatLng(37.566124, 126.998995),
        level: 3
    };
        var mapApi = new kakao.maps.Map(bgMapCont , options);



        // 마우스 S드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        daum.maps.event.addListener(mapApi, 'dragend', function() {
        fn_getMapInfo();
    });

        // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
        daum.maps.event.addListener(mapApi, 'zoom_changed', function() {
        fn_getMapInfo();
    });

        function fn_getMapInfo(){
        // 지도 레벨
        var currLevel = mapApi.getLevel();
        positions = [];
        // 지도 중심좌표를 얻어옵니다
        var latlng = mapApi.getCenter();
        // 지도의 현재 영역을 얻어옵니다
        var bounds = mapApi.getBounds();
        // 영역의 남서쪽 좌표를 얻어옵니다
        var swLatLng = bounds.getSouthWest();
        // 영역의 북동쪽 좌표를 얻어옵니다
        var neLatLng = bounds.getNorthEast();


        //searchParkingList(swLatLng, neLatLng);
        //searchParkingList(swLatLng.getLng(),swLatLng.getLat(), neLatLng.getLng(), neLatLng.getLat() );
        getParkginSearch(0,0);
    }

        function getParkginSearch ( topleft, bottomright ){

        var infoLayer = {};
        infoLayer.jsonUrl = "/mpis/pub/eai/list/box2.do";
        infoLayer.sGpsX = "126.99584632422851";
        infoLayer.eGpsX = "127.00211667363638";
        infoLayer.sGpsY = "37.55929372909084";
        infoLayer.eGpsY = "37.56717750215049";

        $.ajax({
        url: '/mpis/getMpisData2.do',
        async:true,// false 일 경우 동기 요청으로 변경
        type:'POST', // GET, PUT
        data: infoLayer,// 전송할 데이터
        dataType:'text',// xml, json, script, html
        beforeSend:function(jqXHR) {},// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success:function(jqXHR) {
        drawMaker(jqXHR);



    },// 요청 완료 시
        error:function(jqXHR) {},// 요청 실패.
        complete:function(jqXHR) {}// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });
    }
        var markerImage,
        selectedMarker = null; // 클릭한 마커를 담을 변수
        var markerList=[];

        /!* $('#dtaddress').click(function () {
        $('#dtaddress').marker.info(buldNm);

    }); *!/

        function drawMaker(position){
        var list = JSON.parse(position);

        clearMarker();
        //$("#dtladdress").children().remove();


        $.each(list.list, function(i, item){

        var markerPosition  = new kakao.maps.LatLng(item.localY, item.localX );

        var normalImage = createMarkerImage(1);//기본

        var marker = new kakao.maps.Marker({
        position: markerPosition,  	//카카오좌표
        image: markerImage
    });

        var infowindow = new kakao.maps.InfoWindow({
        content: item.localX // 인포윈도우에 표시할 내용
    });
        //	clearMarker();
        // 마커 객체에 마커아이디와 마커의 기본 이미지를 추가합니다
        //  marker.normalImage = normalImage;

        marker.info = item;

        marker.setMap(mapApi);
        markerList.push(marker);

        kakao.maps.event.addListener(marker, 'click', function(){   //마커 클릭시 이벤트
        console.log(marker.info);
        //		$('#dtaddress').marker.info(buldNm);					// 여기다가 올라오는 액션의 메서드를 가져와야함

        $("#info_buldSn").html(item.buldSn); 		//우편번호?
        $("#info_cttpMnNo").html(item.cttpcMnNo); 	//전화번호
        $("#info_ranmadr").html(item.rdnmadr);		//주소
        $("#info_nolnspChk").html(item.nolnspChk);  //이용여부
        $("#info_eduPerson").html(item.eduPerson);	//관리인여부 유 무
        $("#info_totCnt").html(item.totCnt); 		// 주차가능수
        $("#info_text").html(item.text); 			//text


        markerSlide("click", [{marker:marker}]);
        //$("#dtladdress").trigger("click", [{marker:marker}]);
        // $("#dtladdress").trigger("click", [{marker:marker}]);
    } );
    });
    }

        /!* 	var imageSrc_on = '/ico_parking_orange.png',
        imageSrc = '/ico_parking_blue.png', // 마커이미지의 주소입니다     모듈만들고
        imageSize = new kakao.maps.Size(23, 30); // 마커이미지의 크기입니다
        *!/
        function markerSlide(data){
        var normalImage = createMarkerImage(1);//기본
        var clickImage = createMarkerImage(2);

        if(!selectedMarker || selectedMarker !== marker){	// 마커가 첫클릭이라면
        !!selectedMarker && selectedMarker.setImage(normalImage);  	  	// 클릭된 마커 객체가 null이 아니면 클릭된 마커의 이미지를 기본 이미지로 변경하고
        marker.setImage(clickImage);							// 주황색으로 변경해주고
        $('.dtladdress').css({"bottom" : "0", "transition":"all .35s"}); 	//슬라이더가 올라오고
    }else{		// 마커가 첫클릭이 아니라면
        if(LayerPopup.has(e.target).length === 0){
        $('.dtladdress').css({"bottom" : "-212px", "transition":"all .35s" }); //슬라이더가 내려가고
        LayerPopup.removeClass('.dtladdress');   // 비워주고
        !!selectedMarker && selectedMarker.setImage(normalImage);  	  	// 클릭된 마커 객체가 null이 아니면 클릭된 마커의 이미지를 기본 이미지로 변경하고
    }
    }   // 마커가 두번째 클릭이라면
        selectedMarker = marker;
    }

        /!* 마커 클릭시 슬라이더 올리기  *!/
        /!* 		$("#dtladdress").on("click", function(e, data ){	//#dtladdress
        $('.dtladdress').css({"bottom" : "0", "transition":"all .35s"});
    });

        $('#info_call').on('click', function(e){
        console.log(e);

    }); *!/
        /!* 마커 클릭안했을시 닫아주기 *!/
        /!* 	 $('#map').mouseup(function(e){
        var LayerPopup = $('.dtladdress');
        if(LayerPopup.has(e.target).length === 0){
        $('.dtladdress').css({"bottom" : "-212px", "transition":"all .35s" });

        marker.setImage(normalImage);
        LayerPopup.removeClass('.dtladdress');
    }
    }); *!/

        function createMarkerImage(chk) {
//		var markerImage,
        var	imageSrc_on = '/ico_parking_orange.png',
        imageSrc = '/ico_parking_blue.png', // 마커이미지의 주소입니다     모듈만들고
        imageSize = new kakao.maps.Size(23, 30); // 마커이미지의 크기입니다

        if(chk == 1){
        markerImage = new kakao.maps.MarkerImage(
        imageSrc, // 스프라이트 마커 이미지 URL
        imageSize, // 마커의 크기
    {}
        );
    }else{
        markerImage = new kakao.maps.MarkerImage(
        imageSrc_on, // 스프라이트 마커 이미지 URL
        imageSize, // 마커의 크기
    {}
        );
    }

        return markerImage;
    }




        function nullStr(val) {
        if(val == undefined || val == "null" || "undefined" || val == "-"){
        val = "-";
    }
        return val;
    }


        // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 여기에 만든 모듈 넣기



        function clearMarker(){
        // if($(marker.setImage)=='clickImage'){
        //	 continue;
        // }else {
        $(markerList).each(function(idx){
            //	console.log(this.info );
            this.setMap(null);
        });
        makerList =[];
        //		}
    }


        //적제가능한 수 구하는함수
        /!* 	$("#info_text").on("click", function(idx2){
        if(idx2 == "0"){
        item.text += ''+nullStr(textarr[idx2])+"kg 이하       (길이×너비×높이, 중량)";
    }else{
        item.text += '<br/>'+nullStr(textarr[idx2])+'kg 이하      (길이×너비×높이, 중량)';
    }
    }); *!/

        /!* $("#info_text").html(item.text).each(function(idx2) {
        if(idx2 == "0"){
        item.text += '						'+nullStr(textarr[idx2])+'kg 이하';
        item.text += '						<br/>(길이×너비×높이, 중량)';
    }else{
        item.text += '						<br/>'+nullStr(textarr[idx2])+'kg 이하';
        item.text += '						<br/>(길이×너비×높이, 중량)';
    }
    }); *!/


        /!*  if(!$('html').hasClass('.dtladdress')){
        $('.dtladdress').css({"bottom" : "-200px", "transition":"all .35s" });
    }  *!/

        // $('.dtladdress').addClass('.dtladdress:active');
        // $('.dtladdress').addClass('dtladdress');
        //  dtladdress($(this).attr('id'));
        //	 jQuery(this).addClass('dtladdress:active');
        // $(this).addClass("dtladdress:active");

        /!*  if($('#dtladdress').on("click", function(e){{
        $('.dtladdress').css({"bottom" : "0", "transition":"all .35s" ,"height":"200px"});
    };
    })); *!/

        /!* $('#map').on("click",function(e, data){

        if(!$(e.target).hasClass('.dtladdress')){
        $('.dtladdress').css({"bottom" : "-200px", "transition":"all .35s" });
    }
        if($(e.target).hasClass('.dtladdress')){
        $('.dtladdress').css({"bottom" : "0", "transition":"all .35s"});
    }
        console.log(data.marker.info);
    }); *!/




        /!* *!/
        /!* $('#map').click(function(e) {

        if(!$('#dtladdress').has(e.target).length)$('#dtladdress').hide();
    }); *!/

        /!* 	function clickEffect(e){
        var d=document.createElement(".dtladdress");
        d.className="clickEffect";
        d.style.top=e.clientY+"px";
        d.style.left=e.clientX+"px";
        document.body.appendChild(d);
        d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
    } document.addEventListener('click',clickEffect);
        *!/


        // $(#dtaddress).var()




        /!* html에 있는 ul *!/
        /!*
        function dtAddress () {

        var marker = document.createElement(marker.info, markerImage );

        var dtaddress = document.getElementById('#dtaddress');
        document.body.insertBefore(marker , dtaddress);	}
        *!/


    </script>

    <div
        style="position: absolute; padding: 10px; top: 10px; width: 100%; height: 40px; background-color: #aaa; z-index: 99999;">
        <input type="text" style="width: 100%; height: 20px;" id="searchKey">
            <a href="search.html" data-transition="flip"
               class="ui-btn ui-corner-all ui-shadow ui-btn-inline">page</a>
        </td>
    </div>

</body>
</html>
*/
