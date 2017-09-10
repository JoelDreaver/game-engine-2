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

		// Place dirt tile
		this.map.set_tile (new vec2(2, 4), 1);

		// Place grass tile
		this.map.set_tile (new vec2(5, 2), 0);
	};

	this.update = function(dtime) {
		this.map.render ();
	};
});

my_engine.assets.preload("doc/examples/res/tiles.png");
