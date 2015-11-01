function Bg(img, w, h)
{
	Base.call(this, img, w, h, 0);

	this.position = 0;
}

Bg.prototype = new Base();


//画物体
Bg.prototype.draw = function (gd) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.rotate(d2a(this.rotate));
    gd.drawImage(this.img, 0, this.nowFrame * this.h + Canvas.H + this.position, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    gd.restore();
}

Bg.prototype.move = function () {

    var speed =this.speed;
    this.position -= speed;
}