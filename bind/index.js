//使用bind 方法
let obj = {
    name: 'duoduo'
}

function fn(name,sing,dance,age){
    this.say = 'hello';
    console.log('44444444444444444444',this)
    console.log(this.name + '养了一只'+ age + '岁的'+ name + '他很会'+ sing + ','+dance);
}
let fnNew = fn.bind(obj,'dog','sing1','dance1');
fnNew(5);

/**
 * 1、注意bind 绑定函数后返回值为新的函数
 * 2、bind可以绑定 this的指向
 * 3、如果绑定的函数被new了，当前函数的this就是当前的实例即{}
 * 4、 new出来的结果，可以找到原有类的原型
 * **/

//手写一个bind函数
Function.prototype.binds = function (context) {//上下文 这里执行的fn.binds(obj,'狗','唱歌','跳舞');
    let that = this;
    let bindArgs = Array.prototype.slice.call(arguments,1)
    function Fn() { }
    function fBond() { //这里是fnmyNew 返回的新函数
        let args = Array.prototype.slice.call(arguments);
       return that.apply(this instanceof fBond ? this: context,bindArgs.concat(args)); //返回最终的结果
    }
    debugger
    Fn.prototype = this.prototype;
    fBond.prototype  = new Fn();
    return fBond;
}
fn.prototype.flag = '哺乳类';
let fnmyNew = fn.binds(obj,'狗','唱歌','跳舞');
// fnmyNew(5);// 1、可以直接使用这种方式调用
let newInstance = new fnmyNew(5); //2、也可以通过new来调用
console.log('fffffffffffffffffffff',newInstance.flag)

/***********
 * 1、bind执行的时候，它的this指向是fn，所以上面需要定义一个变量，
 *    把this指向指回fn let that = this;
 *    下面直接调用that即可
 * 2、that.apply(context) 这里其实是在执行fn.binds(obj,'狗','唱歌','跳舞');时，
 *    将this指向为obj，所以在调用时，需要把that的执行绑定再指回给context 上下文对象；
 * 3、Array.prototype.slice.call(arguments,1) 这里其实还是走的slice方法，只不过截取的值是从arguments里取值，这里返回一个数组
 * 4、如果是通过new方法let newInstance = new fnmyNew(5); 来调用，
 *      则需要在上面的return that.apply(context,bindArgs.concat(args));这里判断一下this指向问题
 *      如果是通过new调用的，则this指向为{}，否则为上下文对象context
 * 5、如果在原型上直接定义方法 fn.prototype.flag = '哺乳类';这样newInstance.flag 获取不到flag，获取的值为undefined；
 * 这样俩个类的原型不公用同一个类，指向了两个类
 * *********/
