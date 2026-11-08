import { ENDPOINTS } from "../api/APIs";
import { http } from "../api/http";
import { ContactRequest, ContactResponse } from "@/types/Generals/contactForm";

/** Submits the contact form. The payload holds personal data, so it is never logged. */
export const create = async (contactData: ContactRequest): Promise<ContactResponse> => {
  const res = await http<{
    status?: string;
    message?: string;
    data?: { contactRequest?: unknown };
  }>(ENDPOINTS.Contact.create, { method: "POST", body: contactData });

  if (!res.ok) {
    return { success: false, error: res.error || "Failed to submit contact request" };
  }

  if (res.json.status === "success" && res.json.data) {
    return {
      success: true,
      data: (res.json.data.contactRequest ?? res.json.data) as ContactResponse["data"],
      message: res.json.message || "Contact request submitted successfully",
    };
  }

  return { success: false, error: res.json.message || "Unexpected response from server" };
};
