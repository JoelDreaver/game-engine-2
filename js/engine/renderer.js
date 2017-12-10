/*

The MIT License (MIT)

Copyright (c) 2017 cdqwertz <cdqwertz@gmail.com>

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

var SPRITE = 0;
var SPRITE_ANIMATED = 1;
var RECT = 2;
var PATH = 3;

var CENTER = 0;
var CORNER = 1;

// TODO
function renderer (e) {
	this.queue = [];
	this.layers = [];
	this.engine = e;

	this.viewport = new vec2 (0, 0);

	this.effects = {
		shake : {
			val : 0,
			timer : 0,

			x : 0,
			y : 0
		}
	};

	this.ctx = null;

	this.push = function (item) {
		var layer = (item.layer || 0);
		this.queue[layer].push(item);
	};

	this.push_layer = function (def) {
		def.scroll_scale = def.scroll_scale || new vec2(1, 1);

		this.layers.push(def);
		this.queue.push([]);

		return this.layers.length-1;
	}

	this.init = function () {
		this.engine.canvas = document.getElementById("canvas");
		this.engine.canvas.width = this.engine.game.size.x;
		this.engine.canvas.height = this.engine.game.size.y;

		this.ctx = this.engine.canvas.getContext("2d");

		this.push_layer({});
	};

	this.clear = function () {
		this.ctx.clearRect(0, 0, this.engine.canvas.width, this.engine.canvas.height);
	};

	this.render = function (dtime) {
		for (var it = 0; it < this.queue.length; it++) {
			var layer_def = this.layers[it];

			this.ctx.translate(this.viewport.x*layer_def.scroll_scale.x, this.viewport.y*layer_def.scroll_scale.y);

			if (this.effects.shake.timer > 0) {
				this.effects.shake.x = Math.round(Math.random()*this.effects.shake.val - this.effects.shake.val/2);
				this.effects.shake.y = Math.round(Math.random()*this.effects.shake.val - this.effects.shake.val/2);

				this.ctx.translate(this.effects.shake.x, this.effects.shake.y);
			} else {
				this.effects.shake.x = 0;
				this.effects.shake.y = 0;
			}

			while (this.queue[it].length > 0) {
				var item = this.queue[it].splice(0, 1)[0];

				this.ctx.translate(item.pos.x, item.pos.y);

				if (item.color) {
					this.ctx.fillStyle = item.color;
				} else {
					this.ctx.fillStyle = "#000";
				}

				if (item.alpha) {
					this.ctx.globalAlpha = item.alpha;
				} else {
					this.ctx.globalAlpha = 1;
				}

				if (item.type == SPRITE) {
					if (item.mode == CORNER) {
						this.ctx.drawImage(item.sprite, 0, 0, item.sprite.width, item.sprite.height);
					} else {
						this.ctx.drawImage(item.sprite, -(item.sprite.width/2), -(item.sprite.height/2), item.sprite.width, item.sprite.height);
					}
				} else if (item.type == SPRITE_ANIMATED) {
					if (item.mode == CORNER) {
						this.ctx.drawImage(item.sprite, item.frame.x, item.frame.y, item.frame.w, item.frame.h, 0, 0, item.frame.w, item.frame.h);
					} else {
						this.ctx.drawImage(item.sprite, item.frame.x, item.frame.y, item.frame.w, item.frame.h, -(item.frame.w/2), -(item.frame.h/2), item.frame.w, item.frame.h);
					}
				} else if (item.type == RECT) {
					if (item.mode == CORNER) {
						this.ctx.fillRect(0, 0, item.size.x, item.size.y);
					} else {
						this.ctx.fillRect(-(item.size.x/2), -(item.size.y/2), item.size.x, item.size.y);
					}
				} else if (item.type == PATH) {
					with(this.ctx) {
						beginPath();

						moveTo(item.path[0].x, item.path[0].y);

						for (var j = 1; j < item.path.length; j++) {
							lineTo(item.path[j].x, item.path[j].y);
						}

						fill();
					}
				}

				this.ctx.translate(-item.pos.x, -item.pos.y);
			}

			if (this.effects.shake.timer > 0) {
				this.ctx.translate(-this.effects.shake.x, -this.effects.shake.y);

				this.effects.shake.timer -= dtime;
			}

			this.ctx.translate(-this.viewport.x*layer_def.scroll_scale.x, -this.viewport.y*layer_def.scroll_scale.y);
		}
	};
}
