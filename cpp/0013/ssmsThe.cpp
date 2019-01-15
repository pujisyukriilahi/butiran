/*
	ssmsThe.cpp
	Single spring-mass system from theoretical solution
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ ssmsThe.cpp -o ssmsThe.
	Execute: ./ssmsThe
	
	20190115
	0809 Start creating at home.
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	double p, l, t, V, m, rho;
	
	p = atof(argv[1]);
	l = atof(argv[2]);
	t = atof(argv[3]);
	m = atof(argv[4]);
	
	// Read length, width, height
	cout << "p = " << p << endl;
	cout << "l = " << l << endl;
	cout << "t = " << t << endl;
	
	// Calculate volume
	V = p * l * t;
	cout << "V = " << V << endl;
	
	// Read mass
	cout << "m = " << m << endl;
	
	// Calculate density
	rho = m / V;
	cout << "rho = " << rho << endl;
	
	// Terminate program
	return 0;
}
