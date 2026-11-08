import { CaseStudyRoute, caseStudyMetadata } from "@/lib/caseStudyRoute";

export const revalidate = 60;
export const generateMetadata = caseStudyMetadata;
export default CaseStudyRoute;
