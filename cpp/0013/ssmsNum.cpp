/*
	ssmsNum.cpp
	Single spring-mass system from numerical and theoretical
	solutions
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ ssmsNum.cpp -o ssmsNum
	Execute: ./ssmsThe
	
	20190115
	0809 Start creating at home.
	2041 Can find bug
	20190116
	0816 Start at campus
*/

#include <iostream>
#include <cstdlib>
#include <cmath>

using namespace std;

int main(int argc, char *argv[]) {
	// Verbose usage
	const char *pname = "ssmsTheNum";
	if(argc < 7) {
		cout << "Usage: " << pname << " [m k xo x0 v0 dt]";
		cout << endl;
		cout << "m\tmass" << endl;
		cout << "k\tspring constant" << endl;
		cout << "xo\torigin of x" << endl;
		cout << "x0\tinitial x" << endl;
		cout << "v0\tinitial v" << endl;
		cout << "dt\tstep of t" << endl;
		return 1;
	}
	
	// Set physical properties
	double m = atof(argv[1]); // 1
	double k = atof(argv[2]); // 4 * M_PI * M_PI * 100;
	
	// Set origin
	double xo = atof(argv[3]); // 0
	
	// Set initial condition
	double x0 = atof(argv[4]); // xo
	double v0 = atof(argv[5]); // 1
	double t0 = 0;
	
	// Calculate omega0 and T0
	double omega0 = sqrt(k / m);
	double T0 = 2 * M_PI / omega0;
	
	double phi0 = atan( (x0 - xo)/(v0 / omega0) ) - omega0 * t0;
	double sin0 = sin(omega0 * t0 + phi0);
	double cos0 = cos(omega0 * t0 + phi0);
	double C;
	if(sin0 != 0) {
		C = (x0 - xo) / sin0;
	} else {
		C = (v0 / omega0) / cos0;
	}
	
	cout << "m = " << m << endl;
	cout << "k = " << k << endl;
	cout << "omega0 = " << omega0 << endl;
	cout << "T0 = " << T0 << endl;
	cout << "phi0 = " << phi0 << endl;
	cout << "C = " << C << endl;
	
	// Set iteration parameters
	double tbeg = t0;
	double tend = 2 * T0;
	double dt = atof(argv[6]);
	double Npoint = 20;
	double Tdata = (tend - tbeg) / Npoint;
	int Ndata = round(Tdata / dt);
	int idata = Ndata;
	double t = tbeg;
	
	cout << tbeg << " ";
	cout << tend << " ";
	cout << dt << " ";
	cout << Tdata << " ";
	cout << Ndata << endl;
	cout << endl;
	
	double x = x0;
	double v = v0;
	cout << "# t\txnum\tvnum\txthe\tvthe" << endl;
	while(t <= tend) {
		
		// Theoretical solutions
		double xt = C * sin(omega0 * t + phi0);
		double vt = omega0 * C * cos(omega0 * t + phi0);
		
		if(idata == Ndata) {
			cout << t << "\t";
			cout << x << "\t";
			cout << v << "\t";
			cout << xt << "\t";
			cout << vt << endl;
			idata = 0;
		}
		
		idata++;
		t +=dt;
		
		// Numerical solutions
		double a = -k*(x - xo);
		v = v + a * dt;
		x = x + v * dt;
	}
	
	// Terminate program
	return 0;
}
