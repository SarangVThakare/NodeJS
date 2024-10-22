/*
Best Practices: Server Client Architecture
Rules:
1. Should not be server side rendering (like sending HTML page), what if its alexa device, it would not be able to track it.
2. But SSR, has its own benefit as its fast, used by google, youtube.
3. JSON(New), XML(Old): Formats in which key value pairs are send (Raw Data) from database by server, and client reads json file and renders on its screen(CSR: client side rendering).
4. Always respect all HTTP methods, what is made for it, use it for it.
*/
const { resolveSoa } = require("dns");
const users=require("./MOCK_DATA.json");
const express=require('express');
const app=express();
const PORT=8000;
const fs=require('fs');
//Making hybrid server... if req comes from browser send, html and if other send json.
//Routes:
// app.get("/api/users/:id",(req,res)=>{
//     return res.json(users);
// });

app.get("/users",(req,res)=>{
    const html=`
    <ul>
        ${users.map((user)=>`<li>${user.first_name}</li>`)}
    </ul>'
    `
    return res.send(html);
});

/*Now we need, dynamic path parameters, for user id = 1, user id = 2, as we can't make cases and changes in code for billions of users.
GET/api/users/:id
*/

// app.post("/api/users/",(req,res)=>{
//     //Create new user...
//     return res.json({status:"pending"});
// });

// app.patch("/api/users/:id",(req,res)=>{
//     //Edit the user's data...
//     return res.json({status:"pending"});
// });

// app.delete("/api/users/",(req,res)=>{
//     //To delete the user's data...
//     return res.json({status:"pending"});
// });
//As we have to define on same route, operations again and again, better use route,as if you have to change your name of route.

//Middleware: whenever form data comes it, converts it into express understable in body.
app.use(express.urlencoded({extended:false}));
//Middleware, are a type of functions, which are called in between client request and server response. they have access to req and response objects and next function, whom to call next, or not, or return response.
//In the order, from top to bottom you write is the stack off middleware.
//example to check whether the username already exists.

app.use((req,res,next)=>{
    console.log("I am the second middleware...");
    //if you don't call next function, it would just stop execution and user would be waiting.
    next();
});

app.use((req,res,next)=>{
    req.userid="Elon";
    next();
});

app.use((req,res,next)=>{
    fs.appendFile("log.txt",`\n ${req.ip} : ${Date.now()} : ${req.method}: ${req.path}`,(err,data)=>{
        next();
    });
    //if next() is inside this, it means next is called once, this middleware is completed withits task, not till then.
});

app.use((req,res,next)=>{
    //see the changes you made by middleware, persists throughout the request.
    console.log(req.userid);
    //here next is the server side routes.
    next();
});

app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    if(!user){return res.status(404).json({error: "user not found"});}
    return res.json(user);
});

app.route("/api/users/")
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);

    //HTTP Headers: Like a envelope of a letter.
    //Important part of API request and response as they represent the meta-data associated with the API request and response.
    //Carry information for the request and the response body.
    //For example, from client some, url-encoded data is coming it would see it in headers, the form and work accordingly.
    console.log(req.headers);
    //It is a good practice to add X- to the custom headers, for client.
    res.setHeader("X-Name","Sarang");
    return res.json(user);
})
.patch((req,res)=>{
    //Edit user with id...
    return res.json({status:"pending"});
})
.post((req,res)=>{
    //Create new user...
    const body=req.body;
    users.push({...body,id: users.length+1});
    //as now it is pushed, so users.length only.
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id: users.length});
    });
})
.delete((req,res)=>{
    //To delete the user's data...
    return res.json({status:"pending"});
});

app.listen(PORT,()=>{console.log("Server intiated...")});

/*
100-199: Informational responses
200-299: Successful responses
300-399: Redirection responses
400-499: Client error responses
500-599: Server error responses
*/