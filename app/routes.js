var mongoose = require('mongoose');

var User       = require('../app/models/user');


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    //route for login
    app.post('/login',function(req,res)
    {

        User.findOne({'email' : req.body.email},function(err,user)
        {

                            // ie an error connecting to the database
                if (err)
                    throw err;

                // if the user is found, then log them in
                if (user) {
                    console.log('userfound');                    
                    var data = {};
                    data['name'] = user.name;
                    data['email'] = user.email;
                    data['id'] = user.id;
                    if(data['facebooktoken'] != null)
                    {
                            data['facebooktoken'] = user.facebooktoken;
                    }
                    

                    res.render('profile.ejs',{user : data});// user found, return that user
                    


                } else {
                    console.log('no user');
                    res.render('index.ejs');
                }


        });
        
    });


    // route for signup form
    app.post('/signup',function(req,res)
    {

        User.findOne({ 'email' : req.body.email }, function(err, user) {

                if (err)
                    throw err;

                if (user) {
                    res.render('index.ejs'); // user found, return that user
                } else {

                    var newUser            = new User();

                    newUser.name = req.body.name;
                    newUser.email   = req.body.email;                   
                    newUser.facebooktoken = null; // we will save the token that facebook provides to the user                    
                    newUser.id = makeid();

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        res.redirect('/');
                    });
                }
                 
    });

    });

    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
            console.log("here");
            res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    //

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next) {

    console.log("here");
    if (req.isAuthenticated())
        return next();
    console.log("here");
    res.redirect('/');
}
