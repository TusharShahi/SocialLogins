module.exports = {

    'facebookAuth' : {
        'clientID'      : '187120771934670', // your App ID
        'clientSecret'  : '93b1c856ee896c9d9f05ee91c2eb9c01', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    }
};
