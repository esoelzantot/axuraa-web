import React from 'react';
import Image from 'next/image';
import styles from './Letter.module.css';
import A from '@/public/assets/letters/A.svg';
import R from '@/public/assets/letters/R.svg';
import X from '@/public/assets/letters/X.svg';
import U from '@/public/assets/letters/U.svg';
import Q from '@/public/assets/letters/Q.svg';

interface LetterProps {
  letter: 'A' | 'R' | 'X' | 'U' | 'Q';
  animationType: 'appears' | 'moveHorizontal' | 'moveDiagonal';
  cssVarPrefix: string; // e.g., "letter-a1"
  className?: string;
}

const Letter: React.FC<LetterProps> = ({ 
  letter, 
  animationType, 
  cssVarPrefix,
  className 
}) => {
  const getAnimationClass = () => {
    if (animationType === 'appears') {
      return styles.appears;
    } else if (animationType === 'moveHorizontal') {
      return styles.moveHorizontal;
    } else if (animationType === 'moveDiagonal') {
      return styles.moveDiagonal;
    }
    return '';
  };

  const getLetterSVG = () => {
    switch(letter) {
      case 'A': return A;
      case 'R': return R;
      case 'X': return X;
      case 'U': return U;
      case 'Q': return Q;
      default: return A;
    }
  };

  return (
    <div
      className={`${styles.letterContainer} ${getAnimationClass()} ${className || ''}`}
      style={{
        left: `var(--${cssVarPrefix}-x)`,
        top: `var(--${cssVarPrefix}-y)`,
        width: `var(--${cssVarPrefix}-size)`,
        height: `var(--${cssVarPrefix}-size)`,
        '--translate-x': `calc(var(--${cssVarPrefix}-target-x, var(--${cssVarPrefix}-x)) - var(--${cssVarPrefix}-x))`,
        '--translate-y': `calc(var(--${cssVarPrefix}-target-y, var(--${cssVarPrefix}-y)) - var(--${cssVarPrefix}-y))`,
      } as React.CSSProperties}
    >
      <Image
        src={getLetterSVG()}
        alt={`Letter ${letter}`}
        className={styles.letter}
        fill
        priority
      />
    </div>
  );
};

export default Letter;