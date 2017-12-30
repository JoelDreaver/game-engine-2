var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (640, 480);

	this.init = function () {
		var inp = this.engine.input;

		inp.register_axis ("move", {
			key_neg        : 37,
			key_pos        : 39,
			gamepad_id     : 0,
			gamepad_axis   : 0
		});

		inp.register_button ("jump", {
			key            : 38,
			gamepad_id     : 0,
			gamepad_button : 2
		});
	};

	this.update = function(dtime) {
		var inp = this.engine.input;

		console.log(inp.axis("move") + ", "+ inp.button("jump"));
	};
});
