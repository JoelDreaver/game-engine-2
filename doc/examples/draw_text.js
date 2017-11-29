var my_engine = new engine(function(e) {
	this.engine = e;

	// Small canvas size
	this.size = new vec2 (640/8, 480/8);

	this.font = new font_simple (this.engine, null, "1234567890");
	this.num = 0;

	this.init = function () {
		this.font.set_sprite (my_engine.assets.load ("doc/examples/res/font_1.png"), 3, 5);

		// Click -> Increase number by one
		var that = this;
		this.engine.input.on(MOUSE_DOWN, function (evt) {
			that.num += 1;
		})
	};

	this.update = function(dtime) {
		// Convert number to string
		var str = this.num.toString();

		// The text should be in the center of the canvas
		var pos = this.size.div(new vec2(2, 2)).sub(new vec2(this.font.get_text_width(str)/2, 3));

		// Render text
		this.font.render(pos, str);
	};
});

my_engine.assets.preload ("doc/examples/res/font_1.png");
