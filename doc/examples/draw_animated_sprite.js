var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (160, 120);

	this.time = 0;

	this.init = function () {
	};

	this.update = function(dtime) {
		this.time += dtime;

		var frame = Math.floor((this.time*8)%6);

		this.engine.renderer.push ({
			type : SPRITE_ANIMATED,

			frame : {
				x:frame*16,
				y:0,
				w:16,
				h:16
			},

			pos : new vec2(this.size.x/2, this.size.y/2).round(),
			sprite : this.engine.assets.load("doc/examples/res/coin.png")
		});
	};
});

my_engine.assets.preload("doc/examples/res/coin.png");
