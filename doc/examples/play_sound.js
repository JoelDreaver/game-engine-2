var my_engine = new engine(function(e) {
	this.engine = e;
	this.size = new vec2 (640, 480);

	this.init = function () {
		var sound_1 = my_engine.assets.load_sound ("<INSERT SOUND FILE NAME HERE>");
		sound_1.volume(0.5);	// Set volume
		sound_1.play();	// Play sound
	};


	this.update = function(dtime) {
	};
});

my_engine.assets.preload_sound("<INSERT SOUND FILE NAME HERE>");
