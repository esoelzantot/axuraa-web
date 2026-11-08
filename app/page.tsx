import Homepage from "@/components/pages/Home/Homepage";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export const revalidate = 60;

export default function Home() {
  return <Homepage locale={DEFAULT_LOCALE} />;
}
