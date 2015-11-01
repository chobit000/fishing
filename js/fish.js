

function Fish(img, w, h, maxFrame)
{
	Base.call(this, img, w, h, maxFrame);

	this.speed=Math.random()*2+1;

}

Fish.prototype = new Base();

Fish.prototype.draw=function (gd)
{
	gd.save();

	gd.translate(this.x, this.y);
	gd.rotate(d2a(this.rotate));
	if(Math.abs(this.rotate)>=90)
	{
		gd.scale(1,-1);
	}

	gd.drawImage(this.img, 0, this.nowFrame*this.h, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);

	gd.restore();
};


Fish.prototype.setRotate =function(W,H){
	if(Math.random()<0.5){
		this.x=-100;
		this.y=Math.random()*H;
		this.rotate=Math.random()*60-30;

	}
	else{
		this.x=W+100;
		this.rotate=Math.random()*60-210;
		this.y=Math.random()*H;
	}
}

//随机旋转
Fish.prototype.randomRotate = function () {
    var r = random(1, 100);
    if ( r < 5) { this.rotate = this.rotate + random(-10, 10); }
}