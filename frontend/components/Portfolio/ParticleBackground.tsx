import { useMemo } from 'react';

interface Bubble {
  id: number;
  size: number;
  top: string;
  left: string;
  animation: 'floatUp' | 'floatDown' | 'floatLeft' | 'floatRight';
}

function ParticleBackground() {
  // Gerar as bolhas apenas uma vez usando useMemo
  const bubbles: Bubble[] = useMemo(() => {
    const animations: Bubble['animation'][] = ['floatUp', 'floatDown', 'floatLeft', 'floatRight'];
    const generatedBubbles: Bubble[] = [];
    const numberOfBubbles = 20; // 30 bolhas geradas

    for (let i = 0; i < numberOfBubbles; i++) {
      const size = Math.random() * 80 + 40; // Tamanho entre 40px e 120px
      const top = `${Math.random() * 50 + 5}%`; // Limitar a posição top entre 15% e 85%
      const left = `${Math.random() * 100}%`;
      const animation = animations[Math.floor(Math.random() * animations.length)];
      generatedBubbles.push({ id: i, size, top, left, animation });
    }

    return generatedBubbles;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="relative w-full h-full overflow-hidden">
        {/* Renderizar as bolhas */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`absolute bg-white bg-opacity-10 rounded-full ${
              bubble.animation === 'floatUp'
                ? 'animate-floatUp'
                : bubble.animation === 'floatDown'
                ? 'animate-floatDown'
                : bubble.animation === 'floatLeft'
                ? 'animate-floatLeft'
                : 'animate-floatRight'
            }`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              top: bubble.top,
              left: bubble.left,
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ParticleBackground;