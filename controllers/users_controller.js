const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const commentsMailer = require('../mailers/comments_mailer');

// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}
module.exports.forgot = function(req, res){
    return res.render('user_forgot',{
        title:'Forgot'
    });
}


module.exports.update = async function(req, res){
   

    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
                user.name = req.body.name;
                user.email = req.body.email;
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    user.password=hash;
                    user.save();
                });
                req.flash('success', 'updated successfully');
                user.save()
                return res.redirect('back');

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.update2 = async function(req, res){
   
        try{

            let user = await User.findById(req.params.id);
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    user.password=hash;
                    user.save();
                });
                req.flash('success', 'updated successfully');
                return res.redirect('back');

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                req.body.password=hash;
                User.create(req.body, function(err, user){
                    if(err){req.flash('error', err); return}
    
                    return res.redirect('/users/sign-in');
                })
            });;
           
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}

module.exports.resetlink = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            req.flash('error', 'Account Does not exist');
            return res.redirect('back');
        }else{
            console.log(user);
            commentsMailer.newComment(user);
            req.flash('success', 'Reset mail sent to your email address');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}