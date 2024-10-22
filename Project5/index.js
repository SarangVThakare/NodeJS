const express=require('express');
const app=express();
const {connectToMongoDB}=require("./connect");
const urlRoute=require('./routes/url');
const path=require('path');
const cookieParser=require('cookie-parser');
const {checkForAuthentication,restrictTo}=require('./middlewares/auth');

const URL=require('./models/url');
const staticRouter=require("./routes/staticRouter");
const userRoute=require("./routes/user");

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>{console.log("MongoDB connected...")});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.get("/oldtest",async (req,res)=>{
    const allUrls=await URL.find({});
    return res.end(`
        <html><head></head>
        <body>
<ol>${allUrls.map(url=>`<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}</ol>
        </body></html>
        
        `);
});
/*
we have to handle ui which itself have many parts, so it is not to handle everything here, instead we use, ejs,pug or handlebars
Ejs stands for embedded javascript templating
*/

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));
app.get("/test",async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render("home",{
        urls:allUrls,
        name:"Sarang",
    });
});

app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/",staticRouter);
app.use("/user",userRoute);

app.get("/url/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push: {visitHistory: {
        timestamp: Date.now(),
                    }
            },}
        );

    res.redirect(entry.redirectURL);
    }
);

app.get("/analytics/:id")
const port=8000;
app.listen(port,()=>console.log("Server Started"));

/*
We may store sessions uid in database, which would increase latency of about 200ms, and it would increase read operations, leading to bill increase.
Also security is also at risk, as these are stored somewhere.

Browser: Always sends cookies along with any request.
Cookies are domain specific.

But cookies are browser-concentric and for mobile apps, tokens are sent in responses res.json()

*/