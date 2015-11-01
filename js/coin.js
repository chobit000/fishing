//版权 北京智能社©, 保留所有权利

function Coin(img, w, h, x, y, target_x, target_y, maxFrame)
{

	Base.call(this, img, w, h, maxFrame);

	this.x=x;
	this.y=y;

	this.start_x=x;
	this.start_y=y;

	this.target_x=target_x;
	this.target_y=target_y;

	this.n=0;
}

Coin.prototype = new Base();

Coin.prototype.move=function ()
{
	this.n++;

	var disX=this.target_x-this.start_x;
	var disY=this.target_y-this.start_y;

	this.x=this.start_x+disX*this.n/30;
	this.y=this.start_y+disY*this.n/30;
};











