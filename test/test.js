var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
///<require path="../rtts.d.ts" />
require('./../rtts');
var A = (function () {
    function A() {
        this.foo = 1.1;
    }
    A.prototype.baz = function (x, y) {
        return x + y;
    };
    A.bar = 'abc';
    __decorate([
        tfloat
    ], A.prototype, "foo", void 0);
    __decorate([
        type,
        __param(0, tint),
        __param(1, tfloat)
    ], A.prototype, "baz", null);
    __decorate([
        tstring
    ], A, "bar", void 0);
    return A;
})();
var a1 = new A;
//a1.foo = 'abc';
console.log(a1.foo);
//A.bar = 123;
console.log(A.bar);
console.log(a1.baz(10, 8.4));
