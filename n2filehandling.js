const fs=require('fs');
const os=require('os');
console.log(os.cpus().length);
//Sync
fs.writeFileSync("./n2test.txt","I am created and edited.");
//Async
//fs.writeFile("./n2test.txt","Rewriting it asynchronousally...",(err)=>{});
const data1 = fs.readFileSync("./n2test.txt","utf-8");
console.log(data1);
const data2=fs.readFile('./n2test.txt','utf-8',(err,result)=>{
    if(err){console.log("Error is: ",err);}
    else{console.log(result);}
});
//here if its synchronous, it returns the value and the asynchronous one, don't return anything but expect a callback.
fs.appendFileSync("./n2test.txt",new Date().getDate().toLocaleString());
fs.cpSync("./n2test.txt","./n2testcopy.txt");
fs.cpSync("./n2test.txt","./n2testcopy1.txt");
fs.unlinkSync("./n2testcopy1.txt");

console.log(fs.statSync("./n2test.txt"));
console.log(fs.statSync("./n2test.txt").isFile());

fs.mkdirSync('n2testdir');
fs.mkdirSync('n2testdir/n2in');
fs.mkdirSync('n2testdir/n2in1');

/*Node js Architecture:
Request->Event Queue->Event Loop
Types of Requests: Blocking operations: Synchronous tasks
Non-blocking operations: Asynchronous tasks

Blocking Operation: Needs a thread, assign it then, make it work and return the result.
*/



