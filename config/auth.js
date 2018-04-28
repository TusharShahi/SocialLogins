module.exports = {

    'facebookAuth' : {
        'clientID'      : '187120771934670', // your App ID
        'clientSecret'  : '93b1c856ee896c9d9f05ee91c2eb9c01', // your App Secret
        'callbackURL'   : 'https://frozen-fjord-27015.herokuapp.com/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'googleAuth' : {

    	'consumerKey' : '486153228121-3q1sgt7bgtp1lcofcq5d8l3sm78235vt.apps.googleusercontent.com',
    	'consumerSecret' : 'UATKOG_X1mXq-2oJ9VdvpmgA',
    	'callbackURL' : 'https://frozen-fjord-27015.herokuapp.com/auth/google/callback'
    }
};
