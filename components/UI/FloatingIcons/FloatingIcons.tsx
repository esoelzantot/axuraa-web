'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './FloatingIcons.module.css';
interface IconPosition {
  char: string;
  top: string;
  left: string;
  size: number;
  rotation: number;
}
const FLOATING_ICONS: IconPosition[] = [
  { char: '2', top: '15%', left: '10%', size: 24, rotation: -5 },
  { char: '4', top: '25%', left: '85%', size: 32, rotation: 3 },
  { char: '5', top: '45%', left: '15%', size: 28, rotation: 2 },
  { char: 'A', top: '60%', left: '80%', size: 36, rotation: -2 },
  { char: 'Q', top: '70%', left: '20%', size: 30, rotation: 4 },
  { char: 'R', top: '30%', left: '40%', size: 26, rotation: -3 },
  { char: 'U', top: '55%', left: '50%', size: 34, rotation: 1 },
  { char: 'X', top: '20%', left: '60%', size: 28, rotation: -4 },
];
const FloatingIcons: React.FC = () => {
  const [activeIcons, setActiveIcons] = useState<IconPosition[]>([]);
  useEffect(() => {
    setActiveIcons(FLOATING_ICONS);
  }, []);
  return (
    <div className={styles.floatingIcons}>
      {activeIcons.map((icon, index) => (
        <div 
          key={index} 
          className={styles.iconContainer}
          style={{
            top: icon.top,
            left: icon.left,
            transform: `rotate(${icon.rotation}deg)`,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
          }}
        >
          <div className={styles.icon}>
            {icon.char}
          </div>
        </div>
      ))}
    </div>
  );
};
export default React.memo(FloatingIcons);