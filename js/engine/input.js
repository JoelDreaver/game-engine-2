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
		pressed : [],
		down    : [],
		up      : []
	};

	this.gamepads = [];

	this.engine = e;

	this.events_mouse_down = [];
	this.events_mouse_move = [];
	this.events_mouse_up = [];

	this.events_key_down = [];
	this.events_key_up = [];

	this.axes = {};
	this.buttons = {};

	this.init = function () {
		var that = this;

		window.addEventListener("gamepadconnected", function (evt) {
			that.gamepads[evt.gamepad.index] = evt.gamepad;
		});

		window.addEventListener("gamepaddisconnected", function (evt) {
			delete that.gamepads[evt.gamepad.index];
		});

		document.onkeydown = function (evt) {
			evt = evt || window.event;

			that.keyboard.pressed[evt.keyCode] = true;
			that.keyboard.down[evt.keyCode] = true;

			for (var i = 0; i < that.events_key_down.length; i++) {
				that.events_key_down[i](evt);
			}
		};

		document.onkeyup = function (evt) {
			evt = evt || window.event;

			that.keyboard.pressed[evt.keyCode] = false;
			that.keyboard.up[evt.keyCode] = true;

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
		this.keyboard.up = [];
		this.keyboard.down = [];
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
	};

	this.register_axis = function (name, def) {
		this.axes[name] = def;
	};

	this.register_button = function (name, def) {
		this.buttons[name] = def;
	};

	this.axis = function (name) {
		if (this.axes.hasOwnProperty(name)) {
			var def = this.axes[name];

			if (def.key_neg && this.keyboard.pressed[def.key_neg]) {
				return -1;
			};

			if (def.key_pos && this.keyboard.pressed[def.key_pos]) {
				return 1;
			};

			if (typeof def.gamepad_id != "undefined" && typeof def.gamepad_axis != "undefined") {
				if (this.gamepads[def.gamepad_id]) {
					var g = this.gamepads[def.gamepad_id];
					return g.axes[def.gamepad_axis];
				}
			}
		}

		return 0;
	};

	this.button = function (name) {
		if (this.buttons.hasOwnProperty(name)) {
			var def = this.buttons[name];

			if (def.key && this.keyboard.pressed[def.key]) {
				return true;
			};

			if (typeof def.gamepad_id != "undefined" && typeof def.gamepad_button != "undefined") {
				if (this.gamepads[def.gamepad_id]) {
					var g = this.gamepads[def.gamepad_id];

					if (typeof g.buttons[def.gamepad_button] == "object") {
						if (g.buttons[def.gamepad_button].pressed) {
							return true;
						}
					} else {
						if (g.buttons[def.gamepad_button] == 1) {
							return true;
						}
					}
				}
			}
		}

		return false;
	};
}
