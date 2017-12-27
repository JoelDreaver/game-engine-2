# Game Engine
A javascript game engine designed to be modular and easy to use.

### Features

- 2D Renderer
	- Layer system
	- Draw shapes and sprites
	- Support for animated sprites
- Audio
- Input (Keyboard, Mouse)
- Tile maps
- Font system
- Particle systems
- Collision detection

### Example

```js
var my_engine = new engine(function(e) {
	this.engine = e;

	// Canvas Size
	this.size = new vec2 (640, 480);

	this.init = function () {
	};

	this.update = function(dtime) {
		// Draw a rectangle at the position of the mouse
		this.engine.renderer.push({
			type : RECT,
			mode : CENTER,
			pos  : this.engine.input.mouse.pos,
			size : new vec2 (200, 100),
			color: "#0f0"
		});
	};
});

```

### License
See LICENSE.txt
