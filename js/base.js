function Base(img, w, h, maxFrame) {
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.img = img;
    this.maxFrame = maxFrame;
    this.nowFrame = 0;
    this.speed = 0;
    this.rotate = 0;
}

//画物体
Base.prototype.draw = function (gd) {
    gd.save();
    gd.translate(this.x, this.y);
    gd.rotate(d2a(this.rotate));
    gd.drawImage(this.img, 0, this.nowFrame * this.h, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
    gd.restore();
}

Base.prototype.move = function () {
    var speedX = Math.cos(d2a(this.rotate)) * this.speed;
    var speedY = Math.sin(d2a(this.rotate)) * this.speed;
    this.x += speedX;
    this.y += speedY;
}

Base.prototype.nextFrame = function () {
    this.nowFrame++;
    if (this.nowFrame >= this.maxFrame) {
        this.nowFrame = 0;
    }
}