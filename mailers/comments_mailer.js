const nodeMailer = require('../config/nodemailer');
const user=require('../models/user')


// this is another way of exporting a method
exports.newComment = (user) => {
    let htmlString = nodeMailer.renderTemplate({user: user}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
       from: 'Ritvik',
       to: user.email,
       subject: "New Comment Published!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}