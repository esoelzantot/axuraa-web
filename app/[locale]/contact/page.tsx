// app/[locale]/contact/page.tsx
import { getContactInformation } from "@/service/Contact/contactinformation";
import Contact from "@/components/pages/Contact/Contact";

export default async function ContactUsPage() {
  const result = await getContactInformation();
  const contactData = result.success && result.data ? result.data : null;

  return <Contact contactData={contactData} />;
}
