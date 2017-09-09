/*

The MIT License (MIT)

Copyright (c) 2017 cd2 (cdqwertz) <cdqwertz@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.

*/

function tile (s) {
	this.sprite = s;
	this.collider = {
		x : 0,
		y : 0,
		w : 0,
		h : 0
	};

	this.render = function (my_map, i, j, id) {
		my_map.engine.renderer.push({
			type : SPRITE_ANIMATED,

			frame : {
				x : my_map.tile_size.x*this.sprite.x,
				y : my_map.tile_size.y*this.sprite.y,
				w : my_map.tile_size.x,
				h : my_map.tile_size.y
			},

			mode : CORNER,
			pos : new vec2 (my_map.tile_size.x * i, my_map.tile_size.y * j),
			sprite : my_map.sprite
		})
	};
};

function tile_connected (s) {
	this.sprite = s;
	this.collider = {
		x : 0,
		y : 0,
		w : 0,
		h : 0
	}

	this.render = function (my_map, i, j, id) {
		var a = this.sprite.x;
		var b = this.sprite.y;

		if (my_map.get_tile(new vec2(i-1, j)) != id) {
			a -= 1;
		} else if (my_map.get_tile(new vec2(i+1, j)) != id) {
			a += 1;
		}

		if (my_map.get_tile(new vec2(i, j+1)) != id && my_map.get_tile(new vec2(i, j+1)) != -2) {
			b += 1;
		} else if (my_map.get_tile(new vec2(i, j-1)) != id && my_map.get_tile(new vec2(i, j-1)) != -2) {
			b -= 1;
		}

		my_map.engine.renderer.push({
			type : SPRITE_ANIMATED,

			frame : {
				x : a*my_map.tile_size.x,
				y : b* my_map.tile_size.y,
				w : my_map.tile_size.x,
				h : my_map.tile_size.y
			},

			mode : CORNER,
			pos : new vec2 (my_map.tile_size.x * i, my_map.tile_size.y * j),
			sprite : my_map.sprite
		})
	};
};


function map (e, size, tile_size) {
	this.engine = e;
	this.size = size;
	this.tile_size = tile_size;

	this.tiles = [];
	this.data = [];

	this.sprite = null;

	this.init = function (sprite) {
		this.sprite = sprite;

		for (var i = 0; i < this.size.x; i++) {
			var a = [];

			for (var j = 0; j < this.size.y; j++) {
				a.push(-1);
			}

			this.data.push(a);
		}
	};

	this.randomize = function (tiles, a) {
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				if (Math.random() > a) {
					this.data[i][j] = tiles[Math.floor(Math.random()*tiles.length)];
				}
			}
		}
	};

	this.fill = function (tile) {
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				this.data[i][j] = tile;
			}
		}
	}

	this.is_on_map = function (p) {
		return (p.x >= 0 && p.y >= 0 && p.x < this.data.length && p.y < this.data[0].length);
	};

	this.render = function () {
		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				if (this.tile_size.x * i >= -(this.engine.renderer.viewport.x) - this.tile_size.x &&
					this.tile_size.x * (i+1) <= -(this.engine.renderer.viewport.x) + this.engine.game.size.x + this.tile_size.x) {
					var tile = this.data[i][j];

					if (tile != -1) {
						this.tiles[tile].render(this, i, j, tile);
						//console.log(tile);
					}
				}
			}
		}
	};

	this.get_colliders = function (ignore) {
		var coll = [];

		for (var i = 0; i < this.data.length; i++) {
			for (var j = 0; j < this.data[i].length; j++) {
				var tile = this.data[i][j];

				if (tile != -1 && ignore.indexOf(tile) == -1) {
					var my_rect = new rect(i*this.tile_size.x + this.tiles[tile].collider.x, j*this.tile_size.x+this.tiles[tile].collider.y,
						(i+1)*this.tile_size.x + this.tiles[tile].collider.w, (j+1)*this.tile_size.x + this.tiles[tile].collider.h);
					my_rect.meta.tile = tile;
					my_rect.meta.tile_pos = new vec2(i, j);
					coll.push(my_rect);
				}
			}
		}

		return coll;
	};

	this.get_tile = function (pos) {
		if (this.is_on_map(pos)){
			return this.data[pos.x][pos.y];
		} else {
			return -2;
		}
	};

	this.set_tile = function (pos, my_tile) {
		if (this.is_on_map(pos)){
			this.data[pos.x][pos.y] = my_tile;
		} else {
			return -2;
		}
	};
}
