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

var MOUSE_DOWN = 0;
var MOUSE_UP = 1;
var MOUSE_MOVE = 2;

var KEY_DOWN = 3;
var KEY_UP = 4;

function input (e) {
	this.mouse = {
		pos : new vec2 (0, 0),
		pos_start : new vec2 (0, 0),
		last_pos : new vec2 (0, 0),

		pressed : []
	};

	this.keyboard = {
		pressed : []
	}

	this.engine = e;

	this.events_mouse_down = [];
	this.events_mouse_move = [];
	this.events_mouse_up = [];

	this.events_key_down = [];
	this.events_key_up = [];

	this.init = function () {
		var that = this;

		document.onkeydown = function (evt) {
			evt = evt || window.event;

			that.keyboard.pressed[evt.keyCode] = true;

			for (var i = 0; i < that.events_key_down.length; i++) {
				that.events_key_down[i](evt);
			}
		};

		document.onkeyup = function (evt) {
			evt = evt || window.event;

			that.keyboard.pressed[evt.keyCode] = false;

			for (var i = 0; i < that.events_key_up.length; i++) {
				that.events_key_up[i](evt);
			}
		};

		e.canvas.onmousemove = function (evt) {
			evt = evt || window.event;

			that.mouse.pos.x = evt.pageX / that.engine.canvas.offsetWidth * that.engine.canvas.width;
			that.mouse.pos.y = evt.pageY / that.engine.canvas.offsetHeight * that.engine.canvas.height;

			for (var i = 0; i < that.events_mouse_move.length; i++) {
				that.events_mouse_move[i](evt);
			}
		};

		e.canvas.onmousedown = function (evt) {
			evt = evt || window.event;

			that.mouse.pressed[evt.which] = true;
			that.mouse.pos_start.x = evt.pageX / that.engine.canvas.offsetWidth * that.engine.canvas.width;
			that.mouse.pos_start.y = evt.pageY / that.engine.canvas.offsetHeight * that.engine.canvas.height;

			for (var i = 0; i < that.events_mouse_down.length; i++) {
				that.events_mouse_down[i](evt);
			}
		};

		e.canvas.onmouseup = function (evt) {
			evt = evt || window.event;

			that.mouse.pressed[evt.which] = false;

			for (var i = 0; i < that.events_mouse_up.length; i++) {
				that.events_mouse_up[i](evt);
			}
		};
	};

	this.update = function() {
		this.mouse.last_pos = this.mouse.pos.clone();
	};

	this.on = function (evt_type, func) {
		if (evt_type == MOUSE_MOVE) {
			this.events_mouse_move.push(func);
		} else if (evt_type == MOUSE_DOWN) {
			this.events_mouse_down.push(func);
		} else if (evt_type == MOUSE_UP) {
			this.events_mouse_up.push(func);
		} else if (evt_type == KEY_DOWN) {
			this.events_key_down.push(func);
		} else if (evt_type == KEY_UP) {
			this.events_key_up.push(func);
		}
	}
}
