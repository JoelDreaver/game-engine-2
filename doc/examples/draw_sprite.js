var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (160, 120);

	this.init = function () {
	};

	this.update = function(dtime) {
		this.engine.renderer.push ({
			type : SPRITE,
			pos : this.engine.input.mouse.pos.round(),
			sprite : this.engine.assets.load("doc/examples/res/player.png")
		});
	};
});

my_engine.assets.preload("doc/examples/res/player.png");
