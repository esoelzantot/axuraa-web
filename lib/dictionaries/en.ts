/**
 * English UI dictionary — the source of truth for every static string.
 * `ar.ts` must have exactly the same shape (enforced by the `Dictionary` type).
 * Content that comes from the CMS is not here; see `cms` in ar.ts for the few
 * CMS strings the backend only returns in English.
 */
export const en = {
  common: {
    brand: "Axuraa",
    logoAlt: "Axuraa logo",
    loading: "Loading…",
    startProject: "Start a Project",
    viewOurWork: "View Our Work",
    learnMore: "Learn More",
    explore: "Explore",
    viewCaseStudy: "View case study",
    getStarted: "Get Started",
    contactUs: "Contact Us",
    viewCaseStudies: "View Case Studies",
    caseStudy: "Case Study",
    service: "Service",
    solution: "Solution",
    mostPopular: "Most Popular",
    followUs: "Follow us",
    opensInNewTab: "(opens in a new tab)",
    moreCount: (n: number) => `+${n} more`,
    all: "All",
    filterProjects: "Filter projects",
    categories: "Categories",
    phone: "Phone",
    email: "Email",
    noServices: "No services available.",
    noProjects: "No projects found.",
    noProjectsForFilter: "No projects found for this filter.",
  },

  nav: {
    home: "Home",
    services: "Services",
    businessSolutions: "Business solutions",
    portfolio: "Portfolio",
    aboutus: "About Us",
    contact: "Contact",
    goHome: "Go to homepage",
    toggleMenu: "Toggle menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    callUs: "Call us",
    emailUs: "Email us",
  },

  language: {
    label: "Language",
    switchTo: (name: string) => `Switch language to ${name}`,
    en: "English",
    ar: "العربية",
    enShort: "EN",
    arShort: "ع",
  },

  hero: {
    defaultTitle1: "Scalable Software. ",
    defaultTitle2: "Intelligent Solutions.",
    defaultSubtitle: "We transform complex business challenges into streamlined digital experiences.",
    trustedBy: "TRUSTED BY FORWARD-THINKING COMPANIES",
    availableBadge: "AVAILABLE FOR NEW PROJECTS",
    innovationBadge: "INNOVATION IN PROGRESS",
    whoWeAre: "WHO WE ARE",
  },

  home: {
    hero: {
      title1: "Welcome to Axuraa",
      title2: "Building Digital Excellence",
      subtitle: "Transforming ideas into powerful digital experiences.",
    },
    services: {
      badge: "Our Services",
      title1: "How we help",
      title2: "Businesses Grow?",
      subtitle: "Discover our comprehensive suite of services designed to elevate your digital presence",
      seeAllTitle: "See All Services",
      seeAllDescription: "Explore our full catalog",
    },
    business: {
      badge: "Business solutions",
      title1: "Solutions built",
      title2: "for your Business",
      subtitle: "Ready-made products we tailor to the way your business works",
      seeAllTitle: "See All Solutions",
      seeAllDescription: "Explore our full catalog",
    },
    trackRecord: {
      badge: "Our Achievements",
      title1: "Our Track Record",
      title2: "in Numbers",
      subtitle: "Results we have delivered for our clients",
    },
    projects: {
      badge: "Our Projects",
      title1: "A Showcase of",
      title2: "Our Recent Work",
      subtitle: "Explore some of the projects we've delivered for our clients",
      seeAll: "View All Projects",
    },
    clients: {
      badge: "Our Clients",
      title1: "What Our",
      title2: "Clients Say",
      subtitle: "Hear from the businesses we have partnered with",
    },
    contact: {
      badge: "Contact Us",
      title1: "Let's Build",
      title2: "Something Great Together",
      subtitle: "Reach out to discuss your next project with our team",
    },
  },

  /** Hero shared by the Services, Business Solutions and Portfolio pages. */
  listingHero: {
    title1: "Architecting the Future of",
    title2: "Digital Business.",
    subtitle:
      "At Axuraa, we don't just write code. We build the digital infrastructure that powers the world's most ambitious companies.",
  },

  serviceDetail: {
    fallbackTitle: "Service",
    fallbackDescription: "Service description",
    overview: "Overview",
    whatWeDo: "What We Do",
    whatWeDoFallback: "Our experts build exceptional digital experiences.",
    unitFallback: "Custom application and platform development",
    technologies: "Technologies Used",
    featuresEyebrow: "Our Features",
    featuresTitle: "Features & Capabilities",
    featuresIntro: "Comprehensive services designed to build and scale your digital presence.",
    processEyebrow: "Our Process",
    processTitle: "Our Development Process",
    processIntro:
      "A systematic approach that ensures a high-quality product through discovery, design, implementation, and support.",
    steps: [
      { title: "Discovery", description: "We analyze your requirements and create a detailed project plan." },
      { title: "Design", description: "Our designers create wireframes and UI/UX designs for your approval." },
      { title: "Development", description: "Our developers bring the design to life with clean, efficient code." },
      { title: "Testing", description: "We thoroughly test all features to ensure quality and performance." },
      { title: "Launch & Support", description: "We deploy your project and provide ongoing support and maintenance." },
    ],
    storiesEyebrow: "Our Stories",
    storiesTitle: "Success Stories",
    storiesIntro: "Real results demonstrating measurable improvements in digital performance.",
    testimonial: {
      quote:
        "The team completely transformed our online presence. Their design sense is brilliant, and the development process was smooth and transparent.",
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
    },
    packagesEyebrow: "Our Packages",
    packagesTitle: "Service Packages",
    packagesIntro: "Choose the solution that fits your business needs.",
    packages: [
      {
        title: "Starter Package",
        description: "Perfect for small businesses",
        features: [
          "5 pages website",
          "Mobile responsive",
          "Basic SEO",
          "Contact form",
          "1 month support",
          "E-commerce integration",
          "Analytics dashboard",
        ],
      },
      {
        title: "Professional Package",
        description: "Ideal for growing businesses",
        features: [
          "10 pages website",
          "Mobile responsive",
          "Advanced SEO",
          "Contact form",
          "3 months support",
          "E-commerce integration",
          "Analytics dashboard",
        ],
      },
      {
        title: "Enterprise Package",
        description: "For large scale businesses",
        features: [
          "Unlimited pages",
          "Mobile responsive",
          "Premium SEO",
          "Advanced forms",
          "6 months support",
          "E-commerce integration",
          "Analytics dashboard",
        ],
      },
    ],
    ctaTitle: "Free Project Consultation",
    ctaText: "Get a comprehensive evaluation of your project goals with our complimentary assessment.",
    ctaButton: "Schedule Free Assessment",
  },

  caseStudy: {
    fallbackTitle: "Case Study",
    breadcrumb: "Breadcrumb",
    overview: "Overview",
    keyFeatures: "Key Features",
    featuresIntro:
      "A comprehensive suite of features designed to optimize the experience for merchants and customers alike.",
    results: "Case Study Results",
    showPrototype: "Show prototype",
    prototypeUnavailable: "Prototype not available",
    ctaTitle: "Free Project Consultation",
    ctaText:
      "Get a comprehensive evaluation of your project goals and digital strategy with our complimentary assessment.",
    ctaButton: "Schedule free assessment",
    testimonials: "Client Testimonials",
    showLess: "Show less",
    showMore: (n: number) => `Show ${n} more`,
    anonymous: "Anonymous",
    details: "Project Details",
    client: "Client",
    projectManager: "Project manager",
    started: "Started",
    team: "Team",
    location: "Location",
    teamMembers: (n: number) => `${n} team ${n === 1 ? "member" : "members"}`,
    dateLocale: "en-US",
  },

  about: {
    hero: {
      title1: "Architecting the Future of",
      title2: "Digital Business",
      subtitle: "At Axuraa, we don't just write code...",
    },
    stats: ["Years Experience", "Projects Launched", "Team Experts", "Client Retention"],
    mission: {
      title: "Our Mission",
      kind: "Why we exist",
      description:
        "To empower organizations with scalable, intelligent software solutions that drive efficiency and unlock new growth opportunities. We strive to demystify technology and make enterprise-grade innovation accessible to ambitious businesses.",
    },
    vision: {
      title: "Our Vision",
      kind: "Where we're going",
      description:
        "To be the global benchmark for software engineering excellence, fostering a world where businesses of all sizes can seamlessly adapt to the digital evolution without technical barriers or complexity.",
    },
    history: {
      badge: "OUR HISTORY",
      fallbackTitle: "A Journey of Continuous Evolution",
      fallbackTimeline: [
        {
          year: "2015",
          title: "The Beginning",
          description:
            "Founded by two engineers in a small garage in San Francisco with a vision to simplify enterprise software.",
        },
        {
          year: "2018",
          title: "Global Reach",
          description:
            "Expanded operations to Europe and closed our 50th major project. Team grew to 20 specialists.",
        },
        {
          year: "2021",
          title: "Innovation Leap",
          description:
            "Launched our proprietary cloud migration framework, helping clients reduce costs by an average of 40%.",
        },
        {
          year: "2024",
          title: "Industry Leaders",
          description:
            "Recognized as a top software solutions provider, serving Fortune 500 clients globally with a dedicated team of 45+ experts.",
        },
      ],
      cardTitle: "Writing History",
      cardSubtitle: "One line of code at a time.",
    },
    why: {
      badge: "AXURAA",
      title: " Why Axuraa?",
      subtitle:
        "Our culture is built on principles that ensure we deliver not just code, but tangible business value.",
      items: [
        {
          title: "Innovation First",
          description: "We constantly explore new technologies to keep you ahead of the curve.",
        },
        {
          title: "Integrity",
          description: "Transparency in every step. No hidden costs or surprises, just honest work.",
        },
        {
          title: "Partnership",
          description: "We work with you, not just for you. Your business goals become our goals.",
        },
        {
          title: "Agile Execution",
          description: "Rapid delivery and iterative improvement for faster, better results.",
        },
      ],
    },
    team: {
      badge: "AXURAA",
      title: " Our Team",
      subtitle: "The engineers, designers and strategists behind every product we ship",
      founderSuffix: " & Founder",
    },
    cta: {
      title: "Ready to Innovate?",
      subtitle: "Join the list of forward-thinking companies that trust Axuraa to deliver excellence.",
      primary: "Contact Us",
      secondary: "View Case Studies",
    },
  },

  contactPage: {
    hero: {
      badge: "CONTACT US",
      title1: "Let's build something",
      title2: "extraordinary.",
      subtitle: "Have a project in mind? We'd love to hear about it.",
    },
    social: {
      eyebrow: "Social Media",
      title: "Follow Us on Social Media",
      subtitle: "Stay up to date with our latest news and projects.",
    },
    email: {
      eyebrow: "Email Us",
      title: "Contact via Email",
      subtitle: "Choose the appropriate section for your inquiry.",
    },
    block: {
      badge: "Contact Us",
      title1: "Let's build something",
      title2: "extraordinary.",
      subtitle: "Have a project in mind? We'd love to hear about it.",
    },
  },

  form: {
    fullName: "Full Name",
    fullNamePlaceholder: "John Doe",
    contactMethod: "Preferred Contact Method",
    email: "Email",
    phone: "Phone",
    phoneNumber: "Phone number",
    emailPlaceholder: "john.doe@example.com",
    phonePlaceholder: "+1 (555) 123-4567",
    services: "Services of Interest",
    selectServices: "Select services",
    servicesSelected: (n: number) => `${n} services selected`,
    serviceOptions: {
      ERP: "ERP",
      E_commerce: "E-commerce",
      Website: "Website",
      Mobile_App: "Mobile App",
      Cloud_Migration: "Cloud Migration",
      AI_Integration: "AI Integration",
    },
    message: "Message",
    messagePlaceholder: "Tell us about your project...",
    send: "Send Message",
    sending: "Sending...",
    errors: {
      fullName: "Full name is required",
      email: "Email is required",
      emailInvalid: "Please enter a valid email address",
      phone: "Phone number is required",
      phoneInvalid: "Please enter a valid phone number",
      services: "Please select at least one service",
      message: "Message is required",
    },
    success: "Thank you! Your message has been sent successfully.",
    failure: "Failed to send message. Please try again.",
    unexpected: "An unexpected error occurred. Please try again later.",
  },

  chat: {
    open: "Open chat",
    close: "Close chat",
    tooltip: "Ask our AI",
    dialog: "AI Assistant chat",
    name: "AI Assistant",
    online: "Online · replies instantly",
    typing: "Typing…",
    typingLabel: "Assistant is typing",
    greeting: "Hello! I'm your AI assistant. How can I help you today?",
    error: "Sorry, I encountered an error. Please try again.",
    placeholder: "Type your message...",
    inputLabel: "Type message",
    send: "Send message",
    suggestions: [
      "Who are Axuraa?",
      "What services do you offer?",
      "How can I contact you?",
      "What is your pricing?",
      "Do you have a portfolio?",
      "How long does a project take?",
    ],
  },

  footer: {
    description:
      "We transform your digital vision into reality through innovative web development, mobile apps, UI/UX design, and digital marketing solutions.",
    company: "Company",
    services: "Services",
    products: "Products",
    links: {
      about: "About Us",
      portfolio: "Portfolio",
      services: "Services",
      businessSolutions: "Business Solutions",
      contact: "Contact",
    },
    rights: (year: number) => `© ${year} AXURAA. All rights reserved.`,
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },

  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    back: "Back to home",
  },

  error: {
    title: "Something went wrong",
    text: "We could not load this page. Please try again in a moment.",
    retry: "Try again",
  },

  meta: {
    siteDescription:
      "Axuraa builds scalable software and intelligent business solutions: web, mobile, cloud and AI.",
    about: { title: "About Us", description: "Our story, mission, values and the team behind Axuraa." },
    businessSolutions: {
      title: "Business Solutions",
      description: "Ready-made business solutions from Axuraa, tailored to the way you work.",
    },
    contact: { title: "Contact Us", description: "Have a project in mind? Get in touch with the Axuraa team." },
    portfolio: { title: "Portfolio", description: "Case studies and projects delivered by Axuraa." },
    services: { title: "Services", description: "Web, mobile, cloud and AI services from Axuraa." },
    privacy: {
      title: "Privacy Policy",
      description: "How Axuraa collects, uses and protects your personal information.",
    },
    terms: {
      title: "Terms of Service",
      description: "The terms that govern the use of the Axuraa website and services.",
    },
  },

  /** English CMS text is shown as-is. */
  cms: {} as Record<string, string>,
};

/** Shape every locale's dictionary must match. */
export type Dictionary = typeof en;
