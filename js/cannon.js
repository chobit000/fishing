

function Cannon(img, w, h)
{
	Base.call(this, img, w, h, 0);

}

Cannon.prototype = new Base();

// Cannon.prototype.draw=function (gd)
// {
// 	gd.save();

// 	gd.translate(this.x, this.y);
// 	gd.rotate(d2a(this.rotate));

// 	gd.drawImage(this.img, 0, 0, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);

// 	gd.restore();
// };















