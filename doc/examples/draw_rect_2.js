var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (640, 480);

	this.init = function () {
	};

	this.update = function(dtime) {
		this.engine.renderer.push({
			type : RECT,
			mode : CENTER,
			pos  : this.engine.input.mouse.pos,
			size : new vec2 (200, 100),
			color: "#0f0"
		});
	};
});
