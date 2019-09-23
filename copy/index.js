//深拷贝 拷贝后的结果更新是不会影响拷贝前的， 拷贝前后是没有关系的
//浅拷贝 改变拷贝前的内容 会对拷贝之后的有影响 拷贝前后是有关系的

// 引用关系
// ...运算符只能拷贝一层（浅拷贝)
//案例一
let obj = { name: 'jw',address:{x:100,y:100}};
let o = {...obj};
obj.address.x = 200;
console.log(obj,o);

//案例二
let a = [1,2,3];
let arr = [a];
let newArr = arr.slice();
newArr[0][0] = 200;
console.log(arr,newArr)

//深拷贝
let obj1 = {name: 'jw', address:{x:100,y:100}};
let o1 = JSON.parse(JSON.stringify(obj1));
o1.address.x = 'o1 hello';
console.log(obj1,o1)

// 缺点，不能处理复杂的
let obj2 = {
    name: 'jw',
    address:{x:100,y:100},
    n: new Date(),
    f: function () {}
};
let o2 = JSON.parse(JSON.stringify(obj1));
o2.address.x = 'o1 hello';
console.log(obj2,o2)

// 递归拷贝
function deepClone(obj, hash = new WeakMap()) {
    if(obj == null) return obj; //如果是null、undefined 就不进行操作
    if(obj instanceof Date ) return new Date(obj); //使用new Date传递进来一个日期就可以得到之前保存的日期值
    if(obj instanceof RegExp) return new RegExp(obj);

    //如果是对象或者普通的值 如果是函数，是不需要深拷贝的，因为函数是用来调用的
    if(typeof obj !== 'object') return obj;
    //如果是对象的话就进行深拷贝，对象又分为 [] 和 {}
    //Object.prototype.toString.call(obj) === [Object Array] ? []:{}
    if(hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor; //如果是数组 obj.constructor  ==[Object Array],如果是对象则是object 所以这里直接new就可以了
    hash.set(obj,cloneObj)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            //实现一个递归, 这是因为如果是一个对象，不用deepClone进行递归，则是一个浅拷贝
            cloneObj[key] = deepClone(obj[key],hash);
        }
    }
    return cloneObj;
    console.log('111111111111111111=====>',obj3.constructor)
}

// let obj3 = new RegExp();
let obj3 = { name:"11"};
obj.o = obj3; //设置hash值那里
let o3 = deepClone(obj3);
console.log(obj3,o3);
/***
 * 方法一：使用JSON.parse,（不完整的深拷贝，不能实现复杂的拷贝）
 * 缺点：1、如果是复杂的就不可以实现，里面包含函数的
 *       2、如果里面有undefined、null、new Date()、Boolean、String关键字这种
 * 方法二：递归拷贝
 * ***/
