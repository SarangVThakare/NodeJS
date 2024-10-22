function mul(a,b){
    return a*b;
}
function div(a,b){
    return a/b;
}
//module.exports="Handle with care";
//module.exports=mul;
//if you write multiple module.exports then it overwrites.

//multiple export
// module.exports={
//     mulFn: mul,
//     divFn: div
// }

exports.remainder=(a,b)=>{
    return a%b;
}


