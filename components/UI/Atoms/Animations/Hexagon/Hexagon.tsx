import Image from "next/image";
import HexagonSVG from "@/public/assets/shap_1.svg";
import styles from "./Hexagon.module.css";
import { HexagonProps } from "@/types/Generals/backgroundTypes";

const Hexagon: React.FC<HexagonProps> = ({ direction, position, className }) => {
  return (
    <div className={`${styles.hexagonContainer} ${className || ''}`}>
      <Image
        src={HexagonSVG}
        alt="hexagon"
        className={`${styles.hexagon} ${styles[`hexagon${direction}${position}`]}`}
        fill
        priority
      />
    </div>
  );
};

export default Hexagon;