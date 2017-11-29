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

function font (e, layout) {
	this.engine = e;
	this.layout = layout;
	this.space = 1;
	this.layer = 0;
	this.newline = 0;

	this.set_sprite = function (spr) {
		this.sprite = spr;
	}

	this.render = function (pos, text) {
		var x = pos.x;
		var y = pos.y;
		for (var i = 0; i < text.length; i++) {
			var chr = text[i];

			if (chr == "\n") {
				x = pos.x;
				y += this.newline;
			} else {
				this.engine.renderer.push({
					type : SPRITE_ANIMATED,

					frame : {
						x : this.layout[chr].x,
						y : this.layout[chr].y,
						w : this.layout[chr].w,
						h : this.layout[chr].h
					},

					mode : CORNER,
					pos : new vec2(x, y),
					sprite : this.sprite,
					layer: this.layer
				});

				x += this.layout[chr].w+this.space;
			}
		}
	}

	this.get_text_width = function (text) {
		var width = 0;
		var x = 0;

		for (var i = 0; i < text.length; i++) {
			var chr = text[i];

			if (chr == "\n") {
				if (x > width) {
					width = x;
				}
				x = 0;
			} else {
				x += this.layout[chr].w+this.space;
			}
		}

		if (x > width) {
			width = x;
		}

		return width;
	}
};

function font_simple (e, img, layout) {
	this.sprite = img;
	this.layout = layout;
	this.engine = e;
	this.w = 3;
	this.h = 5;

	this.set_sprite = function (s, w, h) {
		this.sprite = s;
		this.w = w;
		this.h = h;
	};

	this.render = function (pos, text) {
		var w = this.w;
		var h = this.h;

		for (var i = 0; i < text.length; i++) {
			var chr = text.charAt(i);
			var a = this.layout.indexOf(chr);

			if (a != -1) {
				this.engine.renderer.push({
					type : SPRITE_ANIMATED,

					frame : {
						x : w*a,
						y : 0,
						w : w,
						h : h
					},

					mode : CORNER,
					pos : new vec2 (pos.x + (i*(w+1)), pos.y),
					sprite : this.sprite
				});
			}
		}
	};

	this.get_text_width = function (text) {
		return (text.length*(this.w+1));
	}
}
