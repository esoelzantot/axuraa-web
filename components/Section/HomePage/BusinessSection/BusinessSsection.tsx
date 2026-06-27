'use client';
import React, { useState, useEffect } from 'react';
import styles from './BusinessSsection.module.css';
import Card from '@/components/UI/Atoms/Card/Card';
import Badge  from'@/components/UI/Atoms/Badge/Badge';
import DirectionCard from '@/components/UI/Atoms/Card/DirectionCard';
import SectionHeader from '@/components/Layout/SectionHeader/SectionHeader';
import { getAllServices, ServiceItem } from '@/service/Services/services';
import useClientTranslation from '@/hooks/useClientTranslation';

const BusinessSection = () => {
  const { t, locale } = useClientTranslation('services');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const badgeText = "Business solutions";

  // Default fallback services
  const defaultServices = [
    {
      title: "Cybersecurity",
      description: "Protect your digital assets with our comprehensive cybersecurity solutions.",
      icon: "/assets/CardIcon.svg",
      serviceId: null // No service ID for fallback services
    },
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies to meet your business needs.",
      icon: "/assets/CardIcon.svg",
      serviceId: null // No service ID for fallback services
    },
    {
      title: "IT Consulting",
      description: "Expert advice to optimize your IT infrastructure and strategy.",
      icon: "/assets/CardIcon.svg",
      serviceId: null // No service ID for fallback services
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await getAllServices(locale as 'en' | 'ar');
        if (result.success && result.data) {
          // Filter for active services with type "solution" and take only 3
          const filteredServices = result.data
            .filter(service => service.type === 'solution' && service.is_active === true)
            .slice(0, 3);
          
          setServices(filteredServices);
        }
      } catch (error) {
        console.error('Error fetching business solutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [locale]);

  // Transform API data to match Card component props
  const getServicesToShow = () => {
    if (services.length === 0) return defaultServices;

    return services.map((service) => {
      let iconSrc = "/assets/CardIcon.svg"; // Default fallback
      
      if (service.icon) {
        // Handle different icon formats from API
        if (service.icon.startsWith('http')) {
          // Full URL (Cloudinary) - use as is
          iconSrc = service.icon;
        } else if (service.icon.startsWith('/')) {
          // Already has /assets prefix
          iconSrc = service.icon;
        } else {
          // Just filename - add /assets prefix
          iconSrc = `/assets/${service.icon}`;
        }
      }
      
      return {
        title: service.title,
        description: service.description,
        icon: iconSrc,
        serviceId: service._id // Store service ID for click handling
      };
    });
  };

  const servicesToShow = getServicesToShow();

  return (
    <section className={styles.servicesSection}>
        <Badge text={badgeText} show={true}  />
        <SectionHeader
            title1="How we help"
            title2="Businesses Grow?"
            subtitle="Discover our comprehensive suite of services designed to elevate your digital presence"
            titleLayout="column"
        />
        <div className={styles.servicesGrid}>
          {servicesToShow.map((service, index) => (
            <div
              key={index}
              onClick={() => {
                // Navigate to service detail page with service ID
                const serviceId = service.serviceId;
                if (serviceId) {
                  window.location.href = `/${locale}/service/${serviceId}`;
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <Card
                title={service.title}
                description={service.description}
                iconSrc={service.icon}
                borderRadius={index % 2 === 0 ? "0 68.087px 0 0" : "0 68.087px 0 0"}
              />
            </div>
          ))}
          <DirectionCard
            title="See All Services"
            description="Explore our full catalog"
            iconSrc="/assets/DirectionIcon.svg"
            borderRadius="0   68.087px 0 0"
            href={`/${locale}/businessSolutions`}
           />

        </div>
    </section>
  );
};

export default React.memo(BusinessSection);