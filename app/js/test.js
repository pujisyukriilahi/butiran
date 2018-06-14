/*
	test.js
	Test butiran.js
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180603
	Create this test and collect previous functions from
	index.html file, after it succeeds there.
	20180612
	Add test from gstd basic.
*/

// 20180612.1749 ok
function test_gstd_basic() {
	var Nx = 5;
	var Ny = 5;
	var Nz = 5;
	var tabBlock = Tablet.createBlockTablet(Nx, Ny, Nz);
	console.log(tabBlock[1]);
	
	Tablet.setMaxValue(tabBlock, 10);
	console.log(tabBlock[2]);
	
	Tablet.stepDissolve(tabBlock);
	console.log(tabBlock[2]);
	
	Tablet.stepDissolve(tabBlock);
	console.log(tabBlock[2]);
}

// 20180603.1438 ok
function test_magnetic() {
	var g1 = new Grain();
	g1.r = new Vect3(-1, 0, 0);
	g1.v = new Vect3(0, 1, 0);
	g1.q = 1;
	
	var g2 = new Grain();
	g2.r = new Vect3(1, 0, 0);
	g2.v = new Vect3(0, 1, 0);
	g2.q = 1;
	
	var magnetic = new Magnetic();
	magnetic.setField(new Vect3(0, 0, -1));
	var force1 = magnetic.force(g1);
	console.log(force1);
	
	magnetic.setConstant(1);
	var force12 = magnetic.force(g1, g2);
	console.log(force12);	
}

// 20180603.1342 !ok
function test_drag() {
	var grain = new Grain();
	grain.v = new Vect3(1, 0, 0);
	
	var drag = new Drag();
	drag.setConstant(0, 1, 0);
	drag.setField(new Vect3(1, 0, 0));
	
	var force = drag.force(grain);
	console.log(force);
}

// 20180603.1317 ok
function test_spring() {
	var g1 = new Grain();
	g1.r = new Vect3(-1, 0, 0);
	g1.v = new Vect3(0, 0, 0);
	var g2 = new Grain();
	g2.r = new Vect3(1, 0, 0);
	g2.v = new Vect3(1, 0, 0);
	
	var spring = new Spring();
	spring.setConstant(1000, 1);
	spring.setUncompressedLength(3);
	var force12 = spring.force(g1, g2);
	console.log(force12);
}

// 20180603.1233 ok
function test_normal() {
	var g1 = new Grain();
	g1.m = 1;
	g1.D = 3;
	g1.r = new Vect3(-1, 0, 0);
	g1.v = new Vect3(0, 0, 0);
	var g2 = new Grain();
	g2.m = 1;
	g2.D = 2;
	g2.r = new Vect3(1, 0, 0);
	g2.v = new Vect3(1, 0, 0);
	
	var normal = new Normal();
	normal.setConstant(1000, 1);
	var force12 = normal.force(g1, g2);
	console.log(force12);
}

// 20180603.1155 ok
function test_electrostatic() {
	var grain1 = new Grain();
	grain1.q = -1;
	grain1.r = new Vect3(-1, 0, 0);
	
	var grain2 = new Grain();
	grain2.q = 4;
	grain2.r = new Vect3(1, 0, 0);
	
	var electrostatic = new Electrostatic();
	electrostatic.setField(new Vect3(2, 0, 0));
	var force1 = electrostatic.force(grain1);
	console.log(force1);
	
	electrostatic.setConstant(1);
	var force12 = electrostatic.force(grain1, grain2);
	console.log(force12);
}

// 20180603.1152 ok
function test_gravitation() {
	var grain1 = new Grain();
	grain1.m = 1;
	grain1.r = new Vect3(-1, 0, 0);
	
	var grain2 = new Grain();
	grain2.m = 4;
	grain2.r = new Vect3(1, 0, 0);
	
	var gravitational = new Gravitational();
	gravitational.setField(new Vect3(0, 0, -10));
	var force1 = gravitational.force(grain1);
	console.log(force1);
	
	gravitational.setConstant(1);
	var force12 = gravitational.force(grain1, grain2);
	console.log(force12);
}

// 20180603.1021 ok
function test_buoyant() {
	var buoyant = new Buoyant();
	buoyant.setFluidDensity(1000);
	buoyant.setGravity(new Vect3(0, 0, -10));
	var V = 1;
	var force = buoyant.force(1);
	console.log(force);
}

// 20180527.1607 ok
function test_grain() {
	var grain = new Grain();
	console.log(grain.strval());
}

// 20180527.1527 ok
function test_vect3() {
	var a = new Vect3();
	console.log(a.strval());
	var b = new Vect3(1, 2, 0);
	console.log(b.strval());
	a = new Vect3(1, -2, 1);
	console.log(a.strval());
	var c = Vect3.add(a, b);
	console.log(c.strval());
	var l = Vect3.dot(a, b);
	console.log(l);
	var d = Vect3.cross(a, b);
	console.log(d.strval());
	var e = d.neg();
	console.log(e.strval());	
}

// 20180520.0000 ok
function test_prev() {
	var seq = new Sequence();
	var poly = new Polynomial();
	var rand = Random;
	console.log(rand.randInt(1, 4));
	console.log(rand.randIntN(1, 4, 10));

	var integ = Integration;

	var rgb = RGB;
	console.log(rgb.int2rgb(255, 0, 128));

	var res = integ.integTrapezError(fx, 0, 10, 1E-3);
	console.log(res);

	function fx(x) {
		return x;
	}

	var tim = new Timer(fx, 10);
	console.log(tim);

	var R = new Resistor(100, 0.5);
	console.log(R.ping(0.1));
}