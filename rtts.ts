type int = number;
type float = number;

declare const WorkerGlobalScope: any;
declare const global: any;

interface NumberConstructor {
    isInteger: (value: any) => boolean;
}

if (!('isInteger' in Number))
    Number.isInteger = (value) => typeof value === 'number' && isFinite(value) && Math.floor(value) === value;


namespace Rtts {

    export class CastError extends TypeError {

    }

    export function tstring(target: any, key: string, descriptor?: Object | number): any {
        return typeDecorator(target, key, descriptor, 'string')
    }

    export function tboolean(target: any, key: string, descriptor?: Object | number): any {
        return typeDecorator(target, key, descriptor, 'boolean')
    }

    export function tobject(target: any, key: string, descriptor?: Object | number): any {
        return typeDecorator(target, key, descriptor, 'object')
    }

    export function tfunction(target: any, key: string, descriptor?: Object | number): any {
        return typeDecorator(target, key, descriptor, 'function')
    }

    export function tarray(target: any, key: string, descriptor?: Object | number): any {
        return typeDecorator(target, key, descriptor, 'array')
    }

    export function tint(target: any, key: string, descriptor?: Object | number): any {
        return typeDecorator(target, key, descriptor, 'int')
    }

    export function tfloat(target: any, key: string, descriptor?: Object | number): any {
        return typeDecorator(target, key, descriptor, 'float')
    }

    export function tnumber(target: any, key: string, descriptor?: Object | number): any {
        return typeDecorator(target, key, descriptor, 'number')
    }


    export function cast(type: string): any {
        return function (target: any, key: string, descriptor?: Object | number) {
            return typeDecorator(target, key, descriptor, 'cast_' + type)
        }
    }

    export function type(target: any, key?: string, descriptor?: any): any {

        let isConstruct = isClass(target, key),
            method: any;

        if (isConstruct) key = 'constructor';

        let indices = target.__meta__[key],
            cls = target.constructor.name;

        if (isConstruct) {
            //method = target.constructor;
            console.warn('In constructor types not checked at runtime in this version. Sorry!');
        }
        else {
            method = descriptor.value;

            descriptor.value = function (...args: any[]): any {
                indices.forEach((type: any, i: any) => {
                    let cr = checkType(args[i], typeof args[i], type, key, cls);
                    if (cr !== void 0) args[i] = cr;
                });
                return method.apply(this, args);
            };

            return descriptor;
        }
    }


    /**
     * Private section
     * ===============
     */
    function isFloat(n: any): boolean {
        return n === +n && n !== (n | 0)
    }

    function isClass(target: any, key: any): boolean {
        return key === void 0;
    }

    function isParameter(target: any, key: string, index: any = void 0, type: any): boolean {
        if (index !== +index) return false;
        if (key === void 0) key = 'constructor';
        if (!target.__meta__) target.__meta__ = {};
        if (!target.__meta__[key]) target.__meta__[key] = [];
        target.__meta__[key][index] = type;
        return true;
    }

    function typeDecorator(target: any, key: string, descriptor: Object | number, t: string) {
        checkIfCallFromProperty(descriptor);
        if (isParameter(target, key, descriptor, t)) return;
        return checkPType(target, key, t);
    }

    function checkIfCallFromProperty(descriptor: any): void {
        if (descriptor === void 0 || typeof descriptor == 'number') return;
        throw SyntaxError(`This type annotation only for property and parameters!`);
    }

    function checkPType(target: any, key: string, type: string): any {

        let isStatic = target.hasOwnProperty(key),
            _target: any,
            val: any,
            cls = target.constructor.name;

        if (isStatic) {
            val = target[key];
            _target = target;
        }
        else {
            _target = this;
        }

        return {
            set: function (val: any) {
                let cr = checkType(val, typeof val, type, key, cls);
                _target['__meta__' + key] = cr !== void 0 ? cr : val;
            },
            get: function () {
                if (isStatic)
                    if (target['__meta__' + key] === void 0)
                        this['__meta__' + key] = val;
                return _target['__meta__' + key];
            }
        }
    }

    function checkType(val: any, ctype: string, type: string, key: string, cls: string): any {
        let err = false;
        let castErr = false;

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
            case 'cast_int':
                let castIntResult = parseInt(val);
                if (!isNaN(castIntResult))
                    return castIntResult;
                castErr = true;
                break;
            case 'cast_float':
                let castFloatResult = parseFloat(val);
                if (!isNaN(castFloatResult))
                    return castFloatResult;
                castErr = true;
                break;
            default:
                if (ctype !== type) err = true;
        }

        if (castErr) throw new CastError(`Casting is not supported for ${ctype} (${val}) to type ${type} in ${cls}.${key}()!`);
        if (err) throw new TypeError(`Type '${ctype}' is not assignable to type '${type}' in ${cls}.${key}()!`);
    }

    /**
     * Autoexport namespace
     */
    (function (__global: any): void {
        let f;
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