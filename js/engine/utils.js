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

var utils = new function () {
	this.dirs = [
		new vec2 (0, -1),
		new vec2 (0, 1),
		new vec2 (-1, 0),
		new vec2 (1, 0)
	];

	this.deg2rad = function (deg) {
		return (deg/180*Math.PI);
	};

	this.random = {
		choose : function (x) {
			return x[Math.floor(Math.random()*x.length)];
		},

		rand : function (a, b) {
			var x = b-a;
			return a+Math.floor(Math.random()*x);
		}
	};
}();

var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

function rect (a, b, c, d) {
	if (typeof a == "object" && typeof b == "object") {
		this.size = b;
		this.pos = a;

		this.left = this.pos.x - this.size.x/2;
		this.top = this.pos.y - this.size.y/2;
		this.right = this.pos.x + this.size.x/2;
		this.bottom = this.pos.y + this.size.y/2;
	} else {
		this.left = a;
		this.top = b;
		this.right = c;
		this.bottom = d;

		this.size = new vec2 (this.right - this.left, this.bottom - this.top);
		this.pos = new vec2 (this.left + this.size.x/2, this.top + this.size.y/2);
	}

	this.meta = {};

	this.intersect = function (other) {
		if (this.right <= other.left ||
				this.left >= other.right ||
				this.bottom <= other.top ||
				this.top >= other.bottom) {
			return false;
		} else {
			return true;
		};
	};

	this.is_inside = function (other) {
		return (this.top >= other.top && this.left >= other.left && this.bottom <= other.bottom && this.right <= other.right);
	};

	this.is_pos_inside = function (other) {
		return (this.top <= other.y && this.left <= other.x && this.bottom >= other.y && this.right >= other.x);
	};

	this.dir = function (other) {
		var dx = (this.pos.x - other.pos.x)/(other.size.x/2);
		var dy = (this.pos.y - other.pos.y)/(other.size.y/2);

		if (Math.abs(dx) > Math.abs(dy)) {
			if (dx > 0) {
				return LEFT;
			} else {
				return RIGHT;
			}
		} else {
			if (dy > 0) {
				return UP;
			} else {
				return DOWN;
			}
		}
	};

	this.solve = function (other) {
		var dir = this.dir(other);

		if (dir == RIGHT) {
			return new vec2 (other.pos.x - other.size.x/2 - this.size.x/2, this.pos.y);
		} else if (dir == LEFT) {
			return new vec2 (other.pos.x + other.size.x/2 + this.size.x/2, this.pos.y);
		} else if (dir == DOWN) {
			return new vec2 (this.pos.x, other.pos.y - other.size.y/2 - this.size.y/2);
		} else if (dir == UP) {
			return new vec2 (this.pos.x, other.pos.y + other.size.y/2 + this.size.y/2);
		}
	}
}
