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

function engine (my_game) {
	this.last_time = 0;
	this.renderer = new renderer(this);
	this.assets = new assets();
	this.game = new my_game (this);
	this.input = new input(this);

	this.canvas = null;

	this.time_scale = 1;

	this.load = function () {
		this.canvas = document.getElementById("canvas");
		this.canvas.width = this.game.size.x;
		this.canvas.height = this.game.size.y;
		//this.ctx = this.canvas.getContext("2d");

		this.input.init();
		this.game.init();

		if (this.renderer.init) {
			this.renderer.init();
		}

		window.requestAnimationFrame(this.update);
	};

	this.update = (t => {
		var dtime = (t - this.last_time) / 1000.0;

		if (dtime < 0.3) {
			this.renderer.clear();

			this.game.update(dtime * this.time_scale);
			this.renderer.render(dtime * this.time_scale);

			this.input.update();
		}

		this.last_time = t;
		window.requestAnimationFrame(this.update);
	});
}
