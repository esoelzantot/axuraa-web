import React from 'react';
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
}
const SuccessStoriesContainer: React.FC<SuccessStoriesContainerProps> = ({
  stories,
  className = ''
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {stories.map((story, index) => (
        <SuccessStoryCard 
          key={index} 
          {...story} 
          onClick={() => window.location.href = `/en/case-study/${story.id}`}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};
export default React.memo(SuccessStoriesContainer);