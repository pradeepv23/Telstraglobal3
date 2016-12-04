var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

module.exports.addUser=function(req,res,next)
{
   var username=req.body.username;
   var email=req.body.email;
   var password=req.body.password;

   var newuser=new User();
   newuser.username=username;
   newuser.email=email;
   newuser.password=password;   
   newuser.save(function(err,savedUser){
      if(err)
	  {
       if(err.code==1100){
         console.log("User already exists with that username or email");
         var message="A user already exists with that username or email";
         res.render("register",{errorMessage:message});
         return;
       }
	   else{
	     console.log("Server Error");
         var message="Server Error";
         res.render("register",{errorMessage:message});
         return;
	   }
	   }else{
	     console.log("User Saved as "+savedUser._id);
         req.session.newuser=savedUser.username;
         res.render("new-user",{session:req.session});
       }
   });
}

module.exports.logout=function(req,res,next){
    console.log("Logging  Out :"+req.session.username);
    var loggedOutUser=req.session.username;
    req.session.destroy();
    console.log("Logged Out :"+loggedOutUser);
    res.render('logout',{loggedOutUser:loggedOutUser});
}