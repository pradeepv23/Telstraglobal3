var mongoose = require("mongoose");
var userModel = require("./models/user.model");
var storyModel = require("./models/story.model");

var dbURI = 'mongodb://ravi:ravi123$@ds119738.mlab.com:19738/telstra';

module.exports.connect=mongoose.connect(dbURI);

mongoose.connection.on('connected',function()
{
 console.log("Mongoose Connected");
 /* var newUser=new userModel();
 newUser.username="3";
 newUser.email="bcr.com";
 newUser.password="bcr123";
 newUser.save(); */
});

mongoose.connection.on('error',function(err)
{
 console.log("Mongoose error"+err);
});

mongoose.connection.on('disconnected',function()
{
 console.log("Mongoose disconnected");
});