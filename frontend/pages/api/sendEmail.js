import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

function validarDados({ nome, email, celular, mensagem, language, honeypot, startTime }) {
  const erros = [];

  if (honeypot) {
    erros.push(language === 'pt' ? 'Bot detectado.' : (language === 'en' ? 'Bot detected.' : 'Bot detectado.'));
  }

  const elapsedTime = Date.now() - startTime;
  if (elapsedTime < 3000) {
    erros.push(language === 'pt' ? 'Formulário enviado muito rápido.' : (language === 'en' ? 'Form submitted too quickly.' : 'Formulario enviado demasiado rápido.'));
  }

  if (!nome) {
    erros.push(language === 'pt' ? 'Nome é obrigatório.' : (language === 'en' ? 'Name is required.' : 'El nombre es obligatorio.'));
  }
  if (!email) {
    erros.push(language === 'pt' ? 'Email é obrigatório.' : (language === 'en' ? 'Email is required.' : 'El correo electrónico es obligatorio.'));
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erros.push(language === 'pt' ? 'Email inválido.' : (language === 'en' ? 'Invalid email.' : 'Correo electrónico no válido.'));
  }
  if (!celular) {
    erros.push(language === 'pt' ? 'Celular é obrigatório.' : (language === 'en' ? 'Phone number is required.' : 'El número de teléfono es obligatorio.'));
  }
  if (!mensagem) {
    erros.push(language === 'pt' ? 'Mensagem é obrigatória.' : (language === 'en' ? 'Message is required.' : 'El mensaje es obligatorio.'));
  }

  return erros;
}

export async function enviarEmailContato({ nome, email, celular, mensagem, language, honeypot, startTime }) {
  const erros = validarDados({ nome, email, celular, mensagem, language, honeypot, startTime });
  if (erros.length > 0) {
    return { message: erros.join(' ') };
  }

  const mailOptions1 = {
    from: process.env.SMTP_USER,
    to: process.env.NOTIFICATION_EMAIL_1,
    subject: 'Novo Contato - Formulário de Contato',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #00FFFF; color: white; padding: 10px 15px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Contato Recebido</h1>
        </div>
        <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; line-height: 1.6;"><strong>Nome Completo:</strong> ${nome}</p>
          <p style="font-size: 16px; line-height: 1.6;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; line-height: 1.6;"><strong>Celular:</strong> ${celular}</p>
          <p style="font-size: 16px; line-height: 1.6;"><strong>Mensagem:</strong></p>
          <p style="font-size: 16px; line-height: 1.6; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${mensagem}</p>
        </div>
      </div>
    `
  };

  const mailOptions2 = {
    from: process.env.SMTP_USER,
    to: process.env.NOTIFICATION_EMAIL_2,
    subject: 'Novo Contato - Formulário de Contato',
    html: mailOptions1.html
  };

  const mailOptions3 = {
    from: process.env.SMTP_USER,
    to: email,
    subject: language === 'pt' ? 'Recebemos sua mensagem' : (language === 'en' ? 'We Received Your Message' : 'Hemos Recibido Tu Mensaje'),
    html: language === 'pt' ? `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #00FFFF; color: white; padding: 10px 15px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Mensagem Recebida</h1>
        </div>
        <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; line-height: 1.6;">Olá ${nome},</p>
          <p style="font-size: 16px; line-height: 1.6;">Meu sistema recebeu sua mensagem e entrarei em contato em breve.</p>
          <p style="font-size: 16px; line-height: 1.6;">Atenciosamente,</p>
          <p style="font-size: 16px; line-height: 1.6;">Daniel Neri</p>
        </div>
      </div>
    ` : language === 'en' ? `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #00FFFF; color: white; padding: 10px 15px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Message Received</h1>
        </div>
        <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; line-height: 1.6;">Hello ${nome},</p>
          <p style="font-size: 16px; line-height: 1.6;">My system has received your message and I will get in touch soon.</p>
          <p style="font-size: 16px; line-height: 1.6;">Best regards,</p>
          <p style="font-size: 16px; line-height: 1.6;">Daniel Neri</p>
        </div>
      </div>
    ` : `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #00FFFF; color: white; padding: 10px 15px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Mensaje Recibido</h1>
        </div>
        <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; line-height: 1.6;">Hola ${nome},</p>
          <p style="font-size: 16px; line-height: 1.6;">Mi sistema ha recibido tu mensaje y me pondré en contacto contigo pronto.</p>
          <p style="font-size: 16px; line-height: 1.6;">Atentamente,</p>
          <p style="font-size: 16px; line-height: 1.6;">Daniel Neri</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions1);
    await transporter.sendMail(mailOptions2);
    await transporter.sendMail(mailOptions3);
  } catch (error) {
    console.error('Erro ao enviar e-mails:', error);
    return { message: `Erro ao enviar e-mails: ${error}` };
  }
}

const handleRequest = async (req, res) => {
  if (req.method === 'POST') {
    const { nome, email, celular, mensagem, language, honeypot, startTime } = req.body;
    const result = await enviarEmailContato({ nome, email, celular, mensagem, language, honeypot, startTime });
    console.log('Resultado:', result);
    res.status(200).json(result);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};

export default handleRequest;