//手写Object.create myObj
function myObj(m) {
    function Fn(){}
    Fn.prototype = m;
    return new Fn();
}

let foo ={
    name: 'duoduo'
}
let f1 = myObj(foo);
let f = Object.create(foo);
console.log(f.name);  // duoduo
console.log(f1.name);  // duoduo
console.log(f1.name === f.name)  //true