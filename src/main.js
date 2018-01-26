// 第5节：字符串模版
console.log('--------第5节：字符串模版---------');
// es5
let name = 'songStar';
let sayHtml = '<div class="say">' +
				'大家好，我的名字是<span>' + name + '</span>，很高兴认识大家' +
			  '</div>';
console.log(sayHtml);

// es6
sayHtml = `<div class="say">
		      大家好，我的名字是<span>${name}</span>，很高兴认识大家
	      </div>`;
console.log(sayHtml);

console.log(sayHtml.indexOf('div'));
console.log(sayHtml.includes('div'));
console.log(sayHtml.startsWith('<div'));
console.log(sayHtml.endsWith('<div'));

console.log('copy-'.repeat(3));

// 第6节：ES6数字操作
console.log('--------第6节：ES6数字操作---------');

// 二进制
let binary = 0B010101;
console.log(binary); // 21
// 八进制
let b = 0o666;
console.log(b); // 438
// 数字判断与转换
console.log(Number.isFinite(11 / 4)); // true
console.log(Number.isFinite('a'));//false
console.log(Number.isFinite(NaN));//false
console.log(Number.isFinite(undefined));//false

console.log(Number.isNaN(NaN)); // true
console.log(Number.isInteger(1.2)); //false

console.log(Number.parseInt(1.2)); // 1
console.log(Number.parseFloat(1.2)); // 1.2

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);

let a= Math.pow(2,53)-1;
console.log(Number.isSafeInteger(a));// false

// 第7节：ES6中新增的数组知识（1）
console.log('--------第7节：ES6中新增的数组知识（1）---------');
// Array.from()
let json = {
  '0': 1,
  '1': 2,
  length: 2
}
console.log(Array.from(json)); // [1, 2]

console.log(Array.from('foo')); // ["f", "o", "o"]

console.log(Array.from(new Set([1, 2, 3, 1, 3]))); // [1, 2, 3]

let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); // [[1, 2], [2, 4], [4, 8]]

// Array.of()
console.log(Array.of(7)); // [7]
console.log(Array.of(1, 2, 3)); // [1, 2, 3]

console.log(Array(7)); //  [empty × 7]
console.log(Array(1, 2, 3)); // [1, 2, 3]

//find()
function isPrime(item, index, arr) {
	var start = 2;
	while (start <= Math.sqrt(item)) {
		if (item % start ++ < 1) {
			return false;
		}
	}
	return item > 1;
}
console.log([4, 6, 8, 12].find(isPrime)); // undefined
console.log([4, 5, 8, 12].find(isPrime)); // 5

// fill()
let arr = [1, 2, 3, 4];
console.log(arr.fill('f', 1, 3)); // [1, "f", "f", 4]

// for...of
let arr_of = ['foo', 'bar'];
for (let item of arr_of) {
	console.log(item); //foo bar
}
for (let index of arr_of.keys()) {
	console.log(index); //0 1
}
for (let [index, item] of arr_of.entries()) {
	console.log(index + ': ' + item); // 0: foo 1: bar
}

// for...of与for...in区别
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};
let iterable = [3, 5, 7];
iterable.foo = 'hello';
for (let i in iterable) {
	console.log(i); // 0 1 2 foo arrCustom objCustom
}
for (let i in iterable) {
	if (iterable.hasOwnProperty(i)) {
		console.log(i); // 0 1 2 foo
	}
}
for (let i of iterable) {
	console.log(i); // 3 5 7
}

// Object.entries
// array like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

// getFoo is property which isn't enumerable
const myObj = Object.create({}, { getFoo: { value() { return this.foo; } } });
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]
// 将Object转换为Map
var obj = {foo: 'bar', baz: 42};
console.log(new Map(Object.entries(obj))); // Map(2) {"foo" => "bar", "baz" => 42}

// 箭头函数
console.log('--------第9节：箭头函数---------');
let materials = ['foo', 'bar', 'baz'];
materials.map(function(material) {
	return material.length;
}); // [3, 3, 3]
materials.map(material => material.length); // [3, 3, 3]

// 与严格模式的关系
var f = () => {'user strict'; return this};
f() === window; // true
var b = function() {
	'use strict';
	return this;
}
b(); // undefined

// 通过 call 或 apply 调用
var adder = {
	base: 1,
	add: function(a) {
		var f = v => v + this.base;
		return f(a);
	},
	addThruCall: function(a) {
		var f = v => v + this.base;
		var b = {
			base: 2
		};
		return f.call(b, a);
	}
};
console.log(adder.add(1)); // 2
console.log(adder.addThruCall(1)); // 2 不是3

// 不绑定arguments
var arguments = 42;
var arr = () => arguments;
arr(); // 42
function foo() {
	var f = i => arguments[0] + i;
	return f(2);
}
foo(1); // 3(1+2)
function foo() {
	var f = function(i) {
		return arguments[0] + i;
    }
    return f(2);
}
foo(1); // 4(2+2)
function foo() { 
  var f = (...args) => args[0]; 
  return f(2); 
}
foo(1); // 2

// 像方法一样使用箭头函数
var obj = {
	i: 10,
	b: () => console.log(this.i, this),
	c: function() {
		console.log(this.i, this)
	}
}
obj.b(); // undefined windows (严格模式下 undefined)
obj.c(); // 10, Object {...}
// 箭头函数没有定义this绑定。另一个涉及Object.defineProperty()的示例：
var obj = {
	a: 10
};
Object.defineProperty(obj, 'b', {
	get: () => {
		console.log(this.a, this);
		return this.a + 10;
		// undefined windows
	}
});

// 和new操作符
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor

// 使用prototype属性
var Foo = () => {};
console.log(Foo.prototype); // undefined

// 第11节：ES6中对象
console.log('--------第11节：ES6中对象---------'); 
{
	let name = 'foo';
	let fun = 'bar';
	var obj = {name, fun};
	console.log(obj); // {name: "foo", fun: "bar"}
}
{
	let key = 'skill';
	var obj = {
		[key]: 'web'
	};
	console.log(obj); // {skill: "web"}
}
// Object.is()
console.log(+0 === -0); // true
console.log(NaN === NaN); // false
console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true

// Object.assign()
var obj = {a: 1};
var copy = Object.assign({}, obj);
console.log(copy); // {a: 1}

var obj1 = {a: 0, b: {c: 0}};
var obj2 = Object.assign({}, obj1);
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

obj1.a = 1;
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

obj2.a = 2;
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}
  
obj2.b.c = 3;
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}

// Deep Clone
obj1 = { a: 0 , b: { c: 0}};
var obj3 = JSON.parse(JSON.stringify(obj1));
obj1.a = 4;
obj1.b.c = 4;
console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}

var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。

// 继承属性和不可枚举属性是不能拷贝的
var obj = Object.create({foo: 1}, { // foo 是个继承属性。
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性。
    }
});

var copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }

// 原始类型会被包装为对象
var v1 = 'abc';
var v2 = true;
var v3 = 10;
var v4 = Symbol('foo');
// 原始类型会被包装，null 和 undefined 会被忽略。
// 注意，只有字符串的包装对象才可能有自身可枚举属性。
console.log(Object.assign({}, v1, null, v2, undefined, v3, v4)); // {0: "a", 1: "b", 2: "c"}

// 第13节：Set和WeakSet数据结构
console.log('--------第13节：Set和WeakSet数据结构---------'); 
{
	let mySet = new Set([0]);
	mySet.add(1); // Set(2) {0, 1}
	// Set对象已存在， 则无效 （数组去重）
	mySet.add(1); // Set(2) {0, 1}
	mySet.add("some text"); // Set(3) {0, 1, "some text"}
	mySet.add({a: 1, b: 2}); // Set(4) {0, 1, "some text", {…}}
	mySet.add({a: 1, b: 2}); // Set(5) {0, 1, "some text", {…}, {…}} 对象指向的是不同的对象，所以没问题
	mySet.has(1); //true
	mySet.size; // 5
	mySet.delete(1); // true, 移除1
	mySet.has(1); // false
	mySet.clear(); // Set(0) {} 移除所有 
}
// 迭代Set
{
	let mySet = new Set([1, 'some text']);
	for (let item of mySet) {
		console.log(item); // 1 some text
	}
	//(键与值相等)
	for (let item of mySet.keys()) {
		console.log(item); // 1 some text
	}
	for (let [key, value] of mySet.entries()) {
		console.log(key); // 1 some text
	}
	for (let item of mySet.values()) {
		console.log(item); // 1 some text
	}
	// 转换Set为Array
	var mtArr = [v for (v of mySet)]; // [1, "some text"]
	// Set 和 Array互换
    mySet2 = new Set([1,2,3,4]);
    mySet2.size; // 4
    [...mySet2]; // [1,2,3,4]
}
// WeakSet
{
	let weakObj = new WeakSet();
	let obj = {a: 1, b: 2};
	weakObj.add(obj); // WeakSet {{…}}
}

// Map
{
	var myMap = new Map();
	var keyObj = {},
	    keyFunc = function () {},
	    keyString = 'a string';
	// 添加键
	myMap.set(keyString, 'Sting 键的值');
	myMap.set(keyObj, 'Obj 键的值');
	myMap.set(keyFunc, 'Func 键的值');
	console.log(myMap); // Map(3) {"a string" => "Sting 键的值", {…} => "Obj 键的值", ƒ => "Func 键的值"}
	// 读取值
	myMap.get(keyFunc); // "Func 键的值"
	myMap.size; // 3
	myMap.delete(keyString); // true
	myMap.size; // 2
	myMap.clear();
	console.log(myMap); // Map(0) {}
}
// NaN
{
	let myMap = new Map();
	myMap.set(NaN, 'not a Number');
	myMap.get(NaN); // 'not a Number'
	let otherNaN = Number('foo');
	myMap.get(otherNaN); // 'not a Number'
}
// 映射与数组对象的关系
{
	let arr = [['key1', 'val1'], ['key2', 'val2']];
	let myMap = new Map(arr);
	myMap.get('key1'); // val1
	console.log(JSON.stringify([...myMap])); // [["key1","val1"],["key2","val2"]]
}

// 第15节：用Proxy进行预处理
{
	let target = {
		add: function (val) {
			return ++val;
		},
		name: 'JSPang'
	};
	let handler = {
		get: function (target, key, property) {
			return target[key];
		},
		set: function (target, key, val, receiver) {
			console.log(`setting ${key}: ${target[key]} ===> ${key}: ${val}`);
			return target[key] = val;
		}
	}
	var p = new Proxy(target, handler);
	console.log(p.add(1));
	p.name = 'Songstar'; // setting name: JSPang ===> name: Songstar
}
// apply 使用
{
	let target = () => 'a string';
	let handler = {
		apply (target, ctx, args) {
			console.log('do apply');
			return Reflect.apply(...arguments);
		}
	}
	var p = new Proxy(target, handler);
	console.log(p()); // a string
}
// Promise
{
	let myPromise = new Promise((resolve, reject) => {
		// 当异步代码执行成功是， 调用resolve(),失败调用reject()
		// 我们使用setTimeout()来模拟异步代码
		setTimeout(() => {
			resolve('resolve成功');
		}, 250);
	});
	myPromise.then((res) => {
		console.log('收到信息:' + res); // 收到信息:resolve成功
	}).then((res) => {
		console.log('2' + res)
	})
}
// class
{
	class Point {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
		add () {
			return this.x + this.y
		}
	}
	var p = new Point(1, 2);
	p.add(); // 3	
}

{
	class B {};
	let b = new B();
	b.constructor === B.prototype.constructor; // true
	B.prototype.constructor === B; // true
}
// Object.assign 添加方法
{
	class Point {
		constructor () { ... }
	}
	Object.assign(Point.prototype, {
		add () {},
		toString () {}
	});
}
// 不可枚举
{
	class Point {
		constructor () {}
		add () {}
	}
	Object.keys(Point.prototype); // []
	Object.getOwnPropertyNames(Point.prototype); // ["constructor", "add"]

	var Point2 = function () {}
	Point2.prototype.add = function () {}
	Object.keys(Point2.prototype); // ["add"]
	Object.getOwnPropertyNames(Point2.prototype); // ["constructor", "add"]
}
// 类的属性名采用表达式
{
	let name = 'add';
	class Point {
		constructor () {}
		[name] () {}
	}
}
// 共享原型对象
{
	class Point {};
	let p1 = new Point();
	let p2 = new Point();
	p1.prototype === p2.prototype; // true
	p1.__proto__ === p2.__proto__; // true
}
// 使用表达式是形式定义
{
	let MyClass = class Me {
		getClassName () {
			return Me.name;
		}
	};
	let inst = new MyClass();
	inst.getClassName(); // Me
	MyClass.name; // Me
	Me.name; // Me is not defined
}
// 立即执行
{
	let p = new class {
		constructor(name) {
			this.name = name;
		}
		sayName () {
			console.log(this.name);
		}
	}('songStar');
	p.sayName(); // songStar
}
// 私有方法和私有属性
{
	class Foo {
		// 共有方法
		baz () {
			this._bar();
		}
		// 私有方法
		_bar () {
			return '_bar';
		}
	}
}
{
	class Foo {
		baz () {
			bar.call(this);
		}
	}
	function bar() {
		return 'bar';
	}
}
{
	let bar Symbol('bar');
	let snaf = Symbol('snaf');
	export default class MyClass {
		// 公有方法
		foo (baz) {
			this[bar](baz);
		}
		// 私有方法
		[bar](baz) {
			return this[snaf] = baz;
		}
	}
}
// 私有属性
{
	class Point{
		#x = 0;
		constructor (x) {
			#x = +x; // === this.#x = +x;
		}
		get x () {
			return #x;
		}
		set x (value) {
			#x = +value;
		}
		#add (value) {
			#x += value;
		}
	}
	Point.x;
}
// this 指向
{
	class Point{
		constructor () {
			this.sayName = (name) => {
				this.print(`hello ${name}`);
			}
		}
		sayName (name) {
			this.print(`hello${name}`);
		}
		print (text) {
			console.log(text);
		}
	}
	let p = new Point();
	let {sayName} = p;
	sayName('songStar'); // TypeError: Cannot read property 'print' of undefined
}
// 解决方法
{
	class Point {
		constructor () {
			this.sayName = this.sayName.bind(this)
		}
	}
}
{
	class Point {
		constructor () {
			this.sayName = (name) => {
				this.print(`hello ${name}`);
			}
		}
	}
}
{
	function selfish (target) {
		const cache = new WeakMap();
		const handler = {
			get (target, key) {
				const value = Reflect.get(target, key);
				if (typeof value !== 'function') {
					return value;
				}
				if (! cache.has(value)) {
					cache.set(value, value.bind(target));
				}
				return cache.get(value);
			}
		};
		const proxy = new Proxy(target, handler);
		return proxy;
	}
	let p = new selfish(new Point());
}