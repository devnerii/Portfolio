"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Check,
  Linkedin,
  Github,
  Briefcase,
  Loader,
  XCircle,
} from "lucide-react";
import { useTranslation } from "next-i18next";
import { SiFreelancer } from "react-icons/si";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  country: string;
};

type FormErrors = Partial<FormData> & {
  honeypot?: string;
  time?: string;
};

export default function ContactForm() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    country: "BR", // Default country
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState(""); // Honeypot field
  const [startTime, setStartTime] = useState(Date.now()); // Time-based validation

  const language =
    router.pathname === "/pt" ? "pt" : router.pathname === "/es" ? "es" : "en";

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t("name_required");
    if (!formData.email.trim()) {
      newErrors.email = t("email_required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("invalid_email_format"); // Mensagem de erro para formato inválido
    }
    if (formData.phone.trim()) {
      const phoneNumber = parsePhoneNumberFromString(
        formData.phone,
        formData.country as CountryCode
      );
      if (!phoneNumber || !phoneNumber.isValid()) {
        newErrors.phone = t("invalid_phone");
      }
    }
    if (!formData.message.trim()) newErrors.message = t("message_required");

    // Honeypot validation
    if (honeypot) {
      newErrors.honeypot = "Bot detected";
    }

    // Time-based validation
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < 3000) {
      // 3 seconds
      newErrors.time = "Form submitted too quickly";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneChange = (value: string, country: CountryData) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
      country: country.countryCode.toUpperCase(),
    }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: formData.name,
            email: formData.email,
            celular: formData.phone,
            mensagem: formData.message,
            language,
          }),
        });
        const result = await response.json();
        setResponseMessage(result.message);
        setIsSubmitted(true);
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            country: "BR",
          });
          setIsSubmitted(false);
          setResponseMessage(null);
        }, 3000);
      } catch {
        setResponseMessage(t("error_sending_email"));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const inputClasses =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 transition-all duration-300";
  const labelClasses =
    "block mb-2 font-semibold text-gray-700 dark:text-gray-300";
  const iconWrapperClasses =
    "absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-gray-400 dark:text-gray-500 h-full";

  return (
    <section
      aria-labelledby="contact-section-title"
      className="py-20 sm:py-24 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500"
      id="contato"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 grid grid-cols-1 lg:grid-cols-2">
        {/* Coluna Esquerda - Formulário */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 bg-white/40 dark:bg-gray-800 rounded-t-3xl sm:rounded-l-3xl sm:rounded-r-none sm:rounded-b-none shadow-xl backdrop-blur-lg border border-white/30 border--0 transition-shadow hover:shadow-2xl"
        >
          <h2
            id="contact-section-title"
            className="text-4xl font-bold text-center mb-8 font-montserrat text-[#003366] dark:text-blue-300"
          >
            {t("contact_us")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot field */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
            />
            <fieldset>
              <div className="relative">
                <label htmlFor="name" className={labelClasses}>
                  {t("full_name")}
                </label>
                <div className={iconWrapperClasses}>
                  <User
                    size={24}
                    className="text-blue-500 dark:text-blue-300 mt-7"
                  />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${inputClasses} pl-12 ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                  placeholder={t("your_full_name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.name}
                  </p>
                )}
              </div>
            </fieldset>

            <fieldset>
              <div className="relative">
                <label htmlFor="email" className={labelClasses}>
                  {t("email")}
                </label>
                <div className={iconWrapperClasses}>
                  <Mail
                    size={24}
                    className="text-blue-500 dark:text-blue-300 mt-8"
                  />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputClasses} pl-12 ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                  placeholder={t("your_email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.email}
                  </p>
                )}
              </div>
            </fieldset>

            <fieldset>
              <div className="relative">
                <label htmlFor="phone" className={labelClasses}>
                  {t("phone")}
                </label>
                <div className={iconWrapperClasses}>
                  <Phone
                    size={24}
                    className="text-blue-500 dark:text-blue-300 mt-8"
                  />
                </div>
                <div className="relative">
                  <PhoneInput
                    country={formData.country.toLowerCase()}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    inputClass={`${inputClasses} pl-12 ${errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    containerClass="w-full"
                    inputStyle={{
                      width: "100%",
                      height: "48px",
                      paddingLeft: "3rem",
                      paddingRight: "1rem",
                    }} // Ajuste de tamanho
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: false,
                    }}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.phone}
                  </p>
                )}
              </div>
            </fieldset>

            <fieldset>
              <div className="relative">
                <label htmlFor="message" className={labelClasses}>
                  {t("message")}
                </label>
                <div className={`${iconWrapperClasses} top-10`}>
                  <MessageSquare
                    size={24}
                    className="text-blue-500 dark:text-blue-300 mt-8"
                  />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} pl-12 h-32 resize-none ${errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                  placeholder={t("your_message")}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.message}
                  </p>
                )}
              </div>
            </fieldset>

            <motion.button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-4 px-6 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : isSubmitted
                    ? "bg-green-500"
                    : responseMessage === t("error_sending_email")
                      ? "bg-red-500"
                      : "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mr-2"
                  >
                    <Loader size={24} />
                  </motion.div>
                  {t("sending")}
                </span>
              ) : isSubmitted ? (
                <span className="flex items-center justify-center">
                  <Check size={24} className="mr-2" />
                  {t("sent_successfully")}
                </span>
              ) : responseMessage === t("error_sending_email") ? (
                <span className="flex items-center justify-center">
                  <XCircle size={24} className="mr-2" />
                  {t("error_sending_email")}
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send size={24} className="mr-2" />
                  {t("send_message")}
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Coluna Direita - Informações de Contato */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 rounded-b-3xl sm:rounded-r-3xl sm:rounded-l-none sm:rounded-t-none p-8 text-white flex flex-col items-center justify-center backdrop-blur-lg shadow-xl border border-white/30 border-l-0"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{t("contact_info")}</h3>
            <p className="text-lg mb-4">Daniel Neri</p>
            <p className="text-lg mb-4 flex items-center justify-center">
              <Mail size={24} className="inline mr-2" />
              dnnxzz70@gmail.com
            </p>
            <div className="flex space-x-4 justify-center">
              <a
                href="https://www.linkedin.com/in/daniel-neri-51a7b12b3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin
                  size={32}
                  className="text-white hover:text-blue-600 transition-colors duration-300"
                />
              </a>
              <a
                href="https://github.com/devnerii"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github
                  size={32}
                  className="text-white hover:text-blue-600 transition-colors duration-300"
                />
              </a>
              <a
                href="https://www.workana.com/freelancer/605927d469678a6ae9166b97adaf1160"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Workana"
              >
                <SiFreelancer
                  size={32}
                  className="text-white hover:text-blue-600 transition-colors duration-300"
                />
              </a>
              <a
                href="https://www.freelancer.com/u/devneri"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Freelancer"
              >
                <Briefcase
                  size={32}
                  className="text-white hover:text-blue-600 transition-colors duration-300"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
