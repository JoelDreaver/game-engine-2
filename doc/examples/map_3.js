var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (160, 120);

	// tileset (engine)
	this.tileset = new tileset (this.engine);

	// Dirt / Grass
	this.tileset.push({
		auto_tiling : AUTO_TILING_FLOOR,
		rects : [
			{x:16, y:0, w:16, h:16},
			{x:0, y:0, w:16, h:16}
		]
	});

	// map (engine, pos, size, tile_size)
	this.map = new map (this.engine, new vec2(0,0), new vec2(10, 8), new vec2(16, 16), this.tileset);

	this.init = function () {
		// Init map
		this.tileset.init(my_engine.assets.load("doc/examples/res/tiles.png"));
		this.map.init ();

		// Set background color
		this.engine.canvas.style.backgroundColor = "#65a9d9";
	};

	this.update = function(dtime) {
		if (this.engine.input.mouse.pressed[1]) {
			var pos = this.engine.input.mouse.pos.div(new vec2(16, 16)).floor();
			this.map.set_tile(pos, 0);
			this.map.update_auto_tiling ();
		}

		this.map.render ();
	};
});

my_engine.assets.preload("doc/examples/res/tiles.png");
