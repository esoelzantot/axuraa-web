// import Card from '@/components/UI/Card/Card';
import styles from "./page.module.css";
import HeroSection from "@/components/Layout/HeroSection/HeroSection";
import Homepage from "@/components/pages/Home/Homepage";

import { getContactInformation } from "@/service/Contact/contactinformation";

interface HomeProps {
  params: Promise<{ locale: "en" | "ar" }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  const result = await getContactInformation();
  const contactData = result.success && result.data ? result.data : null;

  return (
    <div className={styles.pageContainer}>
      {/* Example 1: Show everything (default) */}
      <HeroSection
        primaryHref={`/${locale}#contact-home-form`}
        title1="Welcome to Axuraa"
        title2="Building Digital Excellence"
        subtitle1="Transforming ideas into powerful digital experiences."
        badgeText="INNOVATION IN PROGRESS"
        showBackgroundDots={true}
        showAnimatedCircles={true}
        showBadge={true}
        showTrustedSection={true}
        showPrimaryButton={true}
        showSecondaryButton={true}
        showEllipseDecorations={true}
        showStatusBadge={false}
        backgroundType="Hexagon"
        height="100vh"
      />

      <Homepage contactData={contactData} />
    </div>
  );
}
