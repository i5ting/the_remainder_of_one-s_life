/**
 * Created by hulanlan656 on 2014/8/26.
 */
function resultBack(attr,sex,dataJson,data,birthStr){
	var myDate = new Date();
	var timeRub = myDate.getTime();	
	var resultScore = 0;
	var perpleLeft = 0;
	var shareTxt = "";
	var topicResult = $(".topic-result"); 
	var minElement = 0;
	var result = '';
	var topicAmount = attr.length-1;
	var currentDay = new Date();
	var birthDate = new Date(birthStr),
		birthYear = birthDate.getFullYear(),
		birthMonth = birthDate.getMonth()+1,
		birthDay = birthDate.getDay();
	if(sex == 0){
		resultScore = 86;
	}else {
		if(attr[0]==3){
			resultScore = 86;
		}else{
			resultScore = 89;
		}
	}	
	for (var i = 0; i < topicAmount-1; i++) {
		resultScore = resultScore + parseInt(attr[i]);
	}	
	var liveDate =  currentDay.getTime() - birthDate.getTime();			
	// 计算出相差天数
	var liveDay = Math.floor(liveDate / (24 * 3600 * 1000));
	//计算数了百分比
	var livePercent =  Math.round((liveDay / (resultScore * 365))*100);

	if(attr[topicAmount] =="A"){
		minElement = 0;
	}else if(attr[topicAmount] =="B"){
		minElement = 1;
	}else if(attr[topicAmount] =="C"){
		minElement = 2;
	}else{
		minElement = 3;
	}
	var resultNum = data[0].manTest[1].resultText[minElement];			
	result = "<div class='test-result'><div class='result-title'><img src='img/result_bg.png' /><h4>您的寿命约为"+ resultScore + "岁</h4></div>";
	result += "<div id='timer'></div>";
	result += "<div id='result-progress'><div class='people'></div><div class='progress'><div class='progress-percent'></div></div><div>您的人生度过了"+ livePercent +"%</div></div>";
	result += "<div>"+ resultNum.resultText +"</div>";
	result += "<div class='f-tc'><a id='resetBtn' class='result-btn result-btn-grey'>重测一次</a><a class='return-share result-btn'>分&nbsp;&nbsp;&nbsp;&nbsp;享</a></div></div>";
	result += "<div class='result-down'><a class='app-btn' onclick='_hmt.push(['_trackEvent', '软件', '下载'])'><img src='img/download_btn.png?v20150114' /></a></div>";
	result += "<div class='u-cartoon'><img src='../common/img/cartoon.png?v20150114' /></div>";
	topicResult.removeClass("display-none").siblings().addClass("display-none");
	topicResult.append(result);
	loadjscssfile("http://apps.jk.cn/downloadpage/releases/211/config/config.js?" + timeRub,"js");
	setTimeout(function () {
		$("#resetBtn").attr("href","forum9_index.html");
		$(".return-share").attr("id","transpondBtn");
	}, 1000);
	var amountWidth = $(".progress").width();
	if(livePercent >=100){
		perpleLeft = amountWidth - 10;
		shareTxt = "连计算器都崩溃啦，颤抖吧人类！";
	}else if(livePercent <= 0){
		perpleLeft = 0;
		shareTxt = "你的呢?";
	}else{
		perpleLeft = amountWidth * livePercent/100 - 10;
		shareTxt = "你的呢?";
	}
	$(".progress-percent").css("width",livePercent/100*amountWidth);
	$(".people").css("margin-left",perpleLeft);
	$("#timer").each(function(){
		var _this = $(this);
		//var _text = _this.text();
		var scoreDate = birthYear + resultScore +"/"+birthMonth+"/"+birthDay;
		var _id =_this.attr("id");
		var timeCount=new TimeCounter(_id);
		var date = new Date(scoreDate);
		timeCount.startclock(date);
	});
	resultShare(resultScore,livePercent,shareTxt);	
}