

function Web(img, w, h, x, y, sx, sy)
{
	Base.call(this, img, w, h, 0);
	this.x=x;
	this.y=y;
	this.sx=sx;
	this.sy=sy;

	this.scale=0.5;	//->1.0
}

Web.prototype = new Base();

Web.prototype.draw=function (gd)
{
	gd.save();

	gd.translate(this.x, this.y);
	gd.scale(this.scale, this.scale);

	gd.drawImage(this.img, this.sx, this.sy, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);

	gd.restore();
};












