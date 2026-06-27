'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './LanguageButton.module.css';

interface LanguageButtonProps {
  className?: string;
}

export const LanguageButton = ({ className = '' }: LanguageButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const languages = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'ar', name: 'Arabic', flag: 'https://flagcdn.com/w40/sa.png' }
  ];

  // Get current language from pathname
  const getCurrentLanguage = () => {
    if (!pathname) return languages[0];
    const pathSegments = pathname.split('/');
    const locale = pathSegments[1];
    return languages.find(lang => lang.code === locale) || languages[0];
  };

  const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLanguage());

  const toggleLanguage = () => {
    const newLanguage = selectedLanguage.code === 'en' ? languages[1] : languages[0];
    setSelectedLanguage(newLanguage);
    
    // Update the URL with new language
    if (!pathname) return;
    const pathSegments = pathname.split('/');
    
    // Replace or add locale in the path
    if (languages.some(lang => lang.code === pathSegments[1])) {
      pathSegments[1] = newLanguage.code; // Replace existing locale
    } else {
      pathSegments.splice(1, 0, newLanguage.code); // Add locale if not present
    }
    
    const newPath = pathSegments.join('/');
    
    // Navigate to new path and reload the page
    router.push(newPath);
    
    // Force page reload to ensure all components re-render with new language
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className={className}>
      <button 
        className={`${styles.languageButton} ${selectedLanguage.code === 'ar' ? styles.rtl : ''}`}
        onClick={toggleLanguage}
      >
        <span className={styles.flag}>
          <img 
            src={selectedLanguage.flag} 
            alt={`${selectedLanguage.name} flag`} 
            className={styles.flagImage}
          />
        </span>
        <span className={styles.languageName}>{selectedLanguage.name}</span>
      </button>
    </div>
  );
};