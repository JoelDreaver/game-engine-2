var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (640, 480);

	this.particle_system = new particle_system (this.engine, this.size.div(new vec2(2, 2)), {
		lifetime : 0.5,
		amount : 400,

		dir : 180,
		spread : 180,
		velocity: 0,

		random : {
			velocity: 100,
			dir : 180
		}
	});

	this.init = function () {
		this.particle_system.pos = this.size.div(new vec2(2, 2));
		this.particle_system.start();
	};

	this.update = function(dtime) {
		this.particle_system.pos = this.engine.input.mouse.pos;

		this.particle_system.update(dtime);
		this.particle_system.render(dtime);
	};
});
