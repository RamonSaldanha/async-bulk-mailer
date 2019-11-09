var nodemailer = require('nodemailer');
const fs = require('fs');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  host: 'smtp.umbler.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "contato@pontogram.com.br", // generated ethereal user
    pass: "xxx" // generated ethereal password
  }
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
      from: 'Pontogram 🚀🚀 <contato@pontogram.com.br>',
      to: email,
      subject: 'Oiii, você já conhece o pontogram?',
      text: "",
      html: `<p>Ol&aacute;,</p>
      <p>eu me chamo Ramon, sou desenvolvedor do software <a href="https://pontogram.com.br">Pontogram</a>.</p>
      <p>voc&ecirc; ainda n&atilde;o conhece o pontogram? deveria conhecer.&nbsp;</p>
      <p>Essa &eacute; a <strong>oportunidade</strong> de inserir sua marca de uma vez por todas no mercado. A cada dia as grandes empresas buscam um meio de obter um <strong>alcance satisfat&oacute;rio com pouco esfor&ccedil;o</strong>. Por outro lado, solu&ccedil;&otilde;es nesse sentido s&atilde;o escassas, principalmente as destinadas a empresas de pequeno porte.<br />No fim das contas, o acesso &eacute; muito mais dif&iacute;cil para quem est&aacute; come&ccedil;ando com poucos recursos, afinal, h&aacute; uma restrita oferta e uma vasta demanda, por isso os softwares tradicionais s&atilde;o demasiadamente caros.<br />&Eacute; essa a barreira que o pontogram supera.</p>
      <p>&nbsp;</p>
      <p><a href="https://pontogram.com.br/">Venha conhecer o pontogram.</a></p>`
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