import Homepage from '@/components/pages/Home/Homepage';
import { getContactInformation } from '@/service/Contact/contactinformation';

const LocalePage = async () => {
   const result = await getContactInformation();
      const contactData = result.success && result.data ? result.data : null;
    
  return <Homepage  contactData={contactData}/>;
};

export default LocalePage;
