if (!('isInteger' in Number))
    Number.isInteger = function (value) { return typeof value === 'number' && isFinite(value) && Math.floor(value) === value; };
var Rtts;
(function (Rtts) {
    function tstring(target, key, descriptor) {
        return typeDecorator(target, key, descriptor, 'string');
    }
    Rtts.tstring = tstring;
    function tboolean(target, key, descriptor) {
        return typeDecorator(target, key, descriptor, 'boolean');
    }
    Rtts.tboolean = tboolean;
    function tobject(target, key, descriptor) {
        return typeDecorator(target, key, descriptor, 'object');
    }
    Rtts.tobject = tobject;
    function tfunction(target, key, descriptor) {
        return typeDecorator(target, key, descriptor, 'function');
    }
    Rtts.tfunction = tfunction;
    function tarray(target, key, descriptor) {
        return typeDecorator(target, key, descriptor, 'array');
    }
    Rtts.tarray = tarray;
    function tint(target, key, descriptor) {
        return typeDecorator(target, key, descriptor, 'int');
    }
    Rtts.tint = tint;
    function tfloat(target, key, descriptor) {
        return typeDecorator(target, key, descriptor, 'float');
    }
    Rtts.tfloat = tfloat;
    function tnumber(target, key, descriptor) {
        return typeDecorator(target, key, descriptor, 'number');
    }
    Rtts.tnumber = tnumber;
    function cast(type) {
        return function (target, key, descriptor) {
            return typeDecorator(target, key, descriptor, 'cast_' + type);
        };
    }
    Rtts.cast = cast;
    function type(target, key, descriptor) {
        var isConstruct = isClass(target, key), method;
        if (isConstruct)
            key = 'constructor';
        var indices = target.__meta__[key], cls = target.constructor.name;
        if (isConstruct) {
            //method = target.constructor;
            console.warn('In constructor types not checked at runtime in this version. Sorry!');
        }
        else {
            method = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                indices.forEach(function (type, i) {
                    var cr = checkType(args[i], typeof args[i], type, key, cls);
                    if (cr !== void 0)
                        args[i] = cr;
                });
                return method.apply(this, args);
            };
            return descriptor;
        }
    }
    Rtts.type = type;
    /**
     * Private section
     * ===============
     */
    function isFloat(n) { return n === +n && n !== (n | 0); }
    function isClass(target, key) {
        if (key !== void 0)
            return false;
        return true;
    }
    function isParameter(target, key, index, type) {
        if (index === void 0) { index = void 0; }
        if (index !== +index)
            return false;
        if (key === void 0)
            key = 'constructor';
        if (!target.__meta__)
            target.__meta__ = {};
        if (!target.__meta__[key])
            target.__meta__[key] = [];
        target.__meta__[key][index] = type;
        return true;
    }
    function typeDecorator(target, key, descriptor, t) {
        checkIfCallFromProperty(descriptor);
        if (isParameter(target, key, descriptor, t))
            return;
        return checkPType(target, key, t);
    }
    function checkIfCallFromProperty(descriptor) {
        if (descriptor === void 0 || typeof descriptor == 'number')
            return;
        throw SyntaxError("This type annotation only for property and parameters!");
    }
    function checkPType(target, key, type) {
        var isStatic = target.hasOwnProperty(key), _target, val, cls = target.constructor.name;
        if (isStatic) {
            val = target[key];
            _target = target;
        }
        else {
            _target = this;
        }
        return {
            set: function (val) {
                var cr = checkType(val, typeof val, type, key, cls);
                _target['__meta__' + key] = cr !== void 0 ? cr : val;
            },
            get: function () {
                if (isStatic)
                    if (target['__meta__' + key] === void 0)
                        this['__meta__' + key] = val;
                return _target['__meta__' + key];
            }
        };
    }
    function checkType(val, ctype, type, key, cls) {
        var err = false;
        switch (type) {
            case 'array':
                err = !Array.isArray(val);
                break;
            case 'int':
                err = !Number.isInteger(val);
                if (isFloat(val))
                    ctype = 'float';
                break;
            case 'float':
                err = !isFloat(val);
                if (Number.isInteger(val))
                    ctype = 'integer';
                break;
            case 'cast_int': return parseInt(val);
            case 'cast_float': return parseFloat(val);
            default:
                if (ctype !== type)
                    err = true;
        }
        if (err)
            throw new TypeError("Type '" + ctype + "' is not assignable to type '" + type + "' in " + cls + "." + key + "()!");
    }
    /**
     * Autoexport namespace
     */
    (function (__global) {
        var f;
        if (typeof __global.Rtts == 'undefined' || (typeof __global.Rtts != 'undefined' && __global.Rtts !== Rtts)) {
            __global.Rtts = Rtts;
            for (f in Rtts)
                __global[f] = Rtts[f];
        }
    })(typeof window !== 'undefined'
        ? window
        : typeof WorkerGlobalScope !== 'undefined'
            ? self
            : typeof global !== 'undefined'
                ? global
                : Function('return this;')());
})(Rtts || (Rtts = {}));
