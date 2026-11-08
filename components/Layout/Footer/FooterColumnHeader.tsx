'use client';
import React from 'react';
import Typography from '@/components/UI/Atoms/Typography/Typography';

interface FooterColumnHeaderProps {
  title: string;
}

const FooterColumnHeader: React.FC<FooterColumnHeaderProps> = ({ title }) => {
  return (
    <Typography 
      variant="h3"
      style={{
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 'clamp(18px, 1.6vw, 24px)',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <span 
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#D75C37',
          borderRadius: '50%',
          display: 'inline-block',
          flexShrink: 0
        }}
      />
      {title}
    </Typography>
  );
};

export default React.memo(FooterColumnHeader);