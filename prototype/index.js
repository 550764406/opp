//原型 prototype 原型链 __proto__
//每一个函数都有一个prototype,
//Animal.prototype.constructor 指向的是对象本身
//每一个对象都有一个__proto__ 和 对象的prototype相等；
function Animal(){
    this.type = '哺乳类';
}
// console.log(Animal.prototype)
// console.log(Animal.__proto__)

console.dir(Animal)

// let animal = new Animal();
// console.log(animal.__proto__);
//
// console.log(animal.__proto__ === Animal.prototype );
