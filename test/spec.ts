/**
 * Type aliases
 */
type int   = number;
type float = number;

class A {

	@tstring foo :string = 'abc';
	@tnumber static bar :number = 123;

	@tfloat foo :float = 123.321;
	@tint   foo :int   = 123;


	constructor(@tnumber x :number) {
		// ...
	}


	@type mixFoo(@tstring arg :string) :string {
		return this.foo + arg;
	}

	@type mixBar(@cast('int') arg :any) :number {
		return this.bar + arg;
	}

	@type({
		'arguments' : ['string', 'number'],
		'return'	: 'string'
	})
	someDo(a :string, b :number) :string {
		return a + b;
	}

	@type('string') static someDo(@tstring a :string, @tnumber b :number) :string {
		return a + b;
	}

	@TParameter(String, Number)
	@TReturn(String)
	doSome(a :string, b :number) :string {
		return a + b;
	}
}
