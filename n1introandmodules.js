//for built-in packages
//require function is basically in node.js only
const n1m=require('buffer');
//for packages or modules we made
const n1mod=require('./n1module');

console.log("Hello");
//to run command node n1.js or even n1 as node js only runs js files
//window objects are not defined in node js, also as dom manipulation is not available in node.js

//when we divide our code database in parts called as modules, it is called as modular programming
function add(a,b){
    return a+b;
}

console.log(add(3,4));
/*if it have been 1st line of exports:
console.log(n1mod);
//Handle with care

*/

console.log(n1mod);
//console.log(n1mod(3,4)); //as now its an object
//console.log(n1mod.mul(3,4)); error as now its key is mulFn not mul
console.log(n1mod.mulFn(3,4));
//console.log(n1mod.remainder(7,3)); if second export method would have been used