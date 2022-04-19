import React from 'react';

const random = (min: any, max: any): number => Math.random() * (max - min) + min;

const Bubbles: React.FC<unknown> = ({ children }): JSX.Element => (
  <div className="bubbles">
    {
      (() => {
        const output = [];

        for (let i = 0; i < 20; i += 1) {
          output.push(
            <div
              className="bubbles__bubble"
              style={{
                animationDelay: `${i * 0.5 - 0.1}s`,
                left: `${random(25, 75)}%`,
                transform: `scale(${random(0.75, 1.25)})`,
                opacity: random(0.5, 1),
              }}
            />,
          );
        }

        return output;
      })()
    }
  </div>
);

export default Bubbles;
