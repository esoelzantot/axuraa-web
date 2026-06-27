import React from 'react';
import styles from './AnimatedCircles.module.css';
import Image from 'next/image';

interface AnimatedCirclesProps {
  className?: string;
  position?: 'topRight' | 'bottomLeft';
}

const AnimatedCircles: React.FC<AnimatedCirclesProps> = ({ 
  className = '',
  position = 'topRight'

}) => {
  return (
    <div className={`${styles.circlesContainer} ${className}`}>
      <Image
        src="/assets/Circles.png"
        alt="Decorative circles"
        width={313}
        height={313}
        className={`${styles.circles} ${
          position === 'topRight' ? styles.topRight : styles.bottomLeft
        }`}
        priority
        style={{
          width: '312.65px',
          height: '312.65px',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default AnimatedCircles;
