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

var SPRITE = 0;
var SPRITE_ANIMATED = 1;
var RECT = 2;
var PATH = 3;

var CENTER = 0;
var CORNER = 1;

// TODO
function renderer (e) {
	this.queue = [];
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
		this.queue.push(item);
	};

	this.init = function () {
		this.ctx = this.engine.canvas.getContext("2d");
	};

	this.clear = function () {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	this.render = function (dtime) {
		this.ctx.translate(this.viewport.x, this.viewport.y);

		if (this.effects.shake.timer > 0) {
			this.effects.shake.x = Math.round(Math.random()*this.effects.shake.val - this.effects.shake.val/2);
			this.effects.shake.y = Math.round(Math.random()*this.effects.shake.val - this.effects.shake.val/2);

			this.ctx.translate(this.effects.shake.x, this.effects.shake.y);
		} else {
			this.effects.shake.x = 0;
			this.effects.shake.y = 0;
		}

		while (this.queue.length > 0) {
			var item = this.queue.splice(0, 1)[0];

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

		this.ctx.translate(-this.viewport.x, -this.viewport.y);
	};
}


function renderer_webgl (e) {
	this.queue = [];
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

	this.gl = null;
	this.program = null;
	this.buffer = null;

	this.init = function () {
		this.gl = this.engine.canvas.getContext("webgl") || this.engine.canvas.getContext("experimental-webgl");

		if (!this.gl) {
			alert("WebGL not supported");
		}

		this.gl.viewport(0, 0, this.engine.canvas.width, this.engine.canvas.height)

		this.gl.clearColor(0, 0, 0, 0);
		this.program = this.init_shaders();

		var tri = [
			0.5, -0.5,
			-0.5, 0.5,
			-0.5, -0.5,

			0.5, -0.5,
			-0.5, 0.5,
			0.5, 0.5
		];
		this.buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tri), this.gl.DYNAMIC_DRAW);

		this.gl.vertexAttribPointer(
			this.gl.getAttribLocation(this.program, "vertex_pos"),
			2,
			this.gl.FLOAT,
			this.gl.FALSE,
			2*4,
			0
		);

		this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.program, "vertex_pos"));
	};

	this.clear = function () {
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPHT_BUFFER_BIT);
	};

	this.push = function (item) {
		this.queue.push(item);
	};

	this.compile_shader = function (t, text) {
		var type = (t == 0 ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER);
		var shader = this.gl.createShader(type);
		this.gl.shaderSource(shader, text);
		this.gl.compileShader(shader);

		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			alert("[error][shader] " + this.gl.getShaderInfoLog(shader));
			this.gl.deleteShader(shader);
			return;
		}

		return shader;
	};

	this.init_shaders = function () {
		var ver = this.compile_shader(0, [
			"attribute vec2 vertex_pos;",
			"void main (void) {",
			"	gl_Position = vec4(vertex_pos, 1.0, 1.0);",
			"}"
		].join("\n"));

		var frag = this.compile_shader(1, [
			"void main (void) {",
			"	gl_FragColor = vec4(1, 1, 1, 1);",
			"}"
		].join("\n"));

		if (ver && frag) {
			var prog = this.gl.createProgram();
			this.gl.attachShader(prog, ver);
			this.gl.attachShader(prog, frag);
			this.gl.linkProgram(prog);

			if (!this.gl.getProgramParameter(prog, this.gl.LINK_STATUS)) {
				alert("[error][shader][link] " + this.gl.getProgramLogInfo(prog));
			}

			this.gl.useProgram(prog);
			return prog;
		} else {
			console.log("[error]");
		}
	};

	this.get_pos = function (pos) {
		return new vec2(pos.x, -pos.y+this.engine.canvas.height).add(this.viewport).div(new vec2(this.engine.canvas.width, this.engine.canvas.height)).sub(new vec2(0.5, 0.5));
	};

	this.render = function (dtime) {
		var tris = [];

		for (var i = 0; i < this.queue.length; i++) {
			var item = this.queue[i];
			var p = this.get_pos(item.pos);
			var x1 = p.x;
			var y1 = p.y;
			var x2 = p.x;
			var y2 = p.y;

			if (item.size) {
				var p2 = this.get_pos(item.pos.add(item.size));
				x2 = p2.x;
				y2 = p2.y;
			} else {
				var p2 = this.get_pos(item.pos.add(new vec2(item.sprite.width, item.sprite.height)));
				x2 = p2.x;
				y2 = p2.y;
			}

			//1

			tris.push(x1);
			tris.push(y1);

			tris.push(x2);
			tris.push(y1);

			tris.push(x2);
			tris.push(y2);

			//2

			tris.push(x1);
			tris.push(y1);

			tris.push(x1);
			tris.push(y2);

			tris.push(x2);
			tris.push(y2);

		}

		console.log("Tri: " + tris.length);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(tris), this.gl.DYNAMIC_DRAW);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, tris.length/2);

		this.queue = [];
	};
}
