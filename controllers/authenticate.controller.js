var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

module.exports.authenticate=function(req,res,next)
{
  var email=req.body.email;
    var password=req.body.password;

    User.findOne({email:email}, function(err,user){
      console.log("User "+user);
      if(user==null){
        console.log("User is null redirecting to login");
        var message="Invalid email or password";
        console.log("Message :"+message);
        res.render("login",{errorMessage:message});
        return;
      }
     user.comparePassword(password,function(err,isMatch){
       if(isMatch && isMatch==true){
         console.log("Authentication Sucessfull");
         req.session.username=user.username;
         req.session.loggedIn=true;
         console.log("Got User : "+req.session.username);
         res.render("new-story",{session:req.session});
       }else{
         console.log("Authentication UnSucessfull");
         var message="Invalid email or password";
         console.log("Message :"+message);
         res.render("login",{errorMessage:message});
         return;
       }
     });
    });
}