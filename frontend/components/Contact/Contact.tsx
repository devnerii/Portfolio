'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Send, Check } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Telefone inválido';
    }
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simular envio do formulário
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Resetar o formulário após 3 segundos
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300';
  const labelClasses = 'block mb-2 font-semibold text-gray-700 dark:text-gray-300';
  const iconWrapperClasses =
    'absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-gray-400 dark:text-gray-500 h-full';

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12 font-montserrat text-[#003366] dark:text-blue-300"
        >
          Entre em Contato
        </motion.h2>
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Nome */}
            <div className="relative">
              <label htmlFor="name" className={labelClasses}>
                Nome
              </label>
              <div className={iconWrapperClasses}>
                <User size={24} className="text-blue-500 dark:text-blue-300" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${inputClasses} pl-12 ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Seu nome completo"
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
              {!errors.name && formData.name && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <div className={iconWrapperClasses}>
                <Mail size={24} className="text-blue-500 dark:text-blue-300" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClasses} pl-12 ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="seu@email.com"
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
              {!errors.email && formData.email && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
              )}
            </div>

            {/* Telefone */}
            <div className="relative">
              <label htmlFor="phone" className={labelClasses}>
                Telefone
              </label>
              <div className={iconWrapperClasses}>
                <Phone size={24} className="text-blue-500 dark:text-blue-300" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputClasses} pl-12 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="(00) 00000-0000"
              />
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
              {!errors.phone && formData.phone && (
                <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
              )}
            </div>

            {/* Mensagem */}
            <div className="relative">
              <label htmlFor="message" className={labelClasses}>
                Mensagem
              </label>
              <div className={`${iconWrapperClasses} top-10`}>
                <MessageSquare size={24} className="text-blue-500 dark:text-blue-300" />
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`${inputClasses} pl-12 h-32 resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Sua mensagem aqui..."
              ></textarea>
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
              {!errors.message && formData.message && (
                <Check className="absolute right-3 top-10 text-green-500" size={20} />
              )}
            </div>

            {/* Botão de Envio */}
            <motion.button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-4 px-6 text-white font-semibold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300 ${
                isSubmitting || isSubmitted
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-2"
                  >
                    <Send size={24} />
                  </motion.div>
                  Enviando...
                </span>
              ) : isSubmitted ? (
                <span className="flex items-center justify-center">
                  <Check size={24} className="mr-2" />
                  Enviado com sucesso!
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send size={24} className="mr-2" />
                  Enviar Mensagem
                </span>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
