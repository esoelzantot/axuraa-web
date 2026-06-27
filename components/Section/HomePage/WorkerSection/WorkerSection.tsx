'use client';
import React, { useState, useEffect } from 'react';
import styles from './WorkerSection.module.css';
import Badge from '@/components/UI/Atoms/Badge/Badge';
import SectionHeader from '@/components/Layout/SectionHeader/SectionHeader';
import DevolpercCard from '@/components/UI/Atoms/DevoleperCard/DevolpercCard';
import { HorizontalScroll } from '@/components/UI/Atoms/ScrollComponents/ScrollComponents';

import { WorkerSectionProps } from '@/types/HomePage/workerTypes';
import { getAllClients, ClientItem } from '@/service/Clients/Clients';
import useClientTranslation from '@/hooks/useClientTranslation';

const WorkerSection: React.FC<WorkerSectionProps> = ({
  badgeText,
  title1,
  title2,
  subtitle,
  
}) => {
  const { locale } = useClientTranslation('clients');
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const result = await getAllClients();
        
        if (result.success && result.data) {
          // Transform clients data to match DevolpercCard props
          const transformedClients = result.data.slice(0, 6).map(client => {
            // Get the first testimonial or use description
            let testimonial = client.description;
            if (client.testimonials.length > 0) {
              testimonial = client.testimonials[0].message[locale as 'en' | 'ar'];
            }
            
            return {
              id: client._id,
              name: client.name,
              company_name: client.company_name,
              description: testimonial,
              image_url: client.image_url || '/assets/axuraa.png',
              country: client.country,
              testimonials: client.testimonials
            };
          });
          
          setClients(transformedClients);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [locale]);

  const clientsToShow = clients.length > 0 ? clients : [];
  return (
    <section className={styles.WorkerSection}>
      <Badge text={badgeText} show={true} />
      <SectionHeader
        title1={title1}
        title2={title2}
        subtitle={subtitle}
        titleLayout="column"
      />
      <HorizontalScroll 
        className={styles.WorkerGrid}
      >
        {clientsToShow.map((client) => (
          <DevolpercCard
            key={client.id}
            testimonial={client.description}
            authorName={client.name}
            authorRole={client.company_name || client.country}
            avatarSrc={client.image_url && client.image_url !== null ? client.image_url : '/assets/axuraa.png'}
          />
        ))}
      </HorizontalScroll>
    </section>
  );
};

export default React.memo(WorkerSection);