var mongoose = require( 'mongoose' );
var Story = mongoose.model( 'Story' );

module.exports.addStory=function(req,res,next)
{
   var title=req.body.title;
   var content=req.body.content;
   var summary=req.body.summary;
   var imageLink=req.body.imageLink;
   var author =req.session.username;
   console.log("Author is :"+author);

   var newStory=new Story();
   newStory.author=author;
   newStory.title=title;
   newStory.content=content;
   newStory.summary=summary;
   newStory.imageLink=imageLink;

   var lowercaseTitle=newStory.title.toLowerCase();
   var slug=lowercaseTitle.replace(/[^a-zA-Z0-9 ]/g, "");
   var addingHyphen=slug.replace(/\s+/g, '-');

   newStory.slug=addingHyphen;

   newStory.save(function(err,savedStory){
       if(err){
         if(err.code==1100){
         console.log("Story already exists with that story title");
         var message="Story already exists with that story title";
         res.render("register",{errorMessage:message});
		 res.status(500).send();
         return;
       }
	   else{
	     console.log("Server Error");
         var message="Server Error";
         res.render("register",{errorMessage:message});
		 res.status(500).send();
         return;
	   
       }
	   }else{
	     console.log("Story save as"+savedStory._id);
         res.redirect("/stories");
       }
   });
}

module.exports.stories=function(req,res,next){
             Story.find({}, function(err,stories){
                  res.render('home',{stories:stories,session:req.session});
              });
}

module.exports.getStory=function(req,res){
   var url=req.params.story;
   Story.findOne({slug:url}, function(err,story){
           res.render('story',{story:story,session:req.session});
        });
}

module.exports.saveComment=function(req,res){
   var story_slug=req.params.slug;
   var comment=req.body.comment;
   var posted_date=new Date();

   Story.findOne({slug:story_slug}, function(err,story){

               story.comments.push({body:comment,commented_by:req.session.username,date:posted_date});

               story.save(function(err,savedStory){
                   if(err){
                     console.log("Error : While saving comments");
                     return res.status(500).send();
                   }else{
                     res.render('story',{story:story,session:req.session});
                   }
               });

        });
 }
 
module.exports.newStory=function(req,res){
          if(req.session.loggedIn !== true){
            console.log("Logged In :"+req.session.loggedIn);
            res.redirect('/login');
          }else{
              res.render('new-story',{session:req.session});
          }

    }
	
module.exports.techStack=function(req,res){
                                res.render('techStack',{session:req.session});
  }
