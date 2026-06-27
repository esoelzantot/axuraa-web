// components/EmailCard/EmailCard.tsx
import React from 'react';
import Icon from '@/components/UI/Atoms/Icon/Icon';
import Typography from '@/components/UI/Atoms/Typography/Typography';
import styles from './EmailCard.module.css';

interface EmailCardProps {
  name: string;
  email: string;
  description: string;
  icon: string;
  className?: string;
}

const EmailCard: React.FC<EmailCardProps> = ({
  name,
  email,
  description,
  icon,
  className = '',
}) => {
  const getIconPath = (iconName: string) => {
    if (!iconName) return "/assets/Email.svg";
    const lowerName = iconName.toLowerCase();
    if (lowerName === 'email') return "/assets/Email.svg";
    if (lowerName === 'info' || lowerName === 'sales' || lowerName === 'support') {
        return `/assets/conection/${lowerName}.svg`;
    }
    return `/assets/conection/info.svg`; // Fallback
  };

  return (
    <div 
      className={`${styles.emailCard} ${className}`}
      onClick={() => window.location.href = `mailto:${email}`}
    >
      <div className={styles.iconContainer}>
        <Icon
          iconSrc={getIconPath(icon)}
          backgroundColor="var(--color-orange-6010, rgba(255, 107, 53, 0.15))"
          background_Radius="rounded"
          color="#D04A1D"
          width={28}
          height={28}
          alt={name}
          noHover={true}
        />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.headerRow}>
          <Typography
            variant="h6"
            className={styles.title}
          >
            {name}
          </Typography>
          <a href={`mailto:${email}`} className={styles.email}>
            {email}
          </a>
        </div>
        
        <Typography
          variant="body1"
          className={styles.description}
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default EmailCard;