var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var A = (function () {
    function A(x) {
        this.foo = 'abc';
        this.foo = 123.321;
        this.foo = 123;
        // ...
    }
    A.prototype.mixFoo = function (arg) {
        return this.foo + arg;
    };
    A.prototype.mixBar = function (arg) {
        return this.bar + arg;
    };
    A.prototype.someDo = function (a, b) {
        return a + b;
    };
    A.someDo = function (a, b) {
        return a + b;
    };
    A.prototype.doSome = function (a, b) {
        return a + b;
    };
    A.bar = 123;
    __decorate([
        tstring
    ], A.prototype, "foo", void 0);
    __decorate([
        tfloat
    ], A.prototype, "foo", void 0);
    __decorate([
        tint
    ], A.prototype, "foo", void 0);
    __decorate([
        type,
        __param(0, tstring)
    ], A.prototype, "mixFoo", null);
    __decorate([
        type,
        __param(0, cast('int'))
    ], A.prototype, "mixBar", null);
    __decorate([
        type({
            'arguments': ['string', 'number'],
            'return': 'string'
        })
    ], A.prototype, "someDo", null);
    __decorate([
        TParameter(String, Number),
        TReturn(String)
    ], A.prototype, "doSome", null);
    __decorate([
        tnumber
    ], A, "bar", void 0);
    __decorate([
        type('string'),
        __param(0, tstring),
        __param(1, tnumber)
    ], A, "someDo", null);
    A = __decorate([
        __param(0, tnumber)
    ], A);
    return A;
})();
