///<reference path="../rtts.d.ts" />
import './../rtts';


class A {

	@cast('int') foo :any = '1.1';
	//@tstring static bar :string= 'abc';
	//@type baz(@tint x :int, @tfloat y :float) {return x + y;}

	@type doany(@cast('int') x) {
		console.log(x);
	}
}

let a1 = new A;
a1.doany('123abc');
//a1.foo = 'abc';
console.log(a1.foo);
//A.bar = 123;
//console.log(A.bar);
//console.log(a1.baz(10, 8.4));
