const User = require('../models/user');

module.exports.home = async function(req, res){

        return res.render('user_profile', {
            title: "Home"
        });


}
module.exports.reset = async function(req, res){

    return res.render('users_reset', {
        title: "Home",
        idd:req.params.id
    });


}
