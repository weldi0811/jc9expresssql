const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        service : 'gmail',
        auth : {
            type : 'OAuth2',
            user: 'weldi0811@gmail.com',
            clientId : '238497532592-bp12v9qltnmrv4t9c8j9g5ehmfr86dqq.apps.googleusercontent.com',
            clientSecret : 'vKuwtkkr2E81uPsJoohBix3j',
            refreshToken : '1/7aGuzi3gIczRgEG3uZuRupKi60BSK_6gfI6KBbTg1ys'
        }
    }
)

const mail = {
    from : 'G2A.com',
    to : 'rochafi.dev@gmail.com',
    subject : 'Congratulations!',
    html : `<h1>Mohon segera menyelesaikan pembayaran 123</h1>
            <img src='https://asset.kompas.com/crop/13x0:894x587/750x500/data/photo/2018/11/23/4178012753.jpg'>`
}

transporter.sendMail(mail,(err,result) => {
    if(err) return console.log(err.message)
    
    console.log('oke')
})