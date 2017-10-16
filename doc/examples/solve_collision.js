var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (640, 480);

	this.pos = new vec2(100, 100);
	this.speed = 200;

	this.init = function () {
	};

	this.update = function(dtime) {
		var keys = this.engine.input.keyboard.pressed;

		// Move rect
		if (keys[37]) {
			this.pos.x -= this.speed*dtime;
		} else if (keys[39]) {
			this.pos.x += this.speed*dtime;
		}

		if (keys[40]) {
			this.pos.y += this.speed*dtime;
		} else if (keys[38]) {
			this.pos.y -= this.speed*dtime;
		}

		// new rect (pos, size)
		var rect_1 = new rect(this.pos, new vec2(100, 100));
		var rect_2 = new rect(this.size.div(new vec2(2,2)), new vec2(100, 100));

		var color = "#0f0";
		if (rect_1.intersect(rect_2)) {
			color = "#f00";
			this.pos = rect_1.solve(rect_2);
		}

		// Rect 1
		this.engine.renderer.push({
			type : RECT,
			mode : CENTER,
			pos  : this.pos,
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
