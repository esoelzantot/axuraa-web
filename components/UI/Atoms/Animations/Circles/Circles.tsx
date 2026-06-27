import Image from "next/image";
import CircleSVG from "@/public/assets/circle.svg";
import styles from "./Circle.module.css";
import { CircleProps } from "@/types/Generals/backgroundTypes";

const Circle: React.FC<CircleProps> = ({ direction, position, className }) => {
  return (
    <div className={`${styles.circleContainer} ${className || ''}`}>
      <Image
        src={CircleSVG}
        alt="circle"
        className={`${styles.circle} ${styles[`circle${direction}${position}`]}`}
        fill
        priority
      />
    </div>
  );
};

export default Circle;