const nodemailer = require('nodemailer');


const testAccount = {
    user: 'noratechsolutionspvtltd@gmail.com',
    pass: 'noraAsdf@123'
};

exports.sendMail = async function sendMail(subject, body) {
    let info = await transporter.sendMail({
        from: 'noratechsolutionspvtltd@gmail.com', // sender address
        to: "sidharthrkc@gmail.com;info@noratechnologies.com", // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body

    });
    if (info.accepted !== null && info.accepted !== []) {
        return true;
    }
else return false;
};
const transporter = nodemailer.createTransport({
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
    },

    service: 'gmail'
});
