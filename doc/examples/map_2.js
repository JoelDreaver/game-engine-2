var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (160, 120);

	// map (engine, size, tile_size)
	this.map = new map (this.engine, new vec2(10, 8), new vec2(16, 16));

	// Register tiles
	this.map.tiles.push(new tile(new vec2 (0, 0)));	// Grass
	this.map.tiles.push(new tile(new vec2 (1, 0)));	// Dirt

	this.init = function () {
		// Init map
		this.map.init ();
		this.map.sprite = my_engine.assets.load("doc/examples/res/tiles.png");

		// Set background color
		this.engine.canvas.style.backgroundColor = "#65a9d9";

		// Click -> Place tile
		var that = this;
		this.engine.input.on(MOUSE_DOWN, function (evt) {
			var pos = that.engine.input.mouse.pos.div(new vec2(16, 16)).floor();

			// Check if the tile should be a grass or dirt tile
			var above = pos.add(new vec2(0, -1));
			var tile_above = that.map.get_tile(above);
			if (tile_above == 0 || tile_above == 1) {
				that.map.set_tile(pos, 1);	// Place dirt
			} else {
				that.map.set_tile(pos, 0);	// Place grass
			}

			var below = pos.add(new vec2(0, 1));
			var tile_below = that.map.get_tile(below);
			if (tile_below == 0) {
				that.map.set_tile(below, 1);
			}
		})
	};

	this.update = function(dtime) {
		this.map.render ();
	};
});

my_engine.assets.preload("doc/examples/res/tiles.png");
