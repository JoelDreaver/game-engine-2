var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (160, 120);

	this.player_pos = new vec2(this.size.x/2, this.size.y/2);
	this.speed = 50;

	this.init = function () {
	};

	this.update = function(dtime) {
		var keys = this.engine.input.keyboard.pressed;

		if (keys[37]) {
			this.player_pos.x -= this.speed*dtime;
		}

		if (keys[38]) {
			this.player_pos.y -= this.speed*dtime;
		}

		if (keys[39]) {
			this.player_pos.x += this.speed*dtime;
		}

		if (keys[40]) {
			this.player_pos.y += this.speed*dtime;
		}

		this.engine.renderer.push ({
			type : SPRITE,
			pos : this.player_pos.round(),
			sprite : this.engine.assets.load("doc/examples/res/player.png")
		});
	};
});

my_engine.assets.preload("doc/examples/res/player.png");
