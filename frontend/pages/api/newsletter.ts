import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Configuração de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX, 10), // Limite de requisições por IP
  message: process.env.RATE_LIMIT_MESSAGE
});

function validarDados({ email, honeypot, startTime, userAgent, ip }) {
  const erros = [];

  // Verificação de honeypot
  if (honeypot) {
    erros.push('Bot detectado.');
  }

  // Verificação de tempo de preenchimento do formulário
  const elapsedTime = Date.now() - startTime;
  if (elapsedTime < 3000) {
    erros.push('Formulário enviado muito rápido.');
  }

  // Validação simples de email
  if (!email || !email.includes('@')) {
    erros.push('Email inválido.');
  }

  // Verificação de User-Agent
  const botUserAgents = ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot'];
  if (botUserAgents.some(bot => userAgent.includes(bot))) {
    erros.push('Bot detectado pelo User-Agent.');
  }

  // Verificação de IP (exemplo simples, pode ser expandido)
  const blockedIPs = []; // Lista de IPs bloqueados
  if (blockedIPs.includes(ip)) {
    erros.push('IP bloqueado.');
  }

  return erros;
}

async function enviarEmailNewsletter(email: string) {
  const mailOptions1 = {
    from: process.env.SMTP_USER,
    to: process.env.NOTIFICATION_EMAIL_1,
    subject: 'Novo Registro no Newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #00FFFF; color: white; padding: 10px 15px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Novo Registro no Newsletter</h1>
        </div>
        <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; line-height: 1.6;"><strong>Email:</strong> ${email}</p>
        </div>
      </div>
    `
  };

  const mailOptions2 = {
    from: process.env.SMTP_USER,
    to: process.env.NOTIFICATION_EMAIL_2,
    subject: 'Novo Registro no Newsletter',
    html: mailOptions1.html
  };

  const mailOptions3 = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Confirmação de Registro no Newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #00FFFF; color: white; padding: 10px 15px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Registro Confirmado</h1>
        </div>
        <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; line-height: 1.6;">Olá,</p>
          <p style="font-size: 16px; line-height: 1.6;">Obrigado por se registrar no nosso newsletter. Você receberá atualizações em breve.</p>
          <p style="font-size: 16px; line-height: 1.6;">Atenciosamente,</p>
          <p style="font-size: 16px; line-height: 1.6;">Equipe</p>
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
    throw new Error(`Erro ao enviar e-mails: ${error}`);
  }
}

function getLocalizedMessage(language: string, key: string): string {
  const messages = {
    en: {
      emailRegistered: 'This email is already registered',
      emailSaved: 'Email registered successfully!',
      emailSaveError: 'Error saving the email',
      methodNotAllowed: 'Method not allowed',
      tooManyRequests: 'Too many requests from this IP, please try again later.',
      invalidData: 'Invalid data provided'
    },
    pt: {
      emailRegistered: 'Este email já está registrado',
      emailSaved: 'Email registrado com sucesso!',
      emailSaveError: 'Erro ao salvar o email',
      methodNotAllowed: 'Método não permitido',
      tooManyRequests: 'Muitas requisições deste IP, por favor tente novamente mais tarde.',
      invalidData: 'Dados inválidos fornecidos'
    },
    es: {
      emailRegistered: 'Este correo electrónico ya está registrado',
      emailSaved: '¡Correo electrónico registrado con éxito!',
      emailSaveError: 'Error al guardar el correo electrónico',
      methodNotAllowed: 'Método no permitido',
      tooManyRequests: 'Demasiadas solicitudes de esta IP, por favor intente nuevamente más tarde.',
      invalidData: 'Datos inválidos proporcionados'
    }
  };

  return messages[language]?.[key] || messages['en'][key];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const language = req.query.language as string || 'en';

  // Executar rate limiting manualmente
  await new Promise<void>((resolve, reject) => {
    limiter(req as unknown as Parameters<typeof limiter>[0], res as unknown as Parameters<typeof limiter>[1], (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });

  if (req.method === 'POST') {
    const { email, honeypot, startTime } = req.body;
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const erros = validarDados({ email, honeypot, startTime, userAgent, ip });
    if (erros.length > 0) {
      return res.status(400).json({ error: getLocalizedMessage(language, 'invalidData') });
    }

    try {
      // Verificar se o e-mail já está registrado
      const existingEmail = await prisma.newsletter.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return res.status(400).json({ error: getLocalizedMessage(language, 'emailRegistered') });
      }

      await prisma.newsletter.create({
        data: { email },
      });

      // Enviar e-mail após registro de forma assíncrona
      enviarEmailNewsletter(email).catch(error => console.error('Erro ao enviar e-mails:', error));

      return res.status(200).json({ message: getLocalizedMessage(language, 'emailSaved') });
    } catch {
      return res.status(500).json({ error: getLocalizedMessage(language, 'emailSaveError') });
    }
  } else {
    return res.status(405).json({ error: getLocalizedMessage(language, 'methodNotAllowed') });
  }
}