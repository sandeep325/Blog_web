const express =   require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan =  require("morgan");
const Routes =  require('./Api/Route/Route');
const mongoose = require("./Connection/db");
require("./Api/Model/Blog.Model");
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*" );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({extended:false}));
app.use("*",cors());
app.use(morgan("dev"));


// routes
app.use('/api/v1',Routes);

// if url not match for api 
app.use((req,res,next)=>{
    const error = new Error('URL Not Valid.');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
          error: {
                message: error.message
          }
    });
  }); 


app.listen(process.env.PORT,()=>{ console.log(`server is running on : ${process.env.PORT}`);});
