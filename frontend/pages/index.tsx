import type { NextPage } from 'next';
import HeaderMain from '../components/Header/HeaderMain';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <HeaderMain />
    </div>
  );
};

export default Home;
