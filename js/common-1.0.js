// JavaScript Document
	/*//绑定事件*/
	function addEvent(obj,sEv,fn){
		if(obj.addEventListener){
			obj.addEventListener(sEv,fn,false)	
		
		}else{
			obj.attachEvent('on'+sEv,fn)	
		
		}
	}
		
	function toDouble(n){
		return n<10?'0'+n:''+n;	
	}
	
	/*//滚轮事件*/
	function addwheel(obj,fn){
		function wheel(ev){
			var oEvent=ev || event;
			var bDown=true;
			if(oEvent.wheelDelta){
				if(oEvent.wheelDelta>0){
					bDown=false;	
				}else{
					bDown=true;	
				}	
			}else{
				if(oEvent.detail<0){
					bDown=false;	
				}else{
					bDown=true;	
				}
			}	
			fn && fn(bDown);
			oEvent.preventDefault && oEvent.preventDefault();
			return false;
		};
		if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
			obj.addEventListener('DOMMouseScroll',wheel,false)	
		}else{
			addEvent(obj,'mousewheel',wheel);	
		
		}	
	 }
	 
	 
	/* //DOM节点加载完成触发*/
	 function domReady(fn){
			if(document.addEventListener){
				document.addEventListener('DOMContentLoaded',function(){
					fn && fn()	
				},false);	
			
			}else{
				document.onreadystatechange=function(){
					if(document.readyState=='complete'){
						fn && fn()
					}	
				
				}	
				
			}   
		   
		}
		
		
		/*//随机数*/
		function rnd(n,m){
			return parseInt(Math.random()*(m-n))+n	
			
		}
		
		/*//绝对距离*/
		function getPos(obj){
			var l=0;
			var t=0;
			while(obj){
				l+=obj.offsetLeft;
				t+=obj.offsetTop
				obj=obj.offsetParent	
			}
			return {left:l,top:t}	
			
		}
		
		
		
		/*//设置cookie*/
		
		function addcookie(name,value,iDay){
			if(iDay){
				var oDate=new Date();
				oDate.setDate(oDate.getDate()+iDay);
				oDate.toUTCString;
				document.cookie=name+'='+value+'; path=/; expires='+oDate;	
			}else{
				
				document.cookie=name+'='+value+'; path=/';	
			}	
		}
		
		
		/*//获取cookie*/
		
		function getcookie(name){
			var arr=document.cookie.split('; ');
			for(var i=0; i<arr.length; i++){
				var arr2=arr[i].split('=');
				if(arr2[0]==name){
					return arr2[1];
				}
			}
			return '';
		}
		
		
		
		
		/*//删除cookie*/
		
		
		function removecookie(name){
			addcookie(name,'123',-1)	
		}
		
		
		
		
		/*//ajax
		 // abc=123&qwe=456;
        // {abc: 123, qwe: 456}*/
        function url2json(str){
            var json={};
            var arr=str.split('&');
            for(var i=0; i<arr.length; i++){
                var arr2=arr[i].split('=');
                json[arr2[0]]=arr2[1];
            }
            return json;
        }
        function json2url(json){
			json.t=Math.random();
            var arr=[];
            for(var name in json){
                arr.push(name+'='+json[name]);
            }
            return arr.join('&');
        }
        function ajax(json){
            /*// 考虑默认值*/
            var json=json || {};
            if(!json.url)return;
            json.data=json.data || {};
            json.type=json.type || 'get';
            json.time=json.time || 30000;
           /* // 1、准备一个ajax对象*/
            if(window.XMLHttpRequest){
                var xhr=new XMLHttpRequest();
            }else{
                var xhr=new ActiveXObject("Microsoft.XMLHTTP");
            }
           /* // 2、建立链接*/
            switch(json.type.toLowerCase()){
                case 'get':
                    xhr.open('GET', json.url+'?'+json2url(json.data), true);
                    xhr.send();
                    break;
                case 'post':
                    xhr.open('POST', json.url, true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.send(json2url(json.data));
                    break;
            }
			json.fnloading && json.fnloading();
          /*  // 4、接收数据*/
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
					json.complete && json.complete();
                    if((xhr.status>=200 && xhr.status<300) || xhr.status==304){
                        json.success && json.success(xhr.responseText);
                    }else{
                        json.error && json.error(xhr.status);
                    }
                    clearTimeout(timer);
                }
            };

            var timer=setTimeout(function(){
                alert('你网太慢了');
                xhr.onreadystatechange=null;
            }, json.time);
        }
		
		
		/*//jsonp*/
		function jsonp(json){
			var json=json || {};
			if(!json.url)return;
			json.data=json.data || {};
			json.cbName=json.cbName || 'cb';
		
			var fnName='show'+Math.random();
			fnName=fnName.replace('.', '');
			window[fnName]=function(data){
				json.success && json.success(data);
				/*// 删除script标签*/
				oHead.removeChild(oS);
			};
			json.data[json.cbName]=fnName;
			var arr=[];
			for(var name in json.data){
				arr.push(name+'='+json.data[name]);
			}
			var str=arr.join('&');
			var oS=document.createElement('script');
			oS.src=json.url+'?'+str;
			var oHead=document.getElementsByTagName('head')[0];
			oHead.appendChild(oS);
		}
		
		
		/*//获取位置*/
		function getStyle(obj, name){
   			 return (obj.currentStyle || getComputedStyle(obj ,false))[name];
		}
		
		/*//运动框架*/
function move(obj, json, option){
    var option=option || {};
    option.duration=option.duration || 700;
    option.easing=option.easing || 'ease-out';

    var start={};
    var dis={};
    for(var name in json){
        start[name]=parseFloat(getStyle(obj, name));
        if(isNaN(start[name])){
            switch(name){
                case 'left':
                    start[name]=obj.offsetLeft;
                    break;
                case 'top':
                    start[name]=obj.offsetTop;
                    break;
            }
        }
        dis[name]=json[name]-start[name];
    }

    var count=Math.floor(option.duration/30);
    var n=0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;

        for(var name in json){
            switch(option.easing){
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+dis[name]*(1-a*a*a);
                    break;
            }

            if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name]=cur+'px';
            }
        }

        if(n==count){
            clearInterval(obj.timer);
            option.complete && option.complete();
        }
    }, 30);
}


/*//弹性运动*/
;(function(window){
    var left=0;
    var iSpeed=0;   // 速度
    var timer;
    window.tMove=function(obj, iTarget){
        clearInterval(timer);
        timer=setInterval(function(){
            iSpeed+=(iTarget-obj.offsetLeft)/5;
            iSpeed*=0.75;
            left+=iSpeed;
            obj.style.left=Math.floor(left)+'px';

            if(Math.floor(left)==iTarget && Math.floor(iSpeed)==0){
                clearInterval(timer);
            }
        }, 30);
    }
})(window);




