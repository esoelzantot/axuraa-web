import React, { useRef, useState, ReactNode, CSSProperties, useEffect } from 'react';
import styles from './ScrollComponents.module.css';

import { ScrollComponentProps } from '@/types/Generals/scrollTypes';

export const HorizontalScroll: React.FC<ScrollComponentProps> = ({ 
  children, 
  className = '',
  style
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const scrollPos = useRef(0);
  const [items, setItems] = useState<ReactNode[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAutoScrolling = useRef(false);

  // Duplicate the items to create a seamless loop
  useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    // Create 5 copies for smoother infinite scroll
    setItems([
      ...childrenArray,
      ...childrenArray,
      ...childrenArray,
      ...childrenArray,
      ...childrenArray
    ]);
    cardRefs.current = cardRefs.current.slice(0, childrenArray.length * 5);
  }, [children]);

  // Initialize scroll position to the middle set
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || items.length === 0) return;

    const childrenCount = items.length / 5;
    const middleSetIndex = childrenCount * 2; // Start at the 3rd set (middle)
    
    // Wait for DOM to render
    setTimeout(() => {
      const card = cardRefs.current[middleSetIndex];
      if (card) {
        scroller.scrollLeft = card.offsetLeft - scroller.offsetLeft;
      }
    }, 100);
  }, [items.length]);

  // Handle infinite scroll repositioning
  const handleInfiniteScroll = () => {
    const scroller = scrollRef.current;
    if (!scroller || items.length === 0 || isAutoScrolling.current) return;

    const childrenCount = items.length / 5;
    const scrollLeft = scroller.scrollLeft;
    const scrollWidth = scroller.scrollWidth;
    const clientWidth = scroller.clientWidth;

    // Calculate card width
    const totalGap = 22 * (items.length - 1);
    const totalCardWidth = scrollWidth - totalGap;
    const cardWidth = totalCardWidth / items.length;

    // Current card index
    const currentCardIndex = Math.round(scrollLeft / (cardWidth + 22));

    // If we're in the first set, jump to equivalent position in the 3rd set
    if (currentCardIndex < childrenCount) {
      const equivalentIndex = currentCardIndex + (childrenCount * 2);
      const newScrollLeft = equivalentIndex * (cardWidth + 22);
      scroller.scrollLeft = newScrollLeft;
    }
    // If we're in the last set, jump to equivalent position in the 3rd set
    else if (currentCardIndex >= childrenCount * 4) {
      const equivalentIndex = currentCardIndex - (childrenCount * 2);
      const newScrollLeft = equivalentIndex * (cardWidth + 22);
      scroller.scrollLeft = newScrollLeft;
    }
  };

  // Auto-scroll logic with smooth infinite loop
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || items.length === 0) return;

    const smoothScrollToNext = () => {
      if (isDragging.current || isHovered) return;

      isAutoScrolling.current = true;
      const childrenCount = items.length / 5;
      const scrollLeft = scroller.scrollLeft;
      
      // Calculate card width
      const scrollWidth = scroller.scrollWidth;
      const totalGap = 22 * (items.length - 1);
      const totalCardWidth = scrollWidth - totalGap;
      const cardWidth = totalCardWidth / items.length;

      // Scroll to next card
      const nextScrollPosition = scrollLeft + cardWidth + 22;
      
      scroller.scrollTo({
        left: nextScrollPosition,
        behavior: 'smooth'
      });

      // After animation completes, check for infinite scroll reset
      setTimeout(() => {
        handleInfiniteScroll();
        isAutoScrolling.current = false;
      }, 500); // Match this with scroll animation duration
    };

    // Auto-scroll every 3 seconds
    scrollInterval.current = setInterval(smoothScrollToNext, 3000);

    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [items.length, isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    
    isDragging.current = true;
    startPos.current = e.pageX;
    scrollPos.current = scroller.scrollLeft;
    scroller.style.cursor = 'grabbing';
    scroller.style.scrollBehavior = 'auto';
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    
    const scroller = scrollRef.current;
    const x = e.pageX;
    const walk = (startPos.current - x) * 2;
    scroller.scrollLeft = scrollPos.current + walk;
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
    const scroller = scrollRef.current;
    if (!scroller) return;
    
    scroller.style.cursor = 'grab';
    scroller.style.scrollBehavior = 'smooth';
    snapToNearestCard();
  };

  const handleScroll = () => {
    // Don't reposition during auto-scroll animation
    if (isAutoScrolling.current) return;
    
    // Handle infinite scroll repositioning for manual scrolling
    handleInfiniteScroll();
  };

  const snapToNearestCard = () => {
    const scroller = scrollRef.current;
    if (!scroller || items.length === 0) return;

    const scrollWidth = scroller.scrollWidth;
    const totalGap = 22 * (items.length - 1);
    const totalCardWidth = scrollWidth - totalGap;
    const cardWidth = totalCardWidth / items.length;
    
    const currentScrollLeft = scroller.scrollLeft;
    const nearestIndex = Math.round(currentScrollLeft / (cardWidth + 22));
    const targetScroll = nearestIndex * (cardWidth + 22);
    
    scroller.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    // After snapping, check if we need to reposition for infinite scroll
    setTimeout(() => {
      handleInfiniteScroll();
    }, 300);
  };

  // Handle card hover
  const handleCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
  };

  // Update card refs
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onScroll={handleScroll}
      className={`${styles.horizontalScroll} ${className}`}
      style={style}
    >
      <div 
        ref={contentRef}
        style={{
          display: 'flex',
          gap: '22px',
        }}
      >
        {items.map((child, index) => (
          <div 
            key={index} 
            ref={el => setCardRef(el, index)}
            className={styles.scrollItem}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};