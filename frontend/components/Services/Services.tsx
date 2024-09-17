"use client"; // Este arquivo é executado no lado do cliente

import { useState } from "react"; // Importa o hook useState do React para gerenciar o estado do componente
import { motion } from "framer-motion"; // Importa o motion da biblioteca Framer Motion para animações
import { Code, Palette, Smartphone, Globe, Zap, Users } from "lucide-react"; // Importa ícones da biblioteca Lucide React
import { useTranslation } from "next-i18next"; // Importa o hook useTranslation para suporte à internacionalização
import Head from "next/head"; // Importa o componente Head para manipular o head do documento

export default function ServicesSection() {
  const { t } = useTranslation("common"); // Usa o hook de tradução para pegar as strings definidas no arquivo de tradução
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Estado para armazenar o índice do serviço atualmente "hovered" (focado)

  // Definimos a lista de serviços com ícone, título e descrição, traduzidos dinamicamente
  const services = [
    {
      icon: Code, // Ícone relacionado ao serviço
      title: t("myServices.webDevelopment.title", "Desenvolvimento Web Full Stack"), // Título do serviço com fallback para a tradução
      description: t("myServices.webDevelopment.description", "Construção de sites responsivos e aplicações web escaláveis, utilizando tecnologias modernas como React, Node.js, e Next.js. Foco em performance e SEO para garantir que seu site se destaque nos motores de busca."), // Descrição do serviço
      keywords: "desenvolvimento web, full stack, React, Node.js, Next.js, SEO", // Palavras-chave relevantes para SEO
    },
    {
      icon: Palette,
      title: t("myServices.uiuxDesign.title", "Design de UI/UX"),
      description: t("myServices.uiuxDesign.description", "Criação de interfaces de usuário intuitivas e experiências que encantam. Design focado em usabilidade e otimização para dispositivos móveis."),
      keywords: "UI design, UX design, experiência do usuário, interfaces intuitivas, design mobile",
    },
    {
      icon: Smartphone,
      title: t("myServices.mobileDevelopment.title", "Desenvolvimento Mobile"),
      description: t("myServices.mobileDevelopment.description", "Desenvolvimento de aplicativos móveis nativos e híbridos com React Native e Flutter, garantindo performance e experiência de uso consistente."),
      keywords: "desenvolvimento mobile, React Native, Flutter, apps nativos",
    },
    {
      icon: Globe,
      title: t("myServices.seo.title", "Otimização SEO"),
      description: t("myServices.seo.description", "Melhoramos a visibilidade do seu site com técnicas avançadas de SEO, incluindo otimização de performance, conteúdo relevante e estrutura de URL adequada."),
      keywords: "SEO, otimização para motores de busca, performance web, estrutura de URL",
    },
    {
      icon: Zap,
      title: t("myServices.performance.title", "Otimização de Performance"),
      description: t("myServices.performance.description", "Otimização de tempo de carregamento e performance de sites e apps, aplicando técnicas avançadas como lazy loading, caching e compactação de arquivos."),
      keywords: "performance web, otimização de carregamento, lazy loading, caching",
    },
    {
      icon: Users,
      title: t("myServices.consulting.title", "Consultoria Técnica"),
      description: t("myServices.consulting.description", "Consultoria em arquitetura de software, escolha de tecnologias e melhores práticas para startups e empreendedores que desejam construir ou escalar seus produtos digitais."),
      keywords: "consultoria técnica, arquitetura de software, startups, empreendedorismo digital",
    },
  ];

  // A seção de serviços
  return (
    <>
      <Head>
        <title>Daniel Neri - Serviços Full Stack</title>
        <meta name="description" content="Serviços de desenvolvimento web, design de UI/UX, desenvolvimento mobile, otimização SEO, otimização de performance e consultoria técnica." />
        <meta name="keywords" content="desenvolvimento web, design UI/UX, desenvolvimento mobile, SEO, otimização de performance, consultoria técnica" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <section
        className="py-16 bg-gradient-to-b from-blue-500 via-blue-500 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 relative"
        id="servicos" // ID para referência em links âncora
        aria-labelledby="services-heading" // Acessibilidade para associar a seção com o cabeçalho
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.h1
            id="services-heading" // ID para acessibilidade
            className="text-6xl font-extrabold text-center mb-20 font-montserrat bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent dark:text-blue-200"
            initial={{ opacity: 0, y: -60 }} // Definição do estado inicial da animação
            animate={{ opacity: 1, y: 0 }} // Estado final da animação
            transition={{ duration: 0.8 }} // Duração da animação
          >
            {t("servicesSectionTitle", "Serviços de Desenvolvedor Full Stack Freelancer")} 
            {/* Título da seção, com tradução e foco no nicho de desenvolvedor full stack */}
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {services.map((service, index) => {
              const Icon = service.icon; // Referência ao ícone do serviço
              const isHovered = hoveredIndex === index; // Verifica se o serviço está sendo "hovered"

              return (
                <motion.article
                  key={service.title} // Chave única para cada item da lista de serviços
                  className="relative bg-white/30 backdrop-blur-lg dark:bg-gray-700 rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-700 hover:scale-105"
                  initial={{ opacity: 0, y: 60 }} // Animação inicial
                  animate={{ opacity: 1, y: 0 }} // Animação quando estiver visível
                  transition={{ duration: 0.8, delay: index * 0.2 }} // Transição com atraso baseado no índice
                  onMouseEnter={() => setHoveredIndex(index)} // Define o índice do item "hovered"
                  onMouseLeave={() => setHoveredIndex(null)} // Reseta o "hover"
                  whileHover={{ scale: 1.05 }} // Animação ao passar o mouse
                  role="article" // Melhora a acessibilidade
                  aria-label={service.title} // Melhora a acessibilidade ao descrever o serviço
                  itemScope
                  itemType="http://schema.org/Service" // Marca semântica para SEO
                >
                  <meta itemProp="keywords" content={service.keywords} /> {/* Palavras-chave para SEO */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#003366] to-blue-500 dark:from-gray-800 dark:to-gray-900 opacity-0 ${
                      isHovered ? "opacity-25" : ""
                    } transition-opacity duration-700 blur-lg`}
                  ></div>

                  <div className="p-10 flex flex-col items-center">
                    <div className="w-24 h-24 mb-8 flex items-center justify-center bg-white/50 dark:bg-gray-600 rounded-full shadow-inner transform transition-transform duration-700 hover:rotate-12">
                      <Icon
                        className={`w-12 h-12 text-[#003366] dark:text-blue-200 ${
                          isHovered ? "animate-pulse" : ""
                        }`} // Efeito de animação pulsante ao passar o mouse
                        aria-hidden="true" // Indica que o ícone é apenas decorativo
                      />
                    </div>

                    <h2
                      className="text-4xl font-semibold text-center mb-4 text-[#003366] dark:text-blue-200"
                      itemProp="name" // Marca semântica para SEO
                    >
                      {service.title}
                    </h2>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-center font-light mb-6"
                      itemProp="description" // Marca semântica para SEO
                    >
                      {service.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}