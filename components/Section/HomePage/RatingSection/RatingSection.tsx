'use client';
import React, { useEffect, useState } from 'react';
import styles from './RatingSection.module.css';
import Badge from '@/components/UI/Atoms/Badge/Badge';
import SectionHeader from '@/components/Layout/SectionHeader/SectionHeader';
import Rating from '@/components/UI/Atoms/RatingComponents/Rating';

import { RatingSectionProps, RatingItem } from '@/types/HomePage/ratingTypes';
import { getHomeTrackRecord, TrackRecordItem } from '@/service/TrackRecord/trackrecord';

// Cache key for rating items
const RATING_CACHE_KEY = 'rating_items_cache';
const CACHE_TIMESTAMP_KEY = 'rating_items_cache_timestamp';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

// Function to get cached data
const getCachedRatingItems = (): RatingItem[] | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const cachedData = localStorage.getItem(RATING_CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    
    if (cachedData && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp);
      const now = Date.now();
      
      // Check if cache is still valid
      if (now - timestamp < CACHE_DURATION) {
        return JSON.parse(cachedData);
      } else {
        // Cache expired, clear it
        localStorage.removeItem(RATING_CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      }
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  
  return null;
};

// Function to set cached data
const setCachedRatingItems = (items: RatingItem[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(RATING_CACHE_KEY, JSON.stringify(items));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

// Function to generate cache key from API data
const generateDataHash = (data: TrackRecordItem[]): string => {
  return JSON.stringify(data.map(item => ({
    id: item.id,
    value: item.value,
    label: item.label,
    suffix: item.suffix
  })));
};

const RatingSection: React.FC<RatingSectionProps> = ({ 
  badgeText,
  title1,
  title2,
  subtitle,
  ratingItems = []
}) => {
  const [apiRatingItems, setApiRatingItems] = useState<RatingItem[]>(ratingItems);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrackRecord = async () => {
      try {
        setLoading(true);
        console.log('--- START FETCH TRACK RECORD ---');
        
        // Always try to load from cache first for immediate UI
        const cachedItems = getCachedRatingItems();
        if (cachedItems && cachedItems.length > 0) {
          setApiRatingItems(cachedItems);
          console.log('Initial data from cache:', cachedItems);
        }
        
        // Fetch fresh data from API
        const result = await getHomeTrackRecord('en');
        console.log('API Result:', result);
        
        if (result.success && result.data && result.data.records) {
          // Transform API data to match RatingItem interface
          const transformedItems: RatingItem[] = result.data.records.map((record: TrackRecordItem) => {
            const iconPath = '/assets/RatingIcon.svg'; 
            
            let suffix: '' | '%' | '+' = '';
            if (record.suffix) {
              suffix = record.suffix as '' | '%' | '+';
            } else {
              if (record.value >= 1000) {
                suffix = '+';
              } else if (record.value === 100) {
                suffix = '%';
              }
            }

            return {
              id: record.id,
              value: record.value,
              label: record.label,
              icon: iconPath,
              showIcon: true, 
              suffix: suffix
            };
          });
          
          console.log('Transformed items:', transformedItems);
          
          // Update state with fresh data
          setApiRatingItems(transformedItems);
          
          // Update cache
          setCachedRatingItems(transformedItems);
          
          // Also store hash for cross-component optimization if needed
          const currentDataHash = generateDataHash(result.data.records);
          localStorage.setItem('rating_items_data_hash', currentDataHash);
          
          console.log('State and cache updated with fresh API data');
        } else {
          console.warn('API returned success:false or no data, falling back to cache if available');
          if (!apiRatingItems.length) {
            const fallbackCachedItems = getCachedRatingItems();
            if (fallbackCachedItems) setApiRatingItems(fallbackCachedItems);
          }
        }
      } catch (error) {
        console.error('Failed to fetch track record:', error);
        // Fallback to cache on error
        if (!apiRatingItems.length) {
          const fallbackCachedItems = getCachedRatingItems();
          if (fallbackCachedItems) setApiRatingItems(fallbackCachedItems);
        }
      } finally {
        setLoading(false);
        console.log('--- END FETCH TRACK RECORD ---');
      }
    };

    fetchTrackRecord();
  }, []);

  return (
    <section id="rating-section" className={styles.RatingSection}>
      <Badge text={badgeText} show={true} />
      <SectionHeader
        title1={title1}
        title2={title2}
        subtitle={subtitle}
        titleLayout="column"
      />
      {apiRatingItems.length > 0 && (
        <Rating 
          items={apiRatingItems}
          duration={1500}  
          maxValue={100}   
        />
      )}
    </section>
  );
};
export default React.memo(RatingSection);