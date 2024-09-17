"use client";

import React from "react";
import Image from "next/image";

// Componente principal para exibir a imagem
const ImageEmbed: React.FC = () => {
  return (
    <div className="image-embed-wrapper" style={{ width: "100%", height: "600px", position: "relative" }}>
      <Image
        src="/src/img/imagem.jpg"
        alt="Minha Imagem"
        fill // Substitui layout="fill"
        style={{ objectFit: "cover", objectPosition: "center top" }} // Substitui objectFit e objectPosition
      />
    </div>
  );
};

// SEO metadata para otimização
const SeoMetadata: React.FC = () => {
  return (
    <>
      <meta
        name="description"
        content="Portfólio de Daniel Neri, Full Stack Developer, apresentando o projeto 3D do Ectoparasitoid. Veja um exemplo de trabalho em 3D embutido com Sketchfab."
      />
      <meta
        name="keywords"
        content="Daniel Neri, Full Stack Developer, Portfólio, React, 3D, Sketchfab, Ectoparasitoid, Desenvolvimento Web"
      />
      <meta name="author" content="Daniel Neri" />
      <meta property="og:title" content="Daniel Neri | Full Stack Developer" />
      <meta
        property="og:description"
        content="Veja um exemplo de trabalho 3D embutido no portfólio de Daniel Neri, usando Sketchfab."
      />
      <meta property="og:url" content="https://danielneri.dev" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://danielneri.dev/assets/preview-image.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  );
};

// Componente principal da página
const PortfolioPage: React.FC = () => {
  return (
    <>
      <SeoMetadata />
      <div className="portfolio-container">
        {/* Componente de Embed da Imagem diretamente */}
        <ImageEmbed />
      </div>
    </>
  );
};

export default PortfolioPage;