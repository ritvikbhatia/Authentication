const User = require('../models/user');

module.exports.home = async function(req, res){

        return res.render('user_profile', {
            title: "Home"
        });


}

