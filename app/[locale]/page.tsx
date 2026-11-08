import Homepage from "@/components/pages/Home/Homepage";
import { Locale } from "@/lib/i18n";

export const revalidate = 60;

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  // The [locale] layout has already rejected unsupported locales.
  const { locale } = await params;
  return <Homepage locale={locale as Locale} />;
}
