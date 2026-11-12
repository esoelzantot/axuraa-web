import PreLoading from "@/components/UI/Muscles/PreLoading/PreLoading";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <PreLoading size={120} />
    </div>
  );
}
