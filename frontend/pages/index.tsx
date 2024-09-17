import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HeaderMain from '../components/Header/HeaderMain';
import HeroHeader from '../components/Hero/HeroHeader';
import About from '../components/About/About';
import Portfolio from '../components/Portfolio/Portfolio';
import Services from '../components/Services/Services';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <div className="flex flex-col space-y-16">
      <HeaderMain />
      <HeroHeader />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />
      {/* <Blog /> */}
      <Contact />
      <Footer />
    </div>
  );
};

// Carregar as traduções no servidor
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Home;
