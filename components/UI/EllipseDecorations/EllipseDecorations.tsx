'use client';
import React from 'react';
import Image from 'next/image';
import styles from './EllipseDecorations.module.css';
interface EllipseDecorationsProps {
  showTopRight?: boolean;
  showBottomLeft?: boolean;
}
const EllipseDecorations: React.FC<EllipseDecorationsProps> = ({
  showTopRight = true,
  showBottomLeft = true,
}) => {
  return (
    <>
      {showTopRight && (
        <div className={styles.ellipseTopRight}>
          <Image
            src="/assets/EllipseTopRight.svg"
            alt="Top Right Decoration"
            width={172}
            height={172}
            className={styles.ellipseImage}
          />
        </div>
      )}
      {showBottomLeft && (
        <div className={styles.ellipseBottomLeft}>
          <Image
            src="/assets/EllipseButtomLeft.svg"
            alt="Bottom Left Decoration"
            width={172}
            height={172}
            className={styles.ellipseImage}
          />
        </div>
      )}
    </>
  );
};
export default React.memo(EllipseDecorations);