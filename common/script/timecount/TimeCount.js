TimeCounter = function(domId) {
	this.timnerID = null;
	this.timerRunning = false;
	this.end = null;
	this.showtimeFunction = this.showtime;
	this.domId = domId;
};

TimeCounter.prototype = {
	showtime : function() {
		var end = this.end;
		var domId = this.domId;
		var stopclockFunction = this.stopclock;
		this.timerID = setInterval(function() {
			try {
				var today = new Date();
				end.setHours(0);
				end.setMinutes(0);
				end.setSeconds(0);
				var date3 =  end.getTime() - today.getTime();
				
				// 计算出相差天数
				var days = Math.floor(date3 / (24 * 3600 * 1000));
				if (days <= 0) {
					$("#" + domId).html("连计算器都崩溃啦，颤抖吧人类！");
					return;
				}
				// 计算出小时数
				var leave1 = date3 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000));
				// 计算相差分钟数
				var leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000));
				// 计算相差秒数
				var leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
				var seconds = Math.round(leave3 / 1000);

				var Temp = "还有";
				if (days > 0) {
					Temp += days + '天';
				}
				if (hours > 0) {
					Temp += hours + '时';
				}
				if (minutes > 0) {
					Temp += minutes + '分';
				}
				Temp += '<span class="color-blue">'+seconds + '秒</span>';
				Temp += '<div>享受生活！</div>';
				$("#" + domId).html(Temp);
			} catch (e) {
				stopclockFunction();
			}
		}, 0);
	},
	stopclock : function() {
		if (this.timerRunning)
			clearInterval(this.timerID);
		this.timerRunning = false;
	},
	// var date = new Date('2014/05/10');
	startclock : function(endDate) {
		this.end = endDate;
		this.stopclock();
		this.showtime();
		this.timerRunning = true;
	}
};
