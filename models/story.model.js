var mongoose = require("mongoose");

var Schema = mongoose.Schema;

/* var storySchema = new Schema ({
title:{type : String,unique : true,required : true},
content:String,
summary:String,
imageLink:String,
Comments:[{body:String,commented_by:String,date:Date}],
created_at:{type:Date,default:Date.Now}
}); */

var storySchema = new Schema ({
 author:String,
  title: {type: String,unique:true},
  created_at:{type:Date,default:Date.now},
  summary:String,
  content: {type: String},
  imageLink:String,
  comments:[{body:String,commented_by:String,date:Date}],
  slug:String
});
module.exports=mongoose.model('Story',storySchema);