var chalk = require('chalk');
var express=require('express');
var mongoose=require('mongoose');
var db=require("./db");
var routes=require("./routes/routes");
var app=express();
var session=require('express-session');
var bodyParser=require('body-parser');

app.set('view engine','ejs');

// Below Middleware tells the Node engine to use public directory for serving static files
app.use(express.static(__dirname+'/public'));

//Below Middlewares are mainly used for parsing the body & url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Middleware for session cookie Generation
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));

routes.route(app);

var port=process.env.PORT || 8080;

var server = app.listen(port,function(err)
{
 if(err)
 {
   console.error(JSON.stringify(err));
 }
 else
 {
  console.log("Server Listening on"+port);
 }
})