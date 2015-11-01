(function(win, doc) {

	bindEvent(document, 'DOMContentLoaded',function(ev){
		new Game();
	})

	var Game = function(){

		this.oC=document.getElementById('c1');
		this.gd=this.oC.getContext('2d');
		
		this.W=this.oC.width,
		this.H=this.oC.height;

		this.init();

		var _this=this;

		loadImages(resource, function (imgs){
			// 创建
			_this.bullet(imgs);
		
			_this.cannon(imgs);

			_this.fish(imgs);

			_this.bottom(imgs);
			//创建结束

			_this.refresh(function(){
				
				// 画元素
				_this.draw.all.call(_this);
				

				// 判断干掉鱼
				_this.checkcatch(imgs);

				//碰撞检测
				_this.checkhit(imgs);
				
				
			})
			// 做动画
			_this.nextFrame();

			
		});
	}
	// 初始化
	Game.prototype.init = function(){
		this.aFish=[],
		this.aBull=[],
		this.aCoin=[],
		this.aWeb=[],
		this.aDeadFish=[],
		this.oCannon=null;
		this.oBottom=null;
	}
	// 创建元素
	Game.prototype.cannon = function(imgs){
		this.oCannon=new Cannon(imgs.cannon1.img, imgs.cannon1.data.w, imgs.cannon1.data.h);
		this.oCannon.x=425;
		this.oCannon.y=this.H-30;
	}
	
	Game.prototype.bottom = function(imgs){
		this.oBottom=new Bottom(imgs.bottom.img, imgs.bottom.data.w, imgs.bottom.data.h);
		this.oBottom.x=imgs.bottom.data.w/2;
		this.oBottom.y=this.H-20;
	}
	Game.prototype.coin = function(imgs,oFish){
		var coin=new Coin(imgs.coinAni2.img, imgs.coinAni2.data.w, imgs.coinAni2.data.h, oFish.x, oFish.y, 74, 560, 10);
		this.aCoin.push(coin);
	}
	Game.prototype.web = function(imgs,oBull){
		var w=new Web(imgs.web.img, imgs.web.data.w, imgs.web.data.h, oBull.x, oBull.y, imgs.web.data.l, imgs.web.data.t);
		this.aWeb.push(w);
	}

	Game.prototype.deadfish = function(imgs,oFish){
		//死鱼
		var _this=this;
		var f=new DeadFish(oFish.img, oFish.w, oFish.h, 4);

		f.x=oFish.x;
		f.y=oFish.y;
		f.rotate=oFish.rotate;

		_this.aDeadFish.push(f);
		// 500毫秒后删除
		(function (f){
			setTimeout(function (){
				for(var i=0;i<_this.aDeadFish.length;i++)
				{
					if(_this.aDeadFish[i]==f)
					{
						_this.aDeadFish.splice(i--, 1);
						break;
					}
				}
			}, 500);
		})(f);
	}

	Game.prototype.fish = function(imgs){
		var _this=this;
		var fishs=[
			{img: imgs.fish1.img, w: imgs.fish1.data.w, h: imgs.fish1.data.h, m: imgs.fish1.data.m},
			{img: imgs.fish2.img, w: imgs.fish2.data.w, h: imgs.fish2.data.h, m: imgs.fish2.data.m},
			{img: imgs.fish3.img, w: imgs.fish3.data.w, h: imgs.fish3.data.h, m: imgs.fish3.data.m},
			{img: imgs.fish4.img, w: imgs.fish4.data.w, h: imgs.fish4.data.h, m: imgs.fish4.data.m},
			{img: imgs.fish5.img, w: imgs.fish5.data.w, h: imgs.fish5.data.h, m: imgs.fish5.data.m}
		];
		// 生成鱼
		function next(){
			setTimeout(function(){
				if(_this.aFish.length>=50){
					next();
					return;
				}
				var fish = fishs[Math.floor(Math.random()*fishs.length)];
				var oF = new Fish(fish.img, fish.w, fish.h, 4);
				
				oF.setRotate(_this.W, _this.H);
				oF.m = fish.m;
				_this.aFish.push(oF);
				next();
			},Math.random()*500)
		}
		next();
	}

	Game.prototype.bullet = function(imgs){
		var _this=this;
		bindEvent(document, 'click', main);
		bindEvent(window, 'touchstart', main);

		function main(ev){
			if(iswindows){
				var x1=ev.pageX-_this.oC.offsetLeft;
				var y1=ev.pageY-_this.oC.offsetTop;
			}
			else{
				var x1=ev.touches[0].pageX-_this.oC.offsetLeft;
				var y1=ev.touches[0].pageY-_this.oC.offsetTop;
			}

			var x2=_this.oCannon.x/2;
			var y2=_this.oCannon.y/2;

			var x=x1-x2;
			var y=y1-y2;	//?

			var a=Math.atan2(y, x);

			//alert(a2d(a));
			_this.oCannon.rotate=a2d(a)+90;


			var b=new Bullet(imgs.bullet.img, imgs.bullet.data.l, imgs.bullet.data.t, imgs.bullet.data.w, imgs.bullet.data.h);
			b.x=_this.oCannon.x;
			b.y=_this.oCannon.y;
			b.rotate=_this.oCannon.rotate;
			_this.aBull.push(b);


		}
		
		bindEvent(window, 'touchmove',function(ev){
			ev.preventDefault();
		})
		bindEvent(document, 'mousemove',function(ev){
			ev.preventDefault();
		})
		
	}

	Game.prototype.refresh=function(fn){
		var _this=this;
		setInterval(function(){
		
			_this.gd.clearRect(0, 0, _this.W, _this.H);
			fn && fn();
		},16)
	}


	Game.prototype.draw={
		fish : function(){
			// 画鱼
			for(var i=0;i<this.aFish.length;i++){
				if(isNotInScreen(this.W, this.H, this.aFish[i], 100)){
					this.aFish.splice(i--,1);
					continue;
				}
				this.aFish[i].randomRotate();
				this.aFish[i].move();
				this.aFish[i].draw(this.gd);

			}
		},
		deadfish : function(){
			//画死鱼
			for(var i=0;i<this.aDeadFish.length;i++)
			{
				this.aDeadFish[i].draw(this.gd);
			}
		},
		web : function(){
			//画渔网
			for(var i=0;i<this.aWeb.length;i++)
			{
				this.aWeb[i].scale+=0.03;
				this.aWeb[i].draw(this.gd);

				if(this.aWeb[i].scale>=1.2)
				{
					this.aWeb.splice(i--, 1);
				}
			}
		},
		coin : function(){
			//画金币
			for(var i=0;i<this.aCoin.length;i++)
			{
				if(this.aCoin[i].n>=100)
				{
					this.aCoin.splice(i--, 1);
					continue;
				}

				this.aCoin[i].move();
				this.aCoin[i].draw(this.gd);
			}
		},
		bottom : function(){
			//画炮台	
			
			this.oBottom.draw(this.gd);
		},
		cannon : function(){
			//画炮弹
			for(var i=0;i<this.aBull.length;i++)
			{
				if(isNotInScreen(this.W, this.H, this.aBull[i], 100)){
					this.aBull.splice(i--,1);
					continue;
				}
				this.aBull[i].move();
				this.aBull[i].draw(this.gd);
			}
			//画炮
			this.oCannon.draw(this.gd);
		},
		all : function(){
			
			this.draw.fish.call(this);
			this.draw.deadfish.call(this);
			this.draw.web.call(this);
			this.draw.coin.call(this);
			this.draw.bottom.call(this);
			this.draw.cannon.call(this);
		}
	}


	Game.prototype.checkcatch=function(imgs){
		for(var j=0;j<this.aWeb.length;j++)
		{
			for(var i=0;i<this.aFish.length;i++)
			{
				//aFish[i]<->aBull[j]

				if(testCircle(this.aFish[i], this.aWeb[j]))
				{
					var r = Math.random();
					if(r>this.aFish[i].m){
						continue;
					}

					//鱼、炮弹干掉  生成金币、死鱼
					this.coin(imgs,this.aFish[i]);

					this.deadfish(imgs,this.aFish[i]);
				
					this.aFish.splice(i--, 1);

					break;
				}
			}
		}
	}
	Game.prototype.checkhit=function(imgs){
		//碰撞检测
		for(var i=0;i<this.aFish.length;i++)
		{
			for(var j=0;j<this.aBull.length;j++)
			{
				//aFish[i]<->aBull[j]
				if(testCircle(this.aFish[i], this.aBull[j]))
				{
					//生成渔网

					this.web(imgs,this.aBull[j]);
	
					this.aBull.splice(j--, 1);
					// aFish.splice(i--, 1);

					//i原地没动	j=>0
					break;
				}
			}
		}
	}

	Game.prototype.nextFrame=function(){
		//换图  动画
		var _this=this;
		setInterval(function (){
			for(var i=0;i<_this.aFish.length;i++){
				_this.aFish[i].nextFrame();

			}

			for(var i=0;i<_this.aCoin.length;i++)
			{
				_this.aCoin[i].nextFrame();
			}

			for(var i=0;i<_this.aDeadFish.length;i++)
			{
				_this.aDeadFish[i].nextFrame();
			}

		}, 150);
	}
	
})(window, document);
