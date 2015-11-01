

function DeadFish(img, w, h, maxFrame)
{
	Base.call(this, img, w, h, maxFrame);
}

DeadFish.prototype = new Base();

DeadFish.prototype.draw=function (gd)
{
	gd.save();

	gd.translate(this.x, this.y);
	gd.rotate(d2a(this.rotate));
	if(Math.abs(this.rotate)>=90)
	{
		gd.scale(1,-1);
	}

	gd.drawImage(this.img, 0, 4*this.h+this.nowFrame*this.h, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);

	gd.restore();
};

