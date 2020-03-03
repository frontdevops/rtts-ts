#RTTS-TS
Library of TypeScript decorators for RunTime Type System with decorators type annotations

# Type Annotations
Nominal types were originally proposed for JavaScript in the ECMAScript 4 specification. Though this was never implemented in JavaScript, it was adopted and widely used via Adobe's ActionScript3 and inspired others. e.g. TypeScript adopted the syntax, but uses a structural type system semantic.

Types allow us to explicitly express contracts between different parts of the system and to give these contracts names. For large teams with large codebases, where no single person knows the whole codebase, types become a key way to discuss and reason about the collaboration between different components of the system.

## RunTime Type System (RTTS library)
TypeScript type annotations check only in compilation time. Uf you would like to check types in runtime, you should add some logic for check types.

My proposal is to use this previously vetted syntax by using a decorators as type declaration before the variable, parameter or function as seen below. It check type in runtime. When we have annotations, it’s important to provide a consistent API that developers and frameworks can leverage to gain access to this information at runtime.

## Motivation to use a runtime type system
It allows free mixing of existing libraries which do not have type annotations with new code which can take advantage of types. The incomplete type information would prevent useful static analysis of code but runtime type checks do not suffer from such limitations.

The semantics of types can be left to the implementor of the rtts library. This means that different libraries can choose different strategies of identifying types. e.g. nominal vs structural. Our hope is that developers will be able to experiment with new ways of using types.

Runtime type verification can be used to verify that the JSON returned from the server is of a valid structure, something which cannot be done statically.

Since the type errors should be caught and resolved before pushing the code to production, all of the assertions can be stripped from production builds, completely removing the cost of these assertions.

## Example usage RTTS Type Annotations
```ts
    ///<require path="rtts/typings.d.ts" />
    import 'rtts';
    
    @type // annotate constructor
    class A {
    
    	@tstring foo :string = 'abc';
    	@tnumber static bar :number = 123;
    
    	@tfloat foo :float = 123.321;
    	@tint   foo :int   = 123;
    
    
    	/* @type */ constructor(@tnumber x :number) {
    		// ...
    	}
    
    	@type mixFoo(@tstring arg :string) :string {
    		return this.foo + arg;
    	}
    
    	@type mixBar(@cast `int` arg :any) :number {
    		return this.bar + arg;
    	}
    
    	@type({
    		'arguments' : ['string', 'number'],
    		'return'	: 'string'
    	})
    	someDo(a :string, b :number) :string {
    		return a + b;
    	}
    
        // return type string
    	@type `string` static someDo(@tstring a :string, @tnumber b :number) :string {
    		return a + b;
    	}
    }
```
