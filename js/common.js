

function loadImages(arr, fn, fnError)
{
	var count=0;
	var json={};

	for(var i=0;i<arr.length;i++)
	{
		var oImg=new Image();

		(function (index){
			oImg.onload=function ()
			{
				var name=arr[index].img.split('.')[0];
				json[name]={ img: this, data: arr[index] };

				count++;

				if(count==arr.length)
				{
					fn(json);
				}
			};
			oImg.onerror=function ()
			{
				fnError && fnError();
			};
		})(i);
		oImg.src='images/'+arr[i].img;
	}
}

function testCircle(obj1, obj2)
{
	var a=obj1.x-obj2.x;
	var b=obj1.y-obj2.y;
	var dis=Math.sqrt(a*a+b*b);

	if(dis<=obj1.w/2+obj2.w/2)
	{
		//碰上了
		return true;
	}
	else
	{
		return false;
	}
}

function d2a(n)
{
	return n*Math.PI/180;
}
function a2d(n)
{
	return n*180/Math.PI;
}

function isNotInScreen(W, H, obj, padding)
{
	if(obj.x<-padding || obj.x>W+padding || obj.y<-padding || obj.y>H+padding)
	{
		return true;
	}
	else
	{
		return false;
	}
}

//随机数
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

function iswindows(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.indexOf('windows')!=-1){
		return true;
	}
	else{
		return false;
	}
}

function bindEvent(obj, event, fn){
	obj.addEventListener(event,fn,false);
}







