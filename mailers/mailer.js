const nodeMailer = require('../config/nodemailer');
const user=require('../models/user')


// this is another way of exporting a method
exports.newMail = (user) => {
    let htmlString = nodeMailer.renderTemplate({user: user}, '/mails/new_mail.ejs');

    nodeMailer.transporter.sendMail({
       from: 'Ritvik',
       to: user.email,
       subject: "Reset your password!",
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