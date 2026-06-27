import React, { useState } from "react";
import styles from "./TeamCard.module.css";
import Typography from "@/components/UI/Atoms/Typography/Typography";

import { TeamCardProps } from "@/types/AboutUsPage/Team/TeamCard";
import Image from "next/image";

const TeamCard: React.FC<TeamCardProps> = ({ name, role, imageUrl, description }) => {
  const [imageError, setImageError] = useState(false);
  
  // Default fallback image - using existing bavly.jpg as placeholder
  const defaultImage = "/assets/bavly.jpg";
  
  // Validate and use fallback image if needed
  const getImageSrc = () => {
    if (imageError || !imageUrl) return defaultImage;
    
    // Check if it's a valid Cloudinary URL
    if (imageUrl.includes('res.cloudinary.com')) {
      // Basic validation for Cloudinary URL structure
      if (imageUrl.match(/res\.cloudinary\.com\/[^\/]+\/image\/upload\/.+/)) {
        return imageUrl;
      } else {
        // Invalid Cloudinary URL structure
        console.warn(`Invalid Cloudinary URL: ${imageUrl}`);
        return defaultImage;
      }
    }
    
    return imageUrl;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={getImageSrc()}
            alt={name}
            layout="fill"
            objectFit="cover"
            className={styles.image}
            onError={() => setImageError(true)}
            unoptimized={imageUrl.includes('res.cloudinary.com')}
          />
          <div className={styles.nameOverlay}>
            <Typography 
              variant="h6" 
              style={{
                color: "#fffdfd"
              }}
            >
              {name}
            </Typography>
          </div>
        </div>
        
      </div>
        <div className={styles.roleSection}>
          <Typography 
            variant="h4" 
            className={styles.role}
            style={{
              color: "#fffdfd"
            }}
          >
            {role}
          </Typography>
        </div>
      </div>
    
  );
};

export default TeamCard;
