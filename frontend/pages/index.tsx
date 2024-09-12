import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Bem-vindo ao Projeto Next.js com Tailwind e TypeScript!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Essa é a página inicial do seu projeto.
        </p>
      </div>
    </div>
  );
};

export default Home;
