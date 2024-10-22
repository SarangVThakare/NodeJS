/*Web Sockets(Protocol):
Earlier: Client can only send request, and only server can send response, so problem arises in real-time applications as, now for new information every time client has to poll(send a request), and many times it may happen there is no useful response for the user, causing overload on server by millions of users and waste of time for client.
In case of websockets, it sends a HTTP Request and use Upgrade Header for WS, and tells that we have to make a WebSocket Connection (Bidirectional Connection).
Also, if we desire we can close the connection when you want.
*/
const http=require("http");
const path=require('path');
const express=require('express');
const app=express();
const server=http.createServer(app);
const{Server}=require("socket.io");
const io=new Server(server);//this would handle all websocket and the http part would handle simple http request

//socket is client
io.on('connection',(socket)=>{
    console.log("New User is connected:",socket.id);
    socket.on('usermsg',(message)=>{
        io.emit('msg',message); //in place of msg you may name anything
    })
})

app.use(express.static(path.resolve("./public")));

app.get("/",(req,res)=>{
    return res.sendFile("./public/index.html");
});

server.listen(8000,()=>{console.log(`Server started at PORT: 8000`)});