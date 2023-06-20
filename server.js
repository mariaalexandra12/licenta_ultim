const express=require('express');
const app = express();

app.get("/",function(res,req){
    res.send("buna");
})


app.listen(3002,function(){
    console.log('running in 3002');
})