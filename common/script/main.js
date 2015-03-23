/**
 * Created by hulanlan656 on 2014/8/26.
 */
$(function(){
	var resultAttr = new Array();	
	var selectAttr = new Array();	
	var topicNum=0;	
	var clickNum = 0;
	var qBank,qSpeed = '';
	var topicTitle = $("#topic dt");
    var activate = ('createTouch' in document) ? 'touchend' : 'click';
	var touchstart = ('createTouch' in document) ? 'touchstart' : 'click'; 
	//appShare(appTit,appContent,appUrl,appPage);
    $(".topic-sel-btn a").live(activate, function(event) {
		var birthStr = $("#demo_date").val();
			var question;
			var sex = $(this).prop("name");
			var dataJson = $(this).prop("title");
            $.ajax({
                type:"GET",
                url: dataJson + "json.js",
                dataType: "json",
                success: function(data){
					clickNum++;
					if(clickNum <= 1){
						if(birthStr == ""){
							alert("请选择出生年月");
							clickNum = 0;
						}else{
							if(sex == 0){
								question = data[sex].manTest[0];
							}
							else if(sex == 1){								
								question = data[sex].femaleTest[0];
							}else {								
								question = data.manTest;
								qBank = "q_2_1_1";//默认起始题目
								qSpeed = eval('question.'+qBank);
								
							}
							var topicList = $(".topic-list");
								topicList.removeClass("display-none").siblings().addClass("display-none");
								topicList.find('a').addClass("display-none");
							if(question.length >0){
								topicTit(question[topicNum].title.titText,question[topicNum].title.titImg);
								var content = "<ul><li>";
								for(j=0; j<question[topicNum].answer.length; j++){
									content += "<a class='choice' name="+j+" score=" + question[topicNum].answer[j].score +">"+ question[topicNum].answer[j].select +"</a>";							
									$("#topic dd").html(content + "</li></ul>");
								}
								$(".amount").text(question.length);
								$(".current").text(topicNum+1);
								$("#topicSel a").live(touchstart, function(event) {
									$(this).addClass("active").siblings().removeClass("active");
								});
								$("#topicSel a").live(activate, function(event) {
									select = $(this).attr("score");
									selectAttr[topicNum] = $(this).attr("name");
									if(resultAttr[topicNum]!=""){
										resultAttr[topicNum] = select;
									}else{
										resultAttr[topicNum] = select;
									}
									var content = "<ul><li>";
									if(topicNum +1 < question.length) {
										topicNum++;	
										$(".current").text(topicNum+1);
										topicTit(question[topicNum].title.titText,question[topicNum].title.titImg);
										for(j=0; j< question[topicNum].answer.length; j++){										
											content += "<a class='choice' name="+j+" score=" + question[topicNum].answer[j].score +">"+ question[topicNum].answer[j].select +"</a>";							
											$("#topic dd").html(content + "</li></ul>");
										}	
										$('#topicSel a').each(function(index){
											if($(this).attr("name") == selectAttr[topicNum]){
												$(this).addClass("active");
											}
										})
									}else{
									//最后一题触发事件
										resultFun(birthStr,selectAttr,resultAttr,sex,dataJson,data);
									}
								});  																		
							}else{
								gotoQuestion(question,topicNum,qBank)
								//$(".current").text("第" + parseInt(topicNum+1) + "题");
								//$(".amount").text(resultScore);	
									$("#topic a").live(touchstart, function(event) {
										$(this).addClass("active").siblings().removeClass("active");
										$(".score-add").removeClass("a-fadeoutT");
									});
									$("#topic a").live(activate, function(event) {
										scoreAdd = $(this).attr("score");
										var	selectNum = $(this).attr("name");
										//resultScore = resultScore + qSpeed.answer[selectNum].income;
											topicNum++;
											qBank = qSpeed.answer[selectNum].next;
											if (typeof(qSpeed.answer[selectNum].rpEnding) == "undefined") {//判断该题是否有结果，如没有，跳下一题，
												resultBtn = false;
												qSpeed = eval('question.'+qBank);
												gotoQuestion(question,topicNum,qBank);											
											}else{//有结果，判断错误次数是否大于1，			
												resultNum = qSpeed.answer[selectNum].rpEnding;//取得第几套结果数
												resultBack(resultNum,data,sex);
											}

									}); 

							}
						}
					}else{return false;}					
                }
            })
    })	
	$("#transpondBtn").live("click",function(){
		$("#shareOverlay").show();
	});
	$('#shareOverlay').on('click', function(){
        $(this).toggle();
    });
})
/*列表页标题文字*/
function topicTit(titText,titImg){
	var topicTitle = $("#topic dt");
	if(titImg !== ""){
		var titCont = "<div><h4>" + titText + "</h4><img src=" + titImg + " />";
	}else{
		var titCont = "<div><h4>" + titText + "</h4>";
	}
	topicTitle.html(titCont);
}
/*结果*/
function resultFun(birthStr,selectAttr,resultAttr,sex,dataJson,data){
	var array = selectAttr; 
	var backReuslt = $("body").attr("name");
	if(backReuslt == "resultAmount"){//按选择项出现个数判断显示结果
		var count = 1;  
		var element= new Array();
		var sum = new Array();  
		for (var i = 0; i < array.length; i++){
			for(var j=i+1;j<array.length;j++){  
				if (array[i] == array[j]){  
					count++;  
					array.splice(j, 1);  
					j--;   
				}  
			}
			element[i] = array[i];
			sum[i] = count;
			count =1; 
		}  
		var newsum = new Array(); 
		for (var item in sum) {  
			newsum[item] = sum[item];  
		}  
		newsum.sort();
		var amount = '';
		var second = '';
		var fcount = 1;
		for (var i = 0; i < sum.length; i++) {  
			if (sum[i] == newsum[newsum.length - 1]) {  
				amount +=   element[i];
				fcount++;
			}   
		}  
		var minElement=0;
		if(fcount > 2){
			var first = amount[0];
			for(i=1;i<amount.length;i++){
				if(first<amount[i]){
					minElement=first;
				}else{
					minElement=amount[i];
				}
			}
		}else{
			minElement = amount;
		}
		resultBack(minElement,data,sex);//总选择个数多少结果分类显示(如果a最多，结果为a，b最多，结果为b，以此类推)
	}else if(backReuslt == "resultScore"){//按总分数大小判断显示结果	
		resultBack(resultAttr,sex,dataJson,data,birthStr);//总分类结果分类显示(如大于10,20,30或大于6,16,26)																		
	}	
}
function gotoQuestion(question,topicNum,qBank){
	var content = "";
	var qSpeed = eval('question.'+qBank);
	topicTit(qSpeed.title.titText,qSpeed.title.titImg);
	for(j=0; j< qSpeed.answer.length; j++){										
		content += "<a class='choice' name="+j+ ">"+ qSpeed.answer[j].title +"</a>";
		$("#topic dd").html(content);
	}	
}
//给app分享传输参数，ios只可传字符，andriod可传只个参数
//function appShare(appTit,appContent,appUrl,appPage){
//	var appTit = appTit,
//		appContent = appContent,
//		appUrl = appUrl,
//		appPage = appPage;
//	var theRequest = new Object();
//	var url=location.search;
//	if (url.indexOf("?") != -1) {
//		var str = url.substr(1);
//		strs = str.split("&");
//		for(var i = 0; i < strs.length; i ++) {
//		  theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
//		}
//	}
//	var pageUrl = theRequest.type;
//	var appResult = '"appTit":'+ '"' + appTit + '"' + ',' + '"appContent":' + '"' + appContent + '"' + ',' + '"appUrl":' + '"' + appUrl + '"' + ',' + '"appPage":' + '"' + appPage + '"';
//	if(pageUrl!="appPage"){
//		$(".result-down").show();
//		$(".return-share").show();
//		$(".topic-result").css("padding-bottom","60px");
//	}
//	window.location.href = 'pajk://share?content=' + '{' + appResult + '}';
//}