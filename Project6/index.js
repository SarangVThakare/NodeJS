const path=require('path');
const express=require('express');
const multer=require('multer');

const app=express();

const storage=multer.diskStorage({
    //request object, file uploaded, callback function(error,folder_name)
    destination:function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename: function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload=multer({storage});

app.set('view engine','ejs');
app.set("views",path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    return res.render("homepage");
});

app.post("/upload",upload.single([{name:'profileImage'},{name: 'coverImage'}]),(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
});

















const port=8000;
app.listen(port,()=>console.log("Server Started..."));