// JavaScript Document
window.onload=function(){
	var oUl=document.getElementById('ul');
	var aLi=oUl.children;
	var oDiv=document.getElementById('obox');
	var oBar=document.getElementById('nav');
		
	var oBarH=getPos(oBar).top;
	var oBar1=document.getElementById('nav1');
	var sTop=document.documentElement.scrollTop || document.body.scrollTop;
	var oBox=document.getElementById('box');
		
		
	window.onscroll=function(){
		var oTop=document.documentElement.scrollTop || document.body.scrollTop;
			//alert(oT)
		if(oTop>=oBarH){
			oBar.style.position='fixed';
			oBar.style.top=0;
			oBar.style.left=0;
				
			oBar1.style.display='block';	
			}else{
				oBar.style.position='';
				oBar1.style.display='none';	
			}	
		}
		
		
		
		for(var i=0; i<aLi.length-1; i++){
			aLi[i].onmouseover=function(){
				/*for(var i=0; i<aLi.length-1; i++){
					aLi[i].className='left box2a1';	
				}	
				this.className='left box2a1 active';*/
				tMove(oBox,this.offsetLeft)
				
			};
			
			aLi[i].onmouseout=function(){
				/*this.className='left box2a1';*/	
				tMove(oBox,0)
				
			};
			
			//回到顶部
			aLi[i].index=i;
			aLi[i].onclick=function(){
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var dis=500*this.index+500-start;

				var count=Math.floor(1000/30);
				var n=0;
				var timer=setInterval(function(){
					n++;
					var a=n/count;
					var cur=start+dis*a;
					
					document.documentElement.scrollTop=document.body.scrollTop=cur;

					if (n==count) {
						clearInterval(timer);
					}
				}, 30);
			}
		}
		
		
		//时钟
		var oDiv=document.getElementById('clock');
		var aImg=oDiv.getElementsByTagName('img');
		function Clock(){
			var oDate=new Date();
			var h=oDate.getHours();
			var m=oDate.getMinutes();
			var s=oDate.getSeconds();
			str=toDouble(h)+toDouble(m)+toDouble(s);
			for(var i=0; i<aImg.length; i++){
				aImg[i].src='img/'+str.charAt(i)+'.png';	
			
			}
		}
		Clock();
		setInterval(function(){
			Clock();	
		},1000)
		
		
		//拉钩效果
		var oUl1=document.getElementById('ul1')
		var aLi1=oUl1.children;
		//alert(aLi1.length);
		var aSpan=oUl1.getElementsByTagName('span');
		//alert(aSpan.length);
		function hoverDir(obj, ev){
			var x=obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
            var y=obj.offsetTop+obj.offsetHeight/2-ev.clientY;

            return Math.round((Math.atan2(y, x)*180/Math.PI+180)/90)%4;
		
		}
		 

         for(var i=0; i<aLi1.length; i++){
             aLi1[i].onmouseenter=function(ev){
                 var oEvent=ev || event;
                 var n=hoverDir(this, oEvent);

                 var oSpan=this.children[0].children[0];
				 
                 switch(n){
                 	case 0:
                        oSpan.style.left='150px';
                        oSpan.style.top=0;
                        break;
                    case 1:
                        oSpan.style.left=0;
                        oSpan.style.top='150px';
                        break;
                    case 2:
                        oSpan.style.left='-150px';
                        oSpan.style.top=0;
                        break;
                    case 3:
                        oSpan.style.left=0;
                        oSpan.style.top='-150px';
                        break;
                 }
                    move(oSpan, {left: 0, top: 0});
             };

             aLi1[i].onmouseleave=function(ev){
                 var oEvent=ev || event;
                 var n=hoverDir(this, oEvent);

                 var oSpan=this.children[0].children[0];
				 
                 switch(n){
                     case 0:
                         move(oSpan, {left: 150, top: 0});
                         break;
                     case 1:
                         move(oSpan, {left: 0, top: 150});
                         break;
                     case 2:
                         move(oSpan, {left: -150, top: 0});
                         break;
                    case 3:
                         move(oSpan, {left: 0, top: -150});
                         break;
                  }
             };
        }
		
		
		
		
		
}