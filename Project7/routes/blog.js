const {Router} = require("express");
const router = Router();
const multer=require('multer');
const fs=require('fs');
const path=require('path');
const Blog=require('../models/blog');

const storage=multer.diskStorage({
    destination: function (req,file,cb){

        const dirPath=path.join('./public/uploads',req.user._id);
        if(!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        };
        cb(null,dirPath);
    },
    filename: function(req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null,fileName);
    },
});

const upload = multer({storage: storage});

router.get("/add-new", (req,res)=>{
    return res.render('addblog',{
        user:req.user,
    })
});

router.get("/:id",async (req,res)=>{
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    //it is use to add createdBy information to blog.
    return res.render("blog",{
        user:req.user,
        blog,
    })
})

router.post("/add-new",upload.single('coverImage'),async (req,res)=>{
    const {title,body}=req.body;
    const blog = await Blog.create({
        body:body,title,createdBy:req.user._id,
        coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
});


module.exports=router;