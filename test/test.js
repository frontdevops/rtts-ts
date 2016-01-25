var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
///<reference path="../rtts.d.ts" />
require('./../rtts');
var A = (function () {
    function A() {
        this.foo = '1.1';
    }
    //@tstring static bar :string= 'abc';
    //@type baz(@tint x :int, @tfloat y :float) {return x + y;}
    A.prototype.doany = function (x) {
        console.log(x);
    };
    __decorate([
        cast('int')
    ], A.prototype, "foo", void 0);
    __decorate([
        type,
        __param(0, cast('int'))
    ], A.prototype, "doany", null);
    return A;
})();
var a1 = new A;
a1.doany('123abc');
//a1.foo = 'abc';
console.log(a1.foo);
//A.bar = 123;
//console.log(A.bar);
//console.log(a1.baz(10, 8.4));
