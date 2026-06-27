export interface LanguageInfo {
  language: 'en' | 'ar' | 'unknown';
  path: string;
  fullUrl: string;
}

export const getCurrentLanguage = (): LanguageInfo => {
  // Get current URL
  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';
  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  console.log('Current URL:', fullUrl);
  console.log('Current Path:', path);

  
  const pathSegments = path.split('/').filter(segment => segment.length > 0);
  const firstSegment = pathSegments[0];

  let detectedLanguage: 'en' | 'ar' | 'unknown' = 'unknown';

  if (firstSegment === 'en') {
    detectedLanguage = 'en';
  } else if (firstSegment === 'ar') {
    detectedLanguage = 'ar';
  } else {
    detectedLanguage = 'unknown';
  }

  const languageInfo: LanguageInfo = {
    language: detectedLanguage,
    path: path,
    fullUrl: fullUrl
  };

  console.log('Detected Language:', detectedLanguage);
  console.log('Language Info:', languageInfo);

  return languageInfo;
};

export const isEnglishLanguage = (): boolean => {
  const languageInfo = getCurrentLanguage();
  return languageInfo.language === 'en';
};

export const isArabicLanguage = (): boolean => {
  const languageInfo = getCurrentLanguage();
  return languageInfo.language === 'ar';
};

export const getLanguageCode = (): 'en' | 'ar' => {
  const languageInfo = getCurrentLanguage();
  return languageInfo.language === 'unknown' ? 'en' : languageInfo.language;
};