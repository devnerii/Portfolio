import { Montserrat, Open_Sans } from 'next/font/google'
import { Button } from "@/components/ui/button"

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700'] })
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400'] })

export default function Component() {
  return (
    <div className="w-full min-h-[50vh] bg-gradient-to-b from-[#E3F2FD] to-[#007BFF] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className={`${montserrat.className} text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4`}>
          Bem-vindo ao Nosso Site
        </h1>
        <p className={`${openSans.className} text-lg sm:text-xl text-white mb-8 max-w-2xl mx-auto`}>
          Descubra soluções inovadoras para impulsionar o seu negócio e alcançar novos patamares de sucesso.
        </p>
        <Button 
          className="bg-[#003366] text-white hover:bg-[#002244] transition-colors duration-300 text-lg px-8 py-3"
        >
          Comece Agora
        </Button>
      </div>
    </div>
  )
}