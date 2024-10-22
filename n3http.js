const http=require('http');
const fs=require('fs');
const url=require('url');
//creating a server...
//request and response
const myserver=http.createServer((req,res)=>{
    const log=`${Date.now()}: ${req.url}: ${req.method} : New req received\n`;
    //here browser sends two requests for favicon.ico
    if(req.url==="/favicon.ico"){
        return res.end();
    }
    const myUrl=url.parse(req.url,true);
    console.log(myUrl);

    fs.appendFile("log.txt",log,(err,data)=>{
        switch(myUrl.pathname){

//if you use req.url it will take everything after domain, show wrong results for /about?id=2
//But after parsing you may use myUrl.pathname in switch.
//const myUrl.query.myname;, takes query myname's value

            case '/': res.end("HomePage");
                break;
            case '/about':
                if(myUrl.query.myname==='community'){
                    res.end("We are community");}
                else{
                    res.end("I am a homepage");
                }
                break;
            case '/contactus':
                res.end("I am contact us");
                break;
            default:
                res.end("I am default page.");
        }
    });
    //console.log(req);
    //console.log(req.headers);
    //it will end the response by this message.
});
//request object: client data(specially meta-data)
//response object: our things

//ports ,like doors on which a single server runs...
//myserver.listen(8000); gives fine result, but we don't get the idea

myserver.listen(8000,()=>{console.log("myserver started running on port 8000.")});

/*
https://www.sarangthakare.dev/services/contactus?userid=sarang&problem=js
Protocol: Hypertext transfer protocol secure.(https)
secure is optional, if its, it means all requests are encrypted.
(www.sarangthakare.dev) this is user friendly name and domain for ip
/ is root page or homepage
nested paths in (/services/contactus/)
query parameters: ?userid=sarang, here userid is key and sarang is the value, and this are separated by &

also, if you pass different queries, you need url node module to parse it.
So, install by npm i url
then if you by chance delete, node module, install by npm install

in finding modules, it first find in dependencies in package-json then in inbuilt packages
*/

/*HTTP METHODS:
GET: When you want to get some data from the server.
Only reads the data.
Default method for get request.
GET POST PUT PATCH DELETE
POST: Send and mutate some data in server.
PUT: To put something like photo, file on server.
PATCH: To alter any existing query like password,
DELETE: To delete something.
*/