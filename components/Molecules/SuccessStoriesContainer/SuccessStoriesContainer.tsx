"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import SuccessStoryCard from '@/components/UI/Atoms/SuccessStories/SuccessStories';
import styles from './SuccessStoriesContainer.module.css';
interface SuccessStoriesContainerProps {
  stories: Array<{
    id: string;
    title: string;
    description: string;
    iconUrl?: string;
    metrics?: Array<{
      label: string;
      value: string;
      valueColor?: string;
    }>;
  }>;
  className?: string;
  locale: string;
}
const SuccessStoriesContainer: React.FC<SuccessStoriesContainerProps> = ({
  stories,
  className = '',
  locale,
}) => {
  const router = useRouter();
  return (
    <div className={`${styles.container} ${className}`}>
      {stories.map((story, index) => (
        <SuccessStoryCard 
          key={story.id || index} 
          {...story} 
          onClick={() => router.push(`/${locale}/case-study/${story.id}`)}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};
export default React.memo(SuccessStoriesContainer);