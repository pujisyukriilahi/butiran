/*
	fd_fcbsbcm.js
	Fast charging battery simulation based on capacitor model
	
	Sparisoma Viridi | dudung@gmail.com
	Felix Pasila | felix@petra.ac.id
	Hendro | hendro@fi.itb.ac.id
	
	Execute: node fcbs.js -- not for html version
	
	Version info:
		Node.js	v10.1.0  -- not for html version
	
	20180512
	Create this application as empty HTML file.
	20180513
	Start to build the layout.
	20180518
	Continue developing the application.
	20180520
	Change filename from app/capacitor_charging.html to
	app/butiran/app/fast_charging_battery.js as part of
	butiran.js project, and move the old one into sandbox.
	20180929
	Change name according to new naming convention and port
	italic to html.
	20180930
	Do some adjustment while porting it to html version.
	Use valueBetween function from text tab.
	CDN https://rawgit.com/dudung/butiran/master/app
	/fd_fcbsbcm.html
	20181120
	Comment call of main function and change file to JS.
*/


// Define some global variables
var t, dt, tbeg, tend;
var digit;
var ptn, seq, amp;
var R, C, T, Tint, Rmin, Rmax, Rint, q;
var SG;
var tdata, VSdata, RCdata, VCdata, UCdata;

var Tdata, sample;
var proc;
var tabs1, tabs2, bgroup;
var coordMin, coordMax;

// Call main function
main();

// Define main function
function main() {
	// Set layout of elements
	setLayout();
	
	// Set timer for processing simulation
	proc = new Timer(simulate, 1);
}

// Perform simulation
function simulate() {

	// Format time t
	t = +t.toFixed(10);
	
	// Show data header in Results tab
	if(t < tbeg + dt) {
		tabs1.text("Results").push("#t VS RC VC");
	}
	
	// Perform simulation
	var signal = SG.ping();
	var VS = signal[1];
	var r = Rint.ping(dt, VS);
	
	var q1 = q * (1 - dt / (C * (R + r)));
	var q2 = (C * VS * dt) / (C * (R + r));
	q = q1 + q2;
	
	var VC = C * q;
	var UC = 0.5 * C * VC * VC;
	
	var linestr = t.toFixed(digit) + " ";
	linestr += VS + " ";
	linestr += r.toFixed(digit) + " ";
	linestr += VC.toExponential(digit) + " ";
	linestr += UC.toExponential(digit);
	
	tabs1.text("Results").push(linestr);
	var taRes = tabs1.element("Results");
	taRes.scrollTop = taRes.scrollHeight;
	
	// Display result in certain period of time
	if(sample.sampling()) {
		tdata.push(t);
		VSdata.push(VS);
		RCdata.push(r);
		VCdata.push(VC);
		UCdata.push(UC);
		
		// Clear drawing area
		tabs2.graphic("tVS").clear();
		tabs2.graphic("tRC").clear();
		tabs2.graphic("tVC").clear();
		tabs2.graphic("tUC").clear();
		
		// Set range dynamically
		tabs2.graphic("tVC").setCoord(
			[tbeg, 0, tend, Math.max(...VCdata)]
		);	
		tabs2.graphic("tUC").setCoord(
			[tbeg, 0, tend, Math.max(...UCdata)]
		);	
		
		// Draw curve of source voltage
		tabs2.graphic("tVS").setLineColor("#00f");	
		tabs2.graphic("tVS").lines(tdata, VSdata);
		
		// Draw curve of source voltage
		tabs2.graphic("tRC").setLineColor("#0f0");	
		tabs2.graphic("tRC").lines(tdata, RCdata);
		
		// Draw curve of capacitor voltage
		tabs2.graphic("tVC").setLineColor("#f00");	
		tabs2.graphic("tVC").lines(tdata, VCdata);
		
		// Draw curve of capacitor voltage
		tabs2.graphic("tUC").setLineColor("#0ff");	
		tabs2.graphic("tUC").lines(tdata, UCdata);
	}
	
	// Terminate simulation when end time is reached
	if(t >= tend) {
		proc.stop();
		var ts = Timer.ts() + "|";
		tabs1.text("Log").push(ts + "Simulation stopped t = tend");
		bgroup.disable("Start");
		bgroup.setCaption("Start").to("Start");
		bgroup.enable("Draw");
	}
	
	// Increase time t
	t += dt;
}

// Set layout of elements
function setLayout() {
	// Create title page
	var p = document.createElement("p");
	p.innerHTML = "Fast charging battery simulation " +
		"based on capacitor model";
	p.style.fontWeight = "bold";
	document.body.append(p);

	// Define first Tabs --add "document.body" to avoid warning
	tabs1 = new Tabs("tabs1", "document.body");
	tabs1.setWidth("450px");
	tabs1.setHeight("300px");
	tabs1.addTab("Log", 0);
	tabs1.addTab("Params", 0);
	tabs1.addTab("Results", 0);
	
	// Define second Tabs --add "document.body" to avoid warning
	tabs2 = new Tabs("tabs2", "document.body");
	tabs2.setWidth("300px");
	tabs2.setHeight("300px");
	tabs2.addTab("tVS", 1);
	tabs2.addTab("tRC", 1);
	tabs2.addTab("tVC", 1);
	tabs2.addTab("tUC", 1);
	
	// Clear all tabs
	tabs1.text("Params").clear();
	tabs1.text("Results").clear();
	tabs1.text("Log").clear();
	tabs2.graphic("tVS").clear();
	tabs2.graphic("tRC").clear();
	tabs2.graphic("tVC").clear();
	tabs2.graphic("tUC").clear();

	// Define bgroup
	bgroup = new Bgroup("bgroup", "document.body");
	bgroup.setWidth("60px");
	bgroup.setHeight("147px");
	bgroup.addButton("Clear");
	bgroup.addButton("Load");
	bgroup.addButton("Read");
	bgroup.addButton("Start");
	bgroup.addButton("Draw");
	bgroup.addButton("Help");
	bgroup.addButton("About");
	bgroup.disable("Read");
	bgroup.disable("Start");
	bgroup.disable("Draw");
}

// Load parameters
function loadParameters() {
	tabs1.text("Params").push("# Components");
	tabs1.text("Params").push("RESISTOR 10");
	tabs1.text("Params").push("CAPACITOR 0.001");
	tabs1.text("Params").push("TINT 0.2");
	tabs1.text("Params").push("RMIN 10");
	tabs1.text("Params").push("RMAX 1000");
	tabs1.text("Params").push();
	
	tabs1.text("Params").push("# Signal");
	tabs1.text("Params").push("AMP 100");
	tabs1.text("Params").push("SEQBEG");
	tabs1.text("Params").push("0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0");
	tabs1.text("Params").push("0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0");
	tabs1.text("Params").push("0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0");
	tabs1.text("Params").push("0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0");
	tabs1.text("Params").push("0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0");
	tabs1.text("Params").push("0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0");
	tabs1.text("Params").push("0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0");
	tabs1.text("Params").push("0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0");
	tabs1.text("Params").push("0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0");
	tabs1.text("Params").push("SEQEND");
	tabs1.text("Params").push();

	tabs1.text("Params").push("# Simulation");
	tabs1.text("Params").push("TSTEP 0.001");
	tabs1.text("Params").push("TDATA 1E-1");
	tabs1.text("Params").push("TBEG 0");
	tabs1.text("Params").push("TEND 3");
	tabs1.text("Params").push();
	
	tabs1.text("Params").push("# Visualization");
	tabs1.text("Params").push("COORDMIN -1 -1 -1");
	tabs1.text("Params").push("COORDMAX 1 1 1");
	var ta = tabs1.element("Params");
	ta.scrollTop = ta.scrollHeight;
}
	
// Get parameters
function readParameters() {
	var text = tabs1.element("Params").value;
	
	R = Parse.getFrom(text).valueOf("RESISTOR");
	C = Parse.getFrom(text).valueOf("CAPACITOR");
	T = R * C;
	Tint = Parse.getFrom(text).valueOf("TINT");
	Rmin = Parse.getFrom(text).valueOf("RMIN");
	Rmax = Parse.getFrom(text).valueOf("RMAX");
	Rint = new Resistor(Rmin, Rmax, Tint);
	q = 0;
	
	dt = Parse.getFrom(text).valueOf("TSTEP");
	Tdata = Parse.getFrom(text).valueOf("TDATA");
	tbeg = Parse.getFrom(text).valueOf("TBEG");
	tend = Parse.getFrom(text).valueOf("TEND");
	t = tbeg;
	
	// Define significant digit
	digit = -Math.floor(Math.log(dt) / Math.exp(1));
	
	// Get signal information and define generator
	amp = Parse.getFrom(text).valueOf("AMP");
	ptn = Parse.getFrom(text).valueBetween("SEQBEG", "SEQEND");
	seq = new Sequence(ptn);
	SG = new Generator(dt, [seq], [amp]);
	
	coordMin = Parse.getFrom(text).valueOf("COORDMIN");
	coordMax = Parse.getFrom(text).valueOf("COORDMAX");
	
	// Initiate time
	t = tbeg;
	
	// Initialize data
	tdata = [];
	VSdata = [];
	RCdata = [];
	VCdata = [];
	UCdata = [];
	
	// Set sampling
	sample = new Sample(Tdata, dt);
	
	// Set coordinate ranges
	tabs2.graphic("tVS").setCoord([tbeg, 0, tend, amp]);
	tabs2.graphic("tRC").setCoord([tbeg, Rmin, tend, Rmax]);
	tabs2.graphic("tVC").setCoord([tbeg, 0, tend, amp]);	
	tabs2.graphic("tUC").setCoord([tbeg, 0, tend, amp]);	
}	

// Log something and show manually	
function log() {
	try { 
		console.log(
			showOnly(logjs).forFilter(
				{
					app: "spfwfs",
					date: "20180714",
					after: "0500",
				}
			)
		);
	}
	catch(err) {
		var msg = "opsebf logs only in development stage";
		console.warn(msg);
	}
}

// Do something when buttons clicked
function buttonClick(event) {
	var target = event.target;
	
	if(target.innerHTML == "Start") {
		target.innerHTML = "Stop";
		proc.start();
		var ts = Timer.ts() + "|";
		tabs1.text("Log").push(ts + "Simulation is starting");
		var ta = tabs1.element("Log");
		ta.scrollTop = ta.scrollHeight;
		bgroup.disable("Draw");
	} else if(target.innerHTML == "Stop"){
		target.innerHTML = "Start";
		proc.stop();
		var ts = Timer.ts() + "|";
		tabs1.text("Log").push(ts + "Simulation stopped");
		var ta = tabs1.element("Log");
		ta.scrollTop = ta.scrollHeight;
		bgroup.enable("Draw");
	}
	
	if(target.innerHTML == "About") {
		alert(
			"fd_fcbsbcm | "
			+ "Fast charging battery simulation " 
			+ "based on capacitor model"
			+ "\n"
			+ "Version 20180929"
			+ "\n"
			+ "Sparisoma Viridi | dudung@gmail.com"
			+ "\n"
			+ "Felix Pasila | felix@petra.ac.id"
			+ "\n"
			+ "Hendro | hendro@fi.itb.ac.id"
			+ "\n"
			+ "\n"
			+ "Based on butiran "
			+ "| https://github.com/dudung/butiran"
			+ "\n"
			+ "MIT License | "
			+ "Copyright (c) 2018 Sparisoma Viridi"
		);
		var ts = Timer.ts() + "|";
		tabs1.text("Log").push(ts + "About is called");
		var ta = tabs1.element("Log");
		ta.scrollTop = ta.scrollHeight;
	}
	
	if(target.innerHTML == "Help") {
		alert(""
			+ "[Clear]    clear all text and graphic\n"
			+ "[Load]     load default parameters\n"
			+ "[Read]     read parameters from text\n"
			+ "[Start]     start simulation\n"
			+ "[Draw]     draw final results\n"
			+ "[Help]     show this help\n"
			+ "[About]   describe this application\n"
		);
		var ts = Timer.ts() + "|";
		tabs1.text("Log").push(ts + "Help is called");
		var ta = tabs1.element("Log");
		ta.scrollTop = ta.scrollHeight;
	}
	
	if(target.innerHTML == "Load") {
		tabs1.text("Params").clear();
		loadParameters();
		var ts = Timer.ts() + "|";
		tabs1.text("Log").push(ts + "Default parameters are loaded");
		var ta = tabs1.element("Log");
		ta.scrollTop = ta.scrollHeight;
		bgroup.enable("Read");
	}
	
	if(target.innerHTML == "Read") {
		readParameters();
		var ts = Timer.ts() + "|";
		tabs1.text("Log").push(ts + "Parameters are read");
		var ta = tabs1.element("Log");
		ta.scrollTop = ta.scrollHeight;
		bgroup.enable("Start");
	}
	
	if(target.innerHTML == "Clear") {
		tabs1.text("Params").clear();
		tabs1.text("Results").clear();
		tabs1.text("Log").clear();
		tabs2.graphic("tVS").clear();
		tabs2.graphic("tRC").clear();
		tabs2.graphic("tVC").clear();
		var ts = Timer.ts() + "|";
		tabs1.text("Log").push(ts + "Parameters, Results, "
			+ "and Log are cleared");
		tabs1.text("Log").push(ts + "xy "
			+ "is cleared");
		var ta = tabs1.element("Log");
		ta.scrollTop = ta.scrollHeight;
		bgroup.disable("Read");
		bgroup.disable("Start");
	}
	
	if(target.innerHTML == "Draw") {
		drawResults();
		var ts = Timer.ts() + "|";
		tabs1.text("Log").push(ts + "Results will be drawn");
		var ta = tabs1.element("Log");
		ta.scrollTop = ta.scrollHeight;
	}
}

// Draw on chart
function drawResults() {
	// Get results
	var text = tabs1.element("Results").value;
	var lines = text.split("\n");
	if(lines[0].indexOf("#") != -1) {
		lines.shift();
	}
	text = lines.join("\n");
	var tt = Parse.getFrom(text).column(0);
	var vs = Parse.getFrom(text).column(1);
	var rc = Parse.getFrom(text).column(2);
	var vc = Parse.getFrom(text).column(3);
	var uc = Parse.getFrom(text).column(4);
	
	// Draw on related chart
	tabs2.graphic("tVS").clear();
	tabs2.graphic("tVS").setLineColor("#00f");	
	tabs2.graphic("tVS").lines(tt, vs);
	
	tabs2.graphic("tRC").clear();
	tabs2.graphic("tRC").setLineColor("#0f0");	
	tabs2.graphic("tRC").lines(tt, rc);
	
	tabs2.graphic("tVC").clear();
	tabs2.graphic("tVC").setCoord(
		[tbeg, 0, tend, Math.max(...vc)]
	);	
	tabs2.graphic("tVC").setLineColor("#f00");	
	tabs2.graphic("tVC").lines(tt, vc);
	
	tabs2.graphic("tUC").clear();
	tabs2.graphic("tUC").setCoord(
		[tbeg, 0, tend, Math.max(...uc)]
	);	
	tabs2.graphic("tUC").setLineColor("#0ff");	
	tabs2.graphic("tUC").lines(tt, uc);
}
