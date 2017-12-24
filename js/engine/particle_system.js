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

function particle (sys, pos, velocity) {
	this.pos = pos;
	this.velocity = velocity;
	this.age = 0;
	this.color = sys.color;
	this.particle_system = sys;

	this.update = function (dtime) {
		this.age += dtime;
		this.velocity = this.velocity.add (this.particle_system.gravity.mul(new vec2(dtime, dtime)))
		this.pos = this.pos.add(this.velocity.mul(new vec2(dtime, dtime)));
	};

	this.render = function () {
		if (this.particle_system.round_pos) {
			var pos = this.pos.round();
		} else {
			var pos = this.pos;
		}

		if (this.particle_system.sprite) {
			this.particle_system.engine.renderer.push ({
				type : SPRITE,
				pos  : pos,
				sprite : this.particle_system.sprite
			});
		} else {
			this.particle_system.engine.renderer.push ({
				type : RECT,
				pos  : pos,
				size : this.particle_system.size,
				color: this.color
			});
		}
	};
};

function particle_system (e, pos, config) {
	this.engine = e;
	this.pos = pos;

	this.amount = config.amount || 1;			// amount of particles per second
	this.lifetime = config.lifetime || 0;	// lifetime of each particle
	this.timeout = config.timeout || 0;

	this.velocity = config.velocity || 0;
	this.dir = config.dir || 0;
	this.spread = config.spread || 0;
	this.gravity = config.gravity || new vec2 (0, 0);
	this.round_pos = config.round_pos || false;

	this.sprite = config.sprite || null;
	this.size = config.size || new vec2 (10, 10);
	this.color = config.color || "#000";

	this.random = {
		dir : config.random.dir || 0,
		velocity : config.random.velocity || 0
	};


	this.particles = [];
	this.timer = 0;
	this.emit_timer = 0;
	this.is_emitting = false;

	this.update = function (dtime) {
		if (this.is_emitting) {
			this.timer += dtime;
			this.emit_timer += dtime;

			if (this.timeout != 0 && this.timer >= this.timeout) {
				this.stop();
			}

			while (this.emit_timer >= 1/this.amount) {
				this.emit_timer -= 1/this.amount;

				var r = utils.deg2rad(this.random.dir);
				var d = utils.deg2rad(this.dir)+(Math.random()*r*2-r);
				var s = this.velocity + (Math.random()*this.random.velocity*2-this.random.velocity);
				var v = new vec2(s*Math.sin(d), s*Math.cos(d));
				this.particles.push (new particle(this, this.pos, v));
			}
		}

		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].update(dtime);

			if (this.particles[i].age >= this.lifetime) {
				this.particles.splice(i, 1);
			}
		}
	};

	this.render = function () {
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].render();
		}
	};

	this.start = function () {
		this.is_emitting = true;
		this.timer = 0;
	};

	this.stop = function () {
		this.is_emitting = false;
	};
};
