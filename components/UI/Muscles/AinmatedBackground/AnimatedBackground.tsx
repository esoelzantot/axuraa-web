import React from 'react';
import styles from './AnimatedBackground.module.css';
import { BackgroundProps } from '@/types/Generals/backgroundTypes';
import Hexagon from '@/components/UI/Atoms/Animations/Hexagon/Hexagon';
import Circle from '@/components/UI/Atoms/Animations/Circles/Circles';
import AnimatedAlphabet from './Alphabet';

interface AnimatedBackgroundProps extends BackgroundProps {
  isHovered?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  type, 
  className,
  isHovered = false 
}) => {
  return (
    <div className={`${styles.animatedBackground} ${isHovered ? styles.hovered : ''}`}>
      <div className={className}>
        {type === 'Hexagon' && (
          <div className={styles.HexagonContainer}>
            <Hexagon 
              className={styles.Hexa_1} 
              direction='left' 
              position='down'
            />
            <Hexagon 
              className={styles.Hexa_2} 
              direction='right' 
              position='up'
            />
          </div>
        )}
        
        {type === 'Circle' && (
          <div className={styles.CircleContainer}>
            <Circle 
              className={styles.Circle_1} 
              direction='left' 
              position='down'
            />
            <Circle 
              className={styles.Circle_2} 
              direction='right' 
              position='up'
            />
          </div>
        )}

        {type === 'Alphabet' && (
          <AnimatedAlphabet isHovered={isHovered} />
        )}
      </div>
    </div>
  );
};

export default AnimatedBackground;