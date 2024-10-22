const express=require('express');
const fs=require('fs');
const status=require('express-status-monitor');
const app=express();
const PORT=8000;
const zlib=require('zlib');

app.use(status());

// app.get("/",(req,res)=>{
//     fs.readFile("./sample.txt",(err,data)=>{
//         res.json({data});
//     });
// });
/*
In this case the file should be loaded on the memory of device completely in tha=e data variable and then sent to the client, it is both memory and time-inefficient.
So we use stream, chunks of data.
*/

app.get("/",(req,res)=>{
    const stream=fs.createReadStream("./sample.txt","utf-8");
    stream.on("data",(chunk)=>res.write(chunk));
    stream.on("end",()=>res.end());
});
//res.write is used to send data in chunks only and res.end is required to inform browser that now no further data is to be streamed.
//In this case streams pass data as it comes, in chunks, no heavy memory consumption and time consumption, also in response headers, Transfer-Encoding: chunked, it actually doesn't end response as content is being sent continuousally.
//alo content-length header is omitted, as browser don't know exact size of data.

//now let's say, you want to zip a file of size 400MB, then first it is read in memory, then zipped, 800MB over,then it is sent.
//solution: it reads by chunks, gives it to zipper and writes the zip file in chunks.
fs.createReadStream("./sample.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")));

app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));
