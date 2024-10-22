const express=require('express');
const app=express();
const {connectToMongoDB}=require("./connect");
const urlRoute=require('./routes/url');
const URL=require('./models/url');

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>{console.log("MongoDB connected...")});

app.use(express.json());
app.use("/url",urlRoute);
app.get("/:shortId",async (req,res)=>{
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