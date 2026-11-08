import type { Metadata } from "next";
import { getContactInformation } from "@/service/Contact/contactinformation";
import Contact from "@/components/pages/Contact/Contact";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have a project in mind? Get in touch with the Axuraa team.",
};

export default async function ContactUsPage() {
  const result = await getContactInformation();
  return <Contact contactData={result.data ?? null} />;
}
