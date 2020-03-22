var nodemailer = require('nodemailer');
const fs = require('fs');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'fe@fe.com',
    pass: 'sd'
  }
  // host: 'smtp.umbler.com',
  // port: 587,
  // secure: false, // true for 465, false for other ports
  // auth: {
  //   user: "adda@asd.com", // generated ethereal user
  //   pass: "asd@asd" // generated ethereal password
  // }
});

/* função para verificar se o e-mail é válido */
/* ainda não é útil */
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

async function getEmailList () {
  
  try {
    var allEmails = await fs.readFileSync('destination.txt', "utf8")
  } catch (err) {
    console.error("Erro na leitura dos e-mails", err);
  }
  
  var emailInArray = await allEmails.split("\n");

  emailInArray = await emailInArray.map(email => {
      return String(email).toLowerCase();
  })
  return emailInArray;
}

async function senderOneByOne () {
  var emailList = await getEmailList();
  for ( [index, email] of emailList.entries() ) {
    var mailOptions = {
      from: 'NEDDIG ⚖💻 - II Seminário de Direito Digital <neddig.ufrn@gmail.com>',
      to: email,
      subject: 'SUBJECT ',
      text: "",
      html: `<p>Olá, venho convida-lo(a) para </p>
        `
    }
    try{
      let info = await transporter.sendMail(mailOptions);
      console.log(index, " Envio para:", email);
    } catch(err) {
      console.log(index, "Houve um erro ao enviar o e-mail:", email);
    }
  } 
}

senderOneByOne();