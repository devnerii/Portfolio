import type { NextPage } from 'next';
import HeaderMain from '../components/Header/HeaderMain';
import HeroHeader from '../components/Hero/HeroHeader';
import About from '../components/About/About';
import Portfolio from '../components/Portfolio/Portfolio';
import Services from '../components/Services/Services';
import Testimonials from '../components/Testimonials/Testimonials';
import Blog from '../components/Blog/Blog';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-16">
      <HeaderMain />
      <HeroHeader />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
