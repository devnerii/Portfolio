'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Linkedin, ArrowRight, Check, Github, Instagram, Briefcase } from 'lucide-react';
import { SiFreelancer } from "react-icons/si";
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

const socialIcons = [
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/daniel-neri-51a7b12b3', label: 'LinkedIn' },
  { Icon: Github, href: 'https://github.com/devnerii', label: 'GitHub' },
  { Icon: Instagram, href: 'https://instagram.com/nerix', label: 'Instagram' },
  { Icon: SiFreelancer, href: 'https://www.freelancer.com/u/devneri', label: 'Freelancer' },
  { Icon: Briefcase, href: 'https://www.workana.com/freelancer/605927d469678a6ae9166b97adaf1160', label: 'Workana' },
];

const footerLinks = [
  { title: 'home', href: '#home' },
  { title: 'about', href: '#sobre' },
  { title: 'services', href: '#servicos' },
  { title: 'contact', href: '#contato' },
];

const InteractiveLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a href={href} onClick={handleClick} className="group relative overflow-hidden">
      <motion.span
        className="relative z-10 text-white transition-colors duration-300 group-hover:text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-blue-400 transition-transform duration-300 group-hover:scale-x-100"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      />
    </a>
  );
};

const SocialIcon = ({ Icon, href, label }: { Icon: React.ElementType; href: string; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-blue-400 hover:text-white transition-colors duration-300"
    whileHover={{ scale: 1.3, rotate: 10 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={28} />
  </motion.a>
);

export default function Footer() {
  const { t } = useTranslation('common');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar email');
      }

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Daniel Neri</title>
        <meta name="description" content={t('footer.description')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.seusite.com" />
      </Head>
      <footer className="bg-gradient-to-t from-blue-800 to-blue-700 text-white dark:from-gray-800 dark:to-gray-900 py-16 px-4 sm:px-8 lg:px-12 relative flex justify-center items-center">
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center justify-items-center">
            {/* Seção de Informações da Empresa */}
            <div className="space-y-4">
              <motion.h2
                className="text-3xl font-bold font-montserrat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {t('footer.name')}
              </motion.h2>
              <motion.p
                className="text-sm opacity-80 font-open-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t('footer.tagline')}
              </motion.p>
              <motion.div
                className="flex justify-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {socialIcons.map(({ Icon, href, label }, index) => (
                  <SocialIcon key={index} Icon={Icon} href={href} label={label} />
                ))}
              </motion.div>
            </div>

            {/* Seções de Links Rápidos */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-montserrat">{t('footer.quickLinks')}</h3>
              <ul className="flex space-x-4">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <InteractiveLink href={link.href}>{t(`footer.${link.title}`)}</InteractiveLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Seção de Inscrição no Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold font-montserrat">{t('footer.newsletter')}</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder={t('footer.emailPlaceholder')}
                    {...register('email', { required: t('footer.emailRequired'), pattern: { value: /^\S+@\S+$/i, message: t('footer.emailInvalid') } })}
                    className="w-full px-4 py-3 bg-white/10 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-4 bg-blue-500 text-white rounded-full hover:bg-white hover:text-blue-500 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={t('footer.submit')}
                  >
                    <ArrowRight size={24} />
                  </motion.button>
                </div>
                {errors.email && (
                  <motion.p className="text-red-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {errors.email.message}
                  </motion.p>
                )}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-400 text-sm flex items-center space-x-1"
                    >
                      <Check size={16} />
                      <span>{t('footer.thankYou')}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Seção Inferior do Footer */}
          <motion.div
            className="mt-16 pt-8 border-t border-white/20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm opacity-60 font-open-sans">
              © {new Date().getFullYear()} {t('footer.companyName')}. {t('footer.allRightsReserved')}.
            </p>
          </motion.div>

          {/* Elemento Decorativo */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
            <svg
              className="relative block w-full h-16"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="fill-[#002244] opacity-20"
              ></path>
            </svg>
          </div>
        </div>
      </footer>
    </>
  );
}