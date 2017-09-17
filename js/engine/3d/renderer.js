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

// Canvas 3d renderer
function renderer3d (e) {
	this.queue = [];
	this.engine = e;

	this.ctx = null;

	this.push = function (item) {
		this.queue.push(item);
	};

	this.init = function () {
		this.ctx = this.engine.canvas.getContext("2d");
	};

	this.clear = function () {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	this.render = function (dtime) {
	};
}

// WebGL 3d renderer
function renderer3d_webgl (e) {
	this.queue = [];
	this.engine = e;

	this.ctx = null;

	this.push = function (item) {
		this.queue.push(item);
	};

	this.init = function () {
	};

	this.clear = function () {
	};

	this.render = function (dtime) {
	};
}
