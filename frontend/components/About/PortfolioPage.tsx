"use client";

import React from "react";

// Componente principal para o modelo Sketchfab embutido diretamente
const SketchfabEmbed: React.FC = () => {
  return (
    <div className="sketchfab-embed-wrapper" style={{ width: "100%", height: "600px" }}>
      <iframe
        title="𝔈𝔠𝔱𝔬𝔭𝔞𝔯𝔞𝔰𝔦𝔱𝔬𝔦𝔡 [𝐬𝐭𝐚𝐭𝐢𝐜]"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src="https://sketchfab.com/models/504c989cdb9c41c18e6581e965f548bd/embed?ui_infos=0&ui_controls=0s&watermark=0&autostart=0&transparent=1&preload=0&max_lod=1"
        style={{ width: "100%", height: "100%" }}
      ></iframe>
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
        {/* Componente de Embed do Sketchfab diretamente */}
        <SketchfabEmbed />
      </div>
    </>
  );
};

export default PortfolioPage;
