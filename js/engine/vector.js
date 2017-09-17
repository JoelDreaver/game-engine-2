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

function vec2 (x, y) {
	this.x = x;
	this.y = y;

	this.clone = function () {
		return (new vec2 (this.x, this.y));
	};

	this.eq = function (other) {
		return (this.x == other.x && this.y == other.y);
	};

	this.add = function (other) {
		return (new vec2 (this.x + other.x, this.y + other.y));
	};

	this.sub = function (other) {
		return (new vec2 (this.x - other.x, this.y - other.y));
	};

	this.mul = function (other) {
		return (new vec2 (this.x * other.x, this.y * other.y));
	};

	this.div = function (other) {
		return (new vec2 (this.x / other.x, this.y / other.y));
	};

	this.len = function () {
		return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2), 0.5);
	};

	this.dist_to = function (other) {
		return this.sub(other).len();
	};

	this.normalized = function () {
		var l = this.len();
		return this.clone().div(new vec2(l, l));
	};

	this.round = function () {
		var vector = this.clone();
		vector.x = Math.round(vector.x);
		vector.y = Math.round(vector.y);
		return vector;
	};

	this.floor = function () {
		var vector = this.clone();
		vector.x = Math.floor(vector.x);
		vector.y = Math.floor(vector.y);
		return vector;
	};
}

function vec3 (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.clone = function () {
		return (new vec3 (this.x, this.y, this.z));
	};

	this.eq = function (other) {
		return (this.x == other.x && this.y == other.y && this.z == other.z);
	};

	this.add = function (other) {
		return (new vec3 (this.x + other.x, this.y + other.y, this.z + other.z));
	};

	this.sub = function (other) {
		return (new vec3 (this.x - other.x, this.y - other.y, this.z - other.z));
	};

	this.mul = function (other) {
		return (new vec3 (this.x * other.x, this.y * other.y, this.z * other.z));
	};

	this.div = function (other) {
		return (new vec3 (this.x / other.x, this.y / other.y, this.z / other.z));
	};

	this.len = function () {
		return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2), 0.5);
	};

	this.dist_to = function (other) {
		return this.sub(other).len();
	};

	this.normalized = function () {
		var l = this.len();
		return this.clone().div(new vec3(l, l, l));
	};

	this.round = function () {
		var vector = this.clone();
		vector.x = Math.round(vector.x);
		vector.y = Math.round(vector.y);
		vector.z = Math.round(vector.z);
		return vector;
	};

	this.floor = function () {
		var vector = this.clone();
		vector.x = Math.floor(vector.x);
		vector.y = Math.floor(vector.y);
		vector.z = Math.floor(vector.z);
		return vector;
	};

	this.to_array = function () {
		return [this.x, this.y, this.z];
	};
}
