function fn1() {
    console.log('fn1---1-----------------',this,arguments);
}

function fn2() {
    console.log('fn2-----------------',this,arguments)
}
// Function.prototype.apply = function (context) {
//     console.log(context) this(); //这里查找对应的this所指向的值
// }
/******
 * apply 特点
 * 1、改变this的指向
 * 2、让当前函数执行
 * *******/
fn1.apply('hello',[1,2]); //这里的this是window

// //手写apply方法
Function.prototype.apply = function (context,args) {
    context = context ? Object(context) : window;
    context.fn = this;
    if(!args){
        return context.fn();
    }
    //利用数组的tostring的特性
    let r = eval('context.fn('+ args +')');
    delete context.fn;
    return r;
}

fn1.apply('hello',[1,2]);

/***
 * 1、原理
 *  fn1.apply('hello'),相当于把当前this的指向为'hello'；
 *  因为不能直接this = hello，所以需要通过对象的方式来改变this指向
 *      在{}.fn = fn1;我们知道 函数的this指向为函数的调用者，所以这样的话就成功修改了this的指向
 * 2、eval 方法是将字符串执行
 * 3、为什么要删除 context.fn？
 *      因为fn这个属性是我们自己添加的，在使用完成后不再需要了所以删除
 * 4、为什么要return r？
 *      因为如果为对象调用时，不反回return r 没有返回值
 * ***/
