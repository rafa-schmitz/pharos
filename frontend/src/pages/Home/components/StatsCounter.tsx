import React from 'react';

interface CounterProps {
  initialSpeed: number
}

const animatedCounter = (speed: number): void => {
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const randomInt = randomIntFromInterval(80, 100);

  const counterElement = document.getElementById('counter');
  if (counterElement) {
    const totalFrames = randomInt;
    const animationDuration = totalFrames / speed; // Tempo total de animação em segundos

    let currentFrame = 0;
    const frameDuration = animationDuration / totalFrames;
    const increment = 1;

    const countInterval = setInterval(() => {
      if (currentFrame >= totalFrames) {
        clearInterval(countInterval);
      } else {
        const value = Math.floor(currentFrame).toString();
        counterElement.textContent = value;
        currentFrame += increment;
      }
    }, frameDuration * 1000);
  }
}

export const StatsCounter = ({initialSpeed}: CounterProps) => {
  React.useEffect(() => {
    animatedCounter(initialSpeed); // Velocidade inicial de 500 (altere esse valor conforme necessário)

    // Cleanup: Restaura o contador para zero ao desmontar o componente
    return () => {
      const counterElement = document.getElementById('counter');
      if (counterElement) {
        counterElement.textContent = '0';
      }
    };
  }, []);

  return (
    <div style={{display: "flex", fontSize: "96px"}}>
      <div id="counter">0</div><span>+</span>
    </div>
  );
}
