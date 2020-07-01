//NODEMAILAR
var nodemailer=require('nodemailer')

async function mailer (options)
{
  //server side
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "62fbb57f7995e4",
      pass: "2faced10224c0d"
    }
  });

  //To client side
  var mailoptions={

    from:"Hemant <hemantkumargupta36@gmail.com>",
    to :options.email,
    subject:options.subject,
    message:options.message
  }
  await transporter.sendMail(mailoptions)
  
}

module.exports= mailer
