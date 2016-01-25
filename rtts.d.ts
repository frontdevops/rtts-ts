
//declare namespace Rtts {}

declare function tstring(target :any, key :string, descriptor? :Object|number) :any;

declare function tboolean(target :any, key :string, descriptor? :Object|number) :any;

declare function tobject(target :any, key :string, descriptor? :Object|number) :any;

declare function tfunction(target :any, key :string, descriptor? :Object|number) :any;

declare function tarray(target :any, key :string, descriptor? :Object|number) :any;

declare function tint(target :any, key :string, descriptor? :Object|number) :any;

declare function tfloat(target :any, key :string, descriptor? :Object|number) :any;

declare function tnumber(target :any, key :string, descriptor? :Object|number) :any;

declare function type(target, key :string, descriptor:any) :any;


declare function cast(type :string) :any;
