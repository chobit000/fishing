

function Bullet(img, sx, sy, w, h)
{
	Base.call(this, img, w, h, 0);

	this.sx=sx;
	this.sy=sy;

	this.speed=5;
}

Bullet.prototype = new Base();

Bullet.prototype.draw=function (gd)
{
	gd.save();

	gd.translate(this.x, this.y);
	gd.rotate(d2a(this.rotate));

	gd.drawImage(this.img, this.sx, this.sy, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);

	gd.restore();
};

Bullet.prototype.move=function ()
{
	var speedX=Math.cos(d2a(this.rotate-90))*this.speed;
	var speedY=Math.sin(d2a(this.rotate-90))*this.speed;

	this.x+=speedX;
	this.y+=speedY;
};







