import React from 'react';
import styles from './Alphabet.module.css';
import Letter from '@/components/UI/Atoms/Animations/Letter/Letter';

interface AlphabetProps {
  className?: string;
  isHovered?: boolean;
}

const Alphabet: React.FC<AlphabetProps> = ({ className, isHovered = false }) => {
  return (
    <div className={`${styles.alphabetContainer} ${isHovered ? styles.hovered : ''} ${className || ''}`}>
      {/* A - Appears: starts at position 1, on hover moves to position 2 with fade effect */}
      <Letter
        letter="A"
        animationType="appears"
        cssVarPrefix="letter-a1"
        className={styles.letterA_1}
      />
      <Letter
        letter="A"
        animationType="appears"
        cssVarPrefix="letter-a2"
        className={styles.letterA_2}
      />
      
      {/* R - Same as A (appears behavior) */}
      <Letter
        letter="R"
        animationType="appears"
        cssVarPrefix="letter-r1"
        className={styles.letterR_1}
      />
      <Letter
        letter="R"
        animationType="appears"
        cssVarPrefix="letter-r2"
        className={styles.letterR_2}
      />
      
      {/* X - Moves horizontal from position 1 to position 2 */}
      <Letter
        letter="X"
        animationType="moveHorizontal"
        cssVarPrefix="letter-x"
        className={styles.letterX}
      />
      
      {/* U - Moves diagonally from position 1 to position 2 */}
      <Letter
        letter="U"
        animationType="moveDiagonal"
        cssVarPrefix="letter-u"
        className={styles.letterU}
      />
      
      {/* Q - Called twice, both move diagonally */}
      <Letter
        letter="Q"
        animationType="moveDiagonal"
        cssVarPrefix="letter-q1"
        className={styles.letterQ1}
      />
      <Letter
        letter="Q"
        animationType="moveDiagonal"
        cssVarPrefix="letter-q2"
        className={styles.letterQ2}
      />
    </div>
  );
};

export default Alphabet;