import { ClientItem } from "@/service/Clients/Clients";
import { Locale } from "@/lib/i18n";

/** WorkerSection props — @/components/Section/HomePage/WorkerSection/WorkerSection.tsx */
export interface WorkerSectionProps {
  badgeText: string;
  title1: string;
  title2: string;
  subtitle: string;
  clients: ClientItem[];
  locale: Locale;
}
