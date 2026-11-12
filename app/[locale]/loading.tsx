// app/loading.tsx
import PerLoading from "@/components/UI/Muscles/PreLoading/PreLoading";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <PerLoading size="xl" />
    </div>
  );
}
