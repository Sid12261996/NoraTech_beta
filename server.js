const express = require('express'),
  app = express(),
  path = require('path'),
  cors= require('cors');

app.use(cors());


app.use(express.static(path.join(__dirname+'/dist/NoraTech')));
console.log(path.join(__dirname+'/dist/wrapItUp'));
app.listen(process.env.PORT||5000,()=>console.log('Connected!'));

app.get('/*',(req,res)=>{
  console.log("route..!")


  res.sendFile(path.join(__dirname,'/dist/NoraTech/index.html'));
});
