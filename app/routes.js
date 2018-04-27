module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for login form
    app.post('/signup',function(req,res)
    {
                    var newUser            = new User();

                    newUser.facebook.id    = req.input.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = req.input.name; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = req.input.email; // facebook can return multiple emails so we'll take the first

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
    });

    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
