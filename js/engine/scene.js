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

function scene () {
	this.ids = {};
	this.objects = [];

	this.init = function () {
	};

	this.push = function (name, object) {
		this.objects.push(object);
		this.ids[name] = this.objects.length-1;
	};

	this.remove = function (name) {
		if (this.ids.hasOwnProperty(name) && this.ids[name] != -1) {
			var object = this.objects.splice(this.ids[name], 1);
			delete this.ids[name];
			return object[0];
		}
	};

	this.find = function (name) {
		if (this.ids.hasOwnProperty(name) && this.ids[name] != -1) {
			return this.objects[this.ids[name]];
		}
	};

	this.render = function () {
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].render ();
		}
	};

	this.update = function (dtime) {
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].update (dtime);
		}
	};

	this.render = function () {
		for (var i = 0; i < this.objects.length; i++) {
			this.objects[i].render ();
		}
	};
};
