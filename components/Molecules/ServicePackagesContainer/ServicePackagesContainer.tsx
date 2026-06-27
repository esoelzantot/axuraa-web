import React from "react";
import styles from "./ServicePackagesContainer.module.css";
import ServicePackagesCard from "@/components/UI/Atoms/ServicePackagesCard/ServicePackagesCard";

interface ServicePackage {
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  hasButtonBackground?: boolean;
  hasShadow?: boolean;
}

interface ServicePackagesContainerProps {
  packages: ServicePackage[];
  locale: "en" | "ar";
}

const ServicePackagesContainer: React.FC<ServicePackagesContainerProps> = ({
  packages,
  locale,
}) => {
  return (
    <div className={styles.container}>
      {packages.map((pkg, index) => (
        <ServicePackagesCard
          key={index}
          title={pkg.title}
          description={pkg.description}
          // price={pkg.price}
          features={pkg.features}
          locale={locale}
          isPopular={pkg.isPopular || false}
          hasShadow={pkg.hasShadow || false}
          showPopularBadge={pkg.isPopular || false}
          hasButtonBackground={pkg.hasButtonBackground !== false}
          buttonText="Get Started"
        />
      ))}
    </div>
  );
};

export default React.memo(ServicePackagesContainer);
