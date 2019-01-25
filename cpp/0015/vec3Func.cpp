/*	vec3Func.cpp	Functions related to vector operations.		Sparisoma Viridi | https://github.com/dudung/butiran		Compile: g++ vec3Func.cpp -o vec3Func	Execute: ./vec3Func		20190125	Modify vec3Unit for this program.	0604 Start at home.*/#include <iostream>#include <cmath>#include <cstdlib>#include <cstring>#include <sstream>using namespace std;// Define class of Vector3class Vector3 {public:	double x;	double y;	double z;	Vector3(void);	Vector3(double, double, double);};Vector3::Vector3(void) {	x = 0;	y = 0;	z = 0;}Vector3::Vector3(double xx, double yy, double zz) {	x = xx;	y = yy;	z = zz;}// Declare functions nameVector3 add(Vector3, Vector3);Vector3 sub(Vector3, Vector3);Vector3 cross(Vector3, Vector3);double dot(Vector3, Vector3);double len(Vector3);Vector3 mul(Vector3, double);Vector3 div(Vector3, double);Vector3 mul(double, Vector3);Vector3 unit(Vector3);string strval(Vector3);// Main functionint main(int argc, char *argv[]) {		Vector3 r1(3, 4, 12);	cout << "r1 = " << strval(r1) << endl;	Vector3 r2(1, 3, 2);	cout << "r2 = " << strval(r2) << endl;	Vector3 r3 = add(r1, r2);	cout << "r3 = r1 + r2 = " << strval(r3) << endl;	Vector3 r4 = sub(r1, r2);	cout << "r4 = r1 - r2 = " << strval(r4) << endl;	Vector3 r5 = cross(r1, r2);	cout << "r5 = r1 x r2 = " << strval(r5) << endl;	double l6 = dot(r1, r2);	cout << "l6 = r1 . r2 = " << l6 << endl;	double l7 = len(r1);	cout << "l7 = |r7| = " << l7 << endl;	Vector3 r8(3.0/sqrt(2), 4.0/sqrt(2), 5.0/sqrt(2));	cout << "r8 = " << strval(r8) << endl;	double l8 = len(r8);	cout << "l8 = |r8| = " << l8 << endl;	Vector3 u8 = unit(r8);	cout << "u8 = " << strval(u8) << endl;		return 0;}// Add two vectorsVector3 add(Vector3 r1, Vector3 r2) {	Vector3 r3;	r3.x = r1.x + r2.x;	r3.y = r1.y + r2.y;	r3.z = r1.z + r2.z;	return r3;}// Sub two vectorsVector3 sub(Vector3 r1, Vector3 r2) {	Vector3 r3;	r3.x = r1.x - r2.x;	r3.y = r1.y - r2.y;	r3.z = r1.z - r2.z;	return r3;}// Cross two vectorsVector3 cross(Vector3 r1, Vector3 r2) {	Vector3 r3;	r3.x = r1.y * r2.z - r1.z * r2.y;	r3.y = r1.z * r2.x - r1.x * r2.z;	r3.z = r1.x * r2.y - r1.y * r2.x;	return r3;}// Dot two vectorsdouble dot(Vector3 r1, Vector3 r2) {	double proj = r1.x * r2.x + r1.y * r2.y + r1.z * r2.z;	return proj;}// Length of a vectordouble len(Vector3 r) {	double l = sqrt(dot(r, r));	return l;}// Mul vector with scalarVector3 mul(Vector3 r, double l) {	Vector3 s;	s.x = r.x * l;	s.y = r.y * l;	s.z = r.z * l;	return s;}// Mul scalar with vectorVector3 div(Vector3 r, double l) {	Vector3 s;	s.x = r.x / l;	s.y = r.y / l;	s.z = r.z / l;	return s;	}// Div vector with scalarVector3 mul(double l, Vector3 r) {	Vector3 s;	s.x = r.x * l;	s.y = r.y * l;	s.z = r.z * l;	return s;	}// Unit of a vectorVector3 unit(Vector3 r) {	double l = len(r);	Vector3 u = div(r, l);	return u;}// String representation of a vectorstring strval(Vector3 r) {	ostringstream oss;	oss << "(";	oss << r.x;	oss << ", ";	oss << r.y;	oss << ", ";	oss << r.z;	oss << ")";	return oss.str();}