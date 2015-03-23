
function loadjscssfile(filename,filetype){
    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);		
		if(pajkPage == "mobilePage"){
			fileref.onload=fileref.onreadystatechange=function(){ 
				var activate = ('createTouch' in document) ? 'touchend' : 'click';
					setTimeout(function () {
						if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
							var os = getMobileOperatingSystem();
								mobileBtn = $(".app-btn");
							if(isWeixinBrowser()){  
								if(os == 'iOS'){
									mobileBtn.attr("href",'download.html');
								}else{
									mobileBtn.attr("href",'http://a.app.qq.com/o/simple.jsp?pkgname=com.pingan.papd');
								}
							} else{
								if(os == 'iOS'){
									mobileBtn.attr("href",ios_download_path);
								}else{
									mobileBtn.attr("href",android_download_path);
								}
							}
									
						}
					}, 500);
			}
		}
		if(pajkPage == "downloadPage"){
			fileref.onload=fileref.onreadystatechange=function(){ 
				if(!this.readyState||this.readyState=='loaded'||this.readyState=='complete'){
					var os = getMobileOperatingSystem();
						mobileBtn = $(".app-btn");				
					
						if(isWeixinBrowser()){  
							if(os == 'iOS'){
								document.getElementById('overlay').style.display = "block";
								window.location.href = ios_download_path;      
							}else{							
								window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.pingan.papd'; 
							}	
						} else{
							if(os == 'iOS'){
								document.body.innerHTML  = "<a id='aClick' href=" + ios_download_path + "></a>";
								document.getElementById('aClick').click();
							}else{
								window.location.href = android_download_path;
							}
						}
					
				}
			}
		}
    }else if(filetype == "css"){
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}
function isWeixinBrowser(){
    return (/MicroMessenger/i).test(window.navigator.userAgent);
}
function getMobileOperatingSystem() {
	 userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
		return 'iOS';
	}else if( userAgent.match( /Android/i ) ){
		return 'Android';
	}else{
		return 'unknown';
	}
}

