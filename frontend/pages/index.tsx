import type { NextPage } from 'next';
import HeaderMain from '../components/Header/HeaderMain';
import HeroHeader from '../components/HeroHeader';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <HeaderMain />
      <HeroHeader />
    </div>
  );
};

export default Home;
