import React from 'react';

const random = (min: number, max: number): number => Math.random() * (max - min) + min;

const Bubbles = (): JSX.Element => {
  const bubbles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="bubbles__bubble"
      style={{
        animationDelay: `${i * 0.5 - 0.1}s`,
        left: `${random(25, 75)}%`,
        transform: `scale(${random(0.75, 1.25)})`,
        opacity: random(0.5, 1),
      }}
    />
  ));

  return (
    <div className="bubbles">
      {bubbles}
    </div>
  );
};

export default Bubbles;
