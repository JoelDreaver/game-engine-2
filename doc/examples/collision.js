var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (640, 480);

	this.init = function () {
	};

	this.update = function(dtime) {
		// rect (pos, size)
		var rect_1 = new rect(this.engine.input.mouse.pos, new vec2(100, 100));
		var rect_2 = new rect(this.size.div(new vec2(2,2)), new vec2(100, 100));

		var color = "#0f0";
		if (rect_1.intersect(rect_2)) {
			color = "#f00";
		}

		// Rect 1
		this.engine.renderer.push({
			type : RECT,
			mode : CENTER,
			pos  : this.engine.input.mouse.pos,
			size : new vec2 (100, 100),
			color: color
		});

		// Rect 2
		this.engine.renderer.push({
			type : RECT,
			mode : CENTER,
			pos  : this.size.div(new vec2(2,2)),
			size : new vec2 (100, 100),
			color: "#000"
		});
	};
});
