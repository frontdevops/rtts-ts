type int   = number;
type float = number;

declare var WorkerGlobalScope :any;
declare var global :any;

interface NumberConstructor { isInteger: (value :any) => boolean; }

if (!('isInteger' in Number))
	Number.isInteger = (value) => typeof value === 'number' && isFinite(value) && Math.floor(value) === value;


namespace Rtts {

	export function tstring(target :any, key :string, descriptor? :Object|number) :any {
		return typeDecorator(target, key, descriptor, 'string')
	}

	export function tboolean(target :any, key :string, descriptor? :Object|number) :any {
		return typeDecorator(target, key, descriptor, 'boolean')
	}

	export function tobject(target :any, key :string, descriptor? :Object|number) :any {
		return typeDecorator(target, key, descriptor, 'object')
	}

	export function tfunction(target :any, key :string, descriptor? :Object|number) :any {
		return typeDecorator(target, key, descriptor, 'function')
	}

	export function tarray(target :any, key :string, descriptor? :Object|number) :any {
		return typeDecorator(target, key, descriptor, 'array')
	}

	export function tint(target :any, key :string, descriptor? :Object|number) :any {
		return typeDecorator(target, key, descriptor, 'int')
	}

	export function tfloat(target :any, key :string, descriptor? :Object|number) :any {
		return typeDecorator(target, key, descriptor, 'float')
	}

	export function tnumber(target :any, key :string, descriptor? :Object|number) :any {
		return typeDecorator(target, key, descriptor, 'number')
	}

	export function typeDecorator(target :any, key :string, descriptor :Object|number, t :string) {
		checkIfCallFromProperty(descriptor);
		if (isParameter(target, key, descriptor, t)) return;
		return checkPType(target, key, t);
	}

	export function type(target, key :string, descriptor:any) :any {

		var indices = target.__meta__[key],
			method = descriptor.value,
			cls = target.constructor.name;

		descriptor.value = function (...args:any[]) :any {
			indices.forEach( (type, i) => checkType(args[i], typeof args[i], type, key, cls) );
			return method.apply(this, args);
		};

		return descriptor;
	}


	/**
	 * Private section
	 * ===============
	 */
	function isFloat(n :any) :boolean { return n === +n && n !== (n | 0) }

	function checkIfCallFromProperty(descriptor) :void {
		if (descriptor === void 0 || typeof descriptor == 'number') return;
		throw SyntaxError(`This type annotation only for property and parameters!`);
	}

	function checkPType(target :any, key :string, type :string) :any {

		var isStatic = target.hasOwnProperty(key),
			_target :any,
			val :any,
			cls = target.constructor.name;

		if (isStatic) {
			val = target[key];
			_target = target;
		}
		else {
			_target = this;
		}

		return {
			set: function (val) {
				checkType(val, typeof val, type, key, cls);
				_target['__meta__' + key] = val;
			},
			get: function () {
				if (isStatic)
					if (target['__meta__' + key] === void 0)
						this['__meta__' + key] = val;
				return _target['__meta__' + key];
			}
		}
	}

	function isParameter(target, key :string, index :any = void 0, type) :boolean {
		if (index !== +index) return false;
		if (!target.__meta__) target.__meta__ = {};
		if (!target.__meta__[key]) target.__meta__[key] = [];
		target.__meta__[key][index] = type;
		return true;
	}

	function checkType(val :any, ctype :string, type :string, key :string, cls :string) :void {
		var err = false;

		switch (type) {
			case 'array':
				err = !Array.isArray(val);
				break;
			case 'int':
				err = !Number.isInteger(val);
				if (isFloat(val)) ctype = 'float';
				break;
			case 'float':
				err = !isFloat(val);
				if (Number.isInteger(val)) ctype = 'integer';
				break;
			default:
				if (ctype !== type) err = true;
		}

		if (err) throw new TypeError(`Type '${ctype}' is not assignable to type '${type}' in ${cls}.${key}()!`);
	}

	/**
	 * Autoexport namespace
	 */
	(function (__global :any) :void {
		var f;
		if (typeof __global.Rtts == 'undefined' || (typeof __global.Rtts != 'undefined' && __global.Rtts !== Rtts)) {
			__global.Rtts = Rtts;
			for (f in Rtts) __global[f] = (<any>Rtts)[f];
		}
	})(
		typeof window !== 'undefined'
			? window
			: typeof WorkerGlobalScope !== 'undefined'
				? self
				: typeof global !== 'undefined'
					? global
					: Function('return this;')()
	);
}