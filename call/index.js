function fn1() {
    console.log('fn1---1-----------------',this,arguments);
}

function fn2() {
    console.log('fn2-----------------',this,arguments)
}
// Function.prototype.call = function (context) {
//     console.log(context) this(); //这里查找对应的this所指向的值
// }
/******
 * call 特点
 * 1、改变this的指向
 * 2、让当前函数执行
 * *******/
fn1.call('hello','1','2'); //这里的this是window

// //手写call方法
Function.prototype.call = function (context) {
    context = context ? Object(context) : window;
    context.fn = this;
    let args = [];
    for(let i = 1; i< arguments.length; i++){
        args.push('arguments['+ i +']'); // ['arguments1','arguments2']
    }
    //利用数组的tostring的特性
    let r = eval('context.fn('+ args +')');
    delete context.fn;
    return r;
}

fn1.call('hello','1','2');

/***
 * 1、原理
 *  fn1.call('hello') 相当于把当前的this指向变成 ‘hello’，
 *  但是有不能直接让this = hello，
     *  在函数中xxx.fn = fn1; 就相当于fn1函数 的this就是xxx了
     *  所以相当于{}.fn = fn1;
 *  eval方法可以让里面的字符串执行，相当于context.fn 执行的是fn1 通过数组的toString 方法将参数一个一个传递进去，然后让fn1 执行；
 *      eval方法 eval(test(a,b){console.log(a,b)});
 *      ES5 写法 function test(a,b){ console.log(a,b)} ; test(1,2);
 *      ES6 写法 function test(...args){ console.log(args)}; test(1,2) =====> 这里打印返回的是参数数组集合 [1,2]
 *  2、注意点
 *  如果是调用多个call，让call执行，则call方法里会让call里的this指向fn2
 *  3、注意delete删除这里是因为我们自己额外添加的属性，使用完成后就不再需要了，所以删除
 *  4、为什么返回return r
     *  const o = {
            a: 1,
            b: 2,
            add: function(c, d) {
                return this.a + this.b + c + d
            }
        };
 *      console.log('ooooooooooooooooooooo',o.add.call({ a: 3, b: 9 }, 3, 4));
 *      这样调用时：
 *      如果为Object里定义方法调用时，如上面的o里面定义了add函数，
 *      如果不返回return r，在下面调用时o.add.call({ a: 3, b: 9 }, 3, 4))，
 *      返回值就为undefined，所以这里需要有返回值；
 * ***/
fn1.call.call.call.call(fn2); //这里的fn1.call相当于 Function.prototype.call