const cluster=require('node:cluster');
const os=require('os');
const express=require('express');
const app=express();
const process=require('process');
const totalCpus=os.cpus().length;

if(cluster.isPrimary){
    for(let i=0;i<totalCpus;i++){
        cluster.fork();
    }
} else{
    const app=express();
    app.get("/",(req,res)=>{
        return res.json({
            message: `Hello from Express Server ${process.pid}`
        });
    });
    app.listen(8000,()=>console.log(`Server Started`));
}
