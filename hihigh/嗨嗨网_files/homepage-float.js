window.onload=function()
{
	var oDiv=document.getElementById('paper_box');
	var aA=document.getElementsByTagName('paper');
	var popWidth=240;
	var popHeight=320;
	var i=0;
	for(i=0;i<aA.length;i++)
	{
		aA[i].pause=1;
		aA[i].time=null;
		initialize(aA[i]);
		aA[i].onmouseover=function()
		{
			this.pause=0;
                        this.style.width=popWidth+'px';
                        this.style.height=popHeight+'px';
                        if(this.offsetLeft+this.offsetWidth+5>oDiv.offsetWidth)
                        { 
				this.style.left=oDiv.offsetWidth-this.offsetWidth-5+'px';
                        }
                        if(this.offsetTop<0)
                        { 
				this.style.top=10+'px';
                        }
                        if(this.offsetTop+this.offsetHeight+5>oDiv.offsetHeight)
                        { 
				this.style.top=oDiv.offsetHeight-this.offsetHeight-5+'px';
                        }
                        this.style.zIndex=2000;
		};
		aA[i].onmouseout=function()
		{
			this.pause=1;
                        this.style.width=this.iWidth+'px';
                        this.style.height=this.iHeight+'px';
                        this.style.zIndex=this.izIndex;
		};
	}
	setInterval(starmove,24);
	function starmove()
	{
		for(i=0;i<aA.length;i++)
		{
			if(aA[i].pause)
			{
				domove(aA[i]);
			}
		}
	}
	function domove(obj)
	{
		if(obj.offsetTop<=-obj.offsetHeight)
		{
			obj.style.top=oDiv.offsetHeight+"px";
			initialize(obj);
		}
		else
		{
			obj.style.top=obj.offsetTop-obj.ispeed+"px";	
		}
	}
	function initialize(obj)
	{
		var iLeft=parseInt(Math.random()*oDiv.offsetWidth);
		var scale=Math.random()*1+1;
		var iTimer=parseInt(Math.random()*1500);
		var izIndex=parseInt(Math.random()*100);
		obj.pause=0;
		obj.style.fontSize=12+'px';
                obj.iWidth=60*scale;
                obj.iHeight=80*scale;
                obj.style.width=obj.iWidth+'px';
                obj.style.height=obj.iHeight+'px';
                obj.style.zIndex=izIndex;
		if((iLeft-obj.offsetWidth)>0)
		{
			obj.style.left=iLeft-obj.offsetWidth+"px";
		}
		else
		{
			obj.style.left=iLeft+"px";
		}
		clearTimeout(obj.time);
		obj.time=setTimeout(function(){obj.pause=1;},iTimer);
		obj.ispeed=Math.ceil(Math.random()*4)+1;
	}
};
