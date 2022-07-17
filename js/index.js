$(document).ready(function(){

/* 햄버거메뉴 /////////////////////// */
  $(".menu_toggle").click(function(){
    $(this).toggleClass("menu-open");
    $(".allmenu").slideToggle("fast");

  });

/* ///////////Main VisualImage/////////// */

let img=$(".mainvisual ul li");
let btn=$(".mainvisual .btn>span");	
let oldidx=0;  //기존이미지
let idx=0;   //새로 바뀌는 이미지
let img_n= img.length;  //1,2,3...개수를 세어서 변수에 저장한다.

	//미지와 버튼이 바뀌는 함수
	function changeImg(idx){  //매개변수가 있는 함수-->idx는 선택되는 이미지

		if(oldidx!=idx){ //기존의 이미지와 선택된 이미지가 다를때...

			btn.eq(oldidx).removeClass("active"); //기존 하단버튼 비활성화->active 클래스를 삭제함
			btn.eq(idx).addClass("active"); //선택된 하단버튼 활성화->active 클래스를 불러냄	
			img.eq(oldidx).stop(true,true).fadeOut(300);  //기존 이미지	사라짐
			img.eq(idx).stop(true,true).fadeIn(300); //선택된 이미지 나타남
			
		}
		oldidx=idx; //선택된 이미지는 다시 기존이미지로 저장되어서 Fade Out...
	}

	//자동함수 생성
	function changeAuto(){
		idx++;

		//선택한 이미지가 마지막일때 다시 처음 이미지부터 시작
		if(idx>img_n-1){ //index는 0부터 시작하고 length는 1부터 시작하므로 1을 빼주어야 마지막 숫자가 맞음
		  idx=0;
		}
		changeImg(idx);

	}

	timer=setInterval(changeAuto,4000);  //4초 간격으로 함수를 자동재생

	/*자동으로 롤링되는 순간 버튼을 클릭할때 동시에 움직여서 충돌이 날수 있음
	->모든 버튼을 클릭할때는 자동으로 이미지가 바뀌는 함수를 잠시 멈추어야 함.*/
	
	//하단버튼 클릭시.....
	btn.click(function(){

		clearInterval(timer); //버튼클릭시 자동함수 해지 ->clearInterval(변수);
    $(".play").hide();
    $(".stop").show();

		idx=$(this).index();  //0,1,2...
		changeImg(idx);
		timer=setInterval(changeAuto,4000); //버튼을 클릭안할때는 다시 함수 자동재생

	});


//Play,Stop 클릭
$(".play").hide();  //처음에는 Stop버튼은 보이게 하기위해 Play버튼은 숨김

$(".stop").click(function(){
  clearInterval(timer);
  $(".stop").hide();
  $(".play").show();
});
$(".play").click(function(){
  timer=setInterval(changeAuto,4000);
  $(".play").hide();
  $(".stop").show();
});


//하단퀵메뉴
//퀵메뉴 이미지오버
$(".quick_icon>li").hover(function(){
  num=$(this).index()+1; //전역변수
  $(this).find(">a>img").attr({"src":"image/rquick_on_0"+num+".png"})

},function(){
  $(this).find(">a>img").attr({"src":"image/rquick_0"+num+".png"})
});


//animate부분(close/open)
qchk=true;
$(".triangle-up").click(function(){
  
  $(this).toggleClass("quick_open");

if(qchk){
  /* $(this).addClass("quick_open");  //open이미지 불러옴 */ //toggle로대체가능!
  $(this).stop().animate({marginBottom:"-120px"},500); //close버튼 오른쪽으로 이동
  $(".quickmenu").stop().animate({marginBottom:"-120px"},500); //퀵메뉴 오른쪽으로 이동
  qchk=false;

}else{
  /* $(this).removeClass("quick_open");  //open이미지 삭제 */ //toggle로대체가능!
  $(this).stop().animate({marginBottom:"0px"},500); //close버튼 원래 위치로 이동
  $(".quickmenu").stop().animate({marginBottom:"0px"},500); //퀵메뉴 원래 위치로 이동
  qchk=true;
}

});

//푸터 패밀리사이트
$(".familybox").click(function(){
	$(".familybox>ul").stop().slideToggle();
	
})

/* /////////////////////////////서브///////////////////////////// */

$(".header-navi").mouseenter(function(){ //주메뉴영역에 오버시
	$(this).find("li>ul").stop().slideDown(800,"easeOutBounce");
	$(".bg_box").stop().slideDown(800,"easeOutBounce");

});

$("header").mouseleave(function(){ //헤더영역을 나갔을때
	$(this).find("li>ul").stop().slideUp();
	$(".bg_box").stop().slideUp();

});

/* __________________SEOULSKY 소개_________________ */


$("dl dt").click(function(){

  $("dl dt").find("+dd").stop().hide("fast"); //기존에 보이는것은 다른것 선택할때 올라가게
  $(this).find("+dd").show("fast"); //tab2에서 slide-> show,hide로만 바꿈

  $("dt").removeClass("selected"); 
  $(this).addClass("selected"); 
});	

//탭메뉴 dt를 클릭시 바뀌는 dl의 전체배경이미지
$("dl .tab1").click(function(){
  $("dl").css({"background":"url(image/skyfriends1.png) no-repeat center center","transition":"all 1s","background-size":"contain"});
});

$("dl .tab2").click(function(){
  $("dl").css({"background":"url(image/skyfriends2.png) no-repeat center center","transition":"all 1s","background-size":"contain"});
});

$("dl .tab3").click(function(){
  $("dl").css({"background":"url(image/skyfriends3.png) no-repeat center center","transition":"all 1s","background-size":"contain"});
});

$("dl .tab4").click(function(){
  $("dl").css({"background":"url(image/skyfriends4.png) no-repeat center center","transition":"all 1s","background-size":"contain"});
});

/* $(".skyfriends dl dt a").on("click",function(event){
  event.preventDefault();
  }); */


/* __________________갤러리_________________ */

//썸네일, 큰이미지, 설명텍스트가 바뀌는 함수만들기

let goldidx=0; // 기존이미지
let gidx=0; //선택되는 이미지

function galleryImg(gidx){ //gidx는 선택되는 이미지

if(goldidx!=gidx){ //기존의 이미지와 선택된 이미지가 다를때만 실행해라..}

  $(".thumbs li").eq(goldidx).css({"opacity":0.4}); //기존의 썸네일 흐리게
  $(".thumbs li").eq(gidx).css({"opacity":1}); //선택된 썸네일 선명하게
  $(".largeImg li").eq(goldidx).stop().fadeOut(300); //기존 이미지 사라짐
  $(".largeImg li").eq(gidx).stop().fadeIn(300); //선택된 이미지 나타남
  $(".imgText li").eq(goldidx).stop().fadeOut(300); //기존 텍스트 사라짐
  $(".imgText li").eq(gidx).stop().fadeIn(300); //선택된 텍스트 나타남

}
goldidx=gidx; //선택된 이미지는 다시 기존이미지로 저장

}

//썸네일버튼 클릭시....

$(".thumbs li").click(function(){
  gidx=$(this).index();
  galleryImg(gidx);
});



//이전버튼 클릭시....

$(".left_btn").click(function(){
  gidx--;
  if(gidx<0){ //선택한 이미지가 0일때 다시 맨뒤부터 다시 시작
    gidx=8;
  }
  galleryImg(gidx);
});



//다음버튼 클릭시....

$(".right_btn").click(function(){
  gidx++;
  if(gidx>8){ //선택한 이미지가 마지막일때 다시 맨처음부터 다시 시작
    gidx=0;
  }
  galleryImg(gidx);
});

/* __________________어트랙션_________________ */


$(".tab li").click(function(){

  val=$(this).index();
  tnum=+200*val; //가로폭 120px씩 증가됨

  $(".tab-header .tab-highlight").animate({left:tnum});
  $(".tab li a").css("color","#000"); //탭의 모든 글자색
  $(this).find(">a").css({"color":"#fff"}); //선택된 탭의 글자색

  $(".panel li").hide(); //기존의  보여진 내용 숨기기
  $($(this).find(">a").attr("href")).fadeIn(); //새로 선택된 내용 href 연결된 내용 보여주기



});



























  
});