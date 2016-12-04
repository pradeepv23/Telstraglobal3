var mongoose = require( 'mongoose' );
var userController = require( '../controllers/user.controller' );
var storyController = require( '../controllers/story.controller' );
var authenticateController = require( '../controllers/authenticate.controller' );
var User = mongoose.model( 'User' );


module.exports.route=function(app)
{
 app.get("/",function(req,res,next)
 {
   // The below Middleware code defined in app.js will take care of session generation
   // app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));
   res.render('index',{session:req.session});
 }) 
 
 app.get("/register",function(req,res,next)
 {
   res.render('register');
 })
 
  app.post("/newUser",userController.addUser);
 
 app.get("/login",function(req,res,next)
 {
   res.render('login');
 })
 
 app.get("/story:storyName",function(req,res,next)
 {
   res.render('story');
 })
 
 app.get('/stories',storyController.stories);
 
 app.get('/stories/:story',storyController.getStory);
 
 app.post('/stories/:slug/saveComment',storyController.saveComment);
 
 app.post("/authenticate",authenticateController.authenticate);
 
 app.post('/add-story',storyController.addStory);
 
 app.get('/logout',userController.logout);
 
 app.get('/new-story',storyController.newStory);
 
 app.get('/techStack',storyController.techStack);
 
 
 
}