import type { Dictionary } from "./en";

/** Arabic UI dictionary — must mirror en.ts exactly (checked by the `Dictionary` type). */
export const ar: Dictionary = {
  common: {
    brand: "Axuraa",
    logoAlt: "شعار Axuraa",
    loading: "جارٍ التحميل…",
    startProject: "ابدأ مشروعك",
    viewOurWork: "شاهد أعمالنا",
    learnMore: "اعرف المزيد",
    explore: "استكشف",
    viewCaseStudy: "عرض دراسة الحالة",
    getStarted: "ابدأ الآن",
    contactUs: "تواصل معنا",
    viewCaseStudies: "شاهد دراسات الحالة",
    caseStudy: "دراسة حالة",
    service: "خدمة",
    solution: "حل",
    mostPopular: "الأكثر طلبًا",
    followUs: "تابعنا",
    opensInNewTab: "(يفتح في نافذة جديدة)",
    moreCount: (n: number) => `+${n} أخرى`,
    all: "الكل",
    filterProjects: "تصفية المشروعات",
    categories: "التصنيفات",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    noServices: "لا توجد خدمات متاحة حاليًا.",
    noProjects: "لا توجد مشروعات.",
    noProjectsForFilter: "لا توجد مشروعات ضمن هذا التصنيف.",
  },

  nav: {
    home: "الرئيسية",
    services: "الخدمات",
    businessSolutions: "حلول الأعمال",
    portfolio: "أعمالنا",
    aboutus: "من نحن",
    contact: "تواصل معنا",
    goHome: "الانتقال إلى الصفحة الرئيسية",
    toggleMenu: "فتح القائمة أو إغلاقها",
    closeMenu: "إغلاق القائمة",
    mainNav: "التنقل الرئيسي",
    callUs: "اتصل بنا",
    emailUs: "راسلنا",
  },

  language: {
    label: "اللغة",
    switchTo: (name: string) => `تغيير اللغة إلى ${name}`,
    en: "English",
    ar: "العربية",
    enShort: "EN",
    arShort: "ع",
  },

  hero: {
    defaultTitle1: "برمجيات قابلة للتوسع. ",
    defaultTitle2: "حلول ذكية.",
    defaultSubtitle: "نحوّل تحديات الأعمال المعقدة إلى تجارب رقمية سلسة.",
    trustedBy: "تثق بنا شركات تتطلع إلى المستقبل",
    availableBadge: "متاحون لمشروعات جديدة",
    innovationBadge: "الابتكار مستمر",
    whoWeAre: "من نحن",
  },

  home: {
    hero: {
      title1: "مرحبًا بك في Axuraa",
      title2: "نصنع التميّز الرقمي",
      subtitle: "نحوّل الأفكار إلى تجارب رقمية قوية.",
    },
    services: {
      badge: "خدماتنا",
      title1: "كيف نساعد",
      title2: "الشركات على النمو؟",
      subtitle: "اكتشف مجموعتنا المتكاملة من الخدمات المصممة للارتقاء بحضورك الرقمي",
      seeAllTitle: "كل الخدمات",
      seeAllDescription: "استكشف كتالوج خدماتنا الكامل",
    },
    business: {
      badge: "حلول الأعمال",
      title1: "حلول مصممة",
      title2: "لأعمالك",
      subtitle: "منتجات جاهزة نكيّفها لتناسب طريقة عمل شركتك",
      seeAllTitle: "كل الحلول",
      seeAllDescription: "استكشف كتالوج حلولنا الكامل",
    },
    trackRecord: {
      badge: "إنجازاتنا",
      title1: "سجلّ إنجازاتنا",
      title2: "بالأرقام",
      subtitle: "نتائج حققناها لعملائنا",
    },
    projects: {
      badge: "مشروعاتنا",
      title1: "نماذج من",
      title2: "أحدث أعمالنا",
      subtitle: "استكشف بعض المشروعات التي نفذناها لعملائنا",
      seeAll: "عرض كل المشروعات",
    },
    clients: {
      badge: "عملاؤنا",
      title1: "ماذا يقول",
      title2: "عملاؤنا",
      subtitle: "استمع إلى الشركات التي تشاركنا معها النجاح",
    },
    contact: {
      badge: "تواصل معنا",
      title1: "لنبنِ معًا",
      title2: "شيئًا استثنائيًا",
      subtitle: "تواصل معنا لمناقشة مشروعك القادم مع فريقنا",
    },
  },

  listingHero: {
    title1: "نصمّم مستقبل",
    title2: "الأعمال الرقمية.",
    subtitle:
      "في Axuraa لا نكتفي بكتابة الأكواد، بل نبني البنية الرقمية التي تقود أكثر الشركات طموحًا حول العالم.",
  },

  serviceDetail: {
    fallbackTitle: "خدمة",
    fallbackDescription: "وصف الخدمة",
    overview: "نظرة عامة",
    whatWeDo: "ماذا نقدّم",
    whatWeDoFallback: "يبني خبراؤنا تجارب رقمية استثنائية.",
    unitFallback: "تطوير التطبيقات والمنصات حسب الطلب",
    technologies: "التقنيات المستخدمة",
    featuresEyebrow: "المزايا",
    featuresTitle: "المزايا والإمكانات",
    featuresIntro: "خدمات متكاملة مصممة لبناء حضورك الرقمي وتوسيعه.",
    processEyebrow: "منهجيتنا",
    processTitle: "مراحل التطوير لدينا",
    processIntro: "منهجية واضحة تضمن منتجًا عالي الجودة، من الاستكشاف والتصميم إلى التنفيذ والدعم.",
    steps: [
      { title: "الاستكشاف", description: "نحلّل متطلباتك ونضع خطة تفصيلية للمشروع." },
      { title: "التصميم", description: "يصمم فريقنا الهياكل الأولية وتجربة المستخدم وواجهاته لاعتمادها." },
      { title: "التطوير", description: "يحوّل مطورونا التصميم إلى منتج حقيقي بكود نظيف وفعّال." },
      { title: "الاختبار", description: "نختبر جميع المزايا بدقة لضمان الجودة والأداء." },
      { title: "الإطلاق والدعم", description: "نطلق مشروعك ونقدّم الدعم والصيانة المستمرين." },
    ],
    storiesEyebrow: "قصص النجاح",
    storiesTitle: "قصص نجاح",
    storiesIntro: "نتائج حقيقية تعكس تحسنًا ملموسًا في الأداء الرقمي.",
    testimonial: {
      quote:
        "غيّر الفريق حضورنا الرقمي بالكامل. حسّهم التصميمي رائع، وكانت مراحل التطوير سلسة وشفافة.",
      name: "سارة جونسون",
      role: "الرئيسة التنفيذية، TechStart Inc.",
    },
    packagesEyebrow: "الباقات",
    packagesTitle: "باقات الخدمة",
    packagesIntro: "اختر الحل الذي يناسب احتياجات عملك.",
    packages: [
      {
        title: "الباقة الأساسية",
        description: "مثالية للشركات الصغيرة",
        features: [
          "موقع من 5 صفحات",
          "متوافق مع الجوال",
          "تحسين أساسي لمحركات البحث",
          "نموذج تواصل",
          "دعم لمدة شهر",
          "تكامل مع المتجر الإلكتروني",
          "لوحة تحليلات",
        ],
      },
      {
        title: "الباقة الاحترافية",
        description: "مثالية للشركات النامية",
        features: [
          "موقع من 10 صفحات",
          "متوافق مع الجوال",
          "تحسين متقدم لمحركات البحث",
          "نموذج تواصل",
          "دعم لمدة 3 أشهر",
          "تكامل مع المتجر الإلكتروني",
          "لوحة تحليلات",
        ],
      },
      {
        title: "باقة المؤسسات",
        description: "للشركات الكبيرة",
        features: [
          "عدد غير محدود من الصفحات",
          "متوافق مع الجوال",
          "تحسين احترافي لمحركات البحث",
          "نماذج متقدمة",
          "دعم لمدة 6 أشهر",
          "تكامل مع المتجر الإلكتروني",
          "لوحة تحليلات",
        ],
      },
    ],
    ctaTitle: "استشارة مجانية لمشروعك",
    ctaText: "احصل على تقييم شامل لأهداف مشروعك من خلال جلسة تقييم مجانية.",
    ctaButton: "احجز تقييمك المجاني",
  },

  caseStudy: {
    fallbackTitle: "دراسة حالة",
    breadcrumb: "مسار التنقل",
    overview: "نظرة عامة",
    keyFeatures: "أبرز المزايا",
    featuresIntro: "مجموعة متكاملة من المزايا صُممت لتحسين التجربة للتجار والعملاء على حد سواء.",
    results: "نتائج المشروع",
    showPrototype: "عرض النموذج",
    prototypeUnavailable: "النموذج غير متاح",
    ctaTitle: "استشارة مجانية لمشروعك",
    ctaText: "احصل على تقييم شامل لأهداف مشروعك واستراتيجيتك الرقمية من خلال جلسة تقييم مجانية.",
    ctaButton: "احجز تقييمك المجاني",
    testimonials: "آراء العملاء",
    showLess: "عرض أقل",
    showMore: (n: number) => `عرض ${n} آخرين`,
    anonymous: "عميل",
    details: "تفاصيل المشروع",
    client: "العميل",
    projectManager: "مدير المشروع",
    started: "تاريخ البدء",
    team: "الفريق",
    location: "الموقع",
    teamMembers: (n: number) =>
      n === 0 ? "لا يوجد أعضاء" : n === 1 ? "عضو واحد" : n === 2 ? "عضوان" : n <= 10 ? `${n} أعضاء` : `${n} عضوًا`,
    dateLocale: "ar-EG",
  },

  about: {
    hero: {
      title1: "نصمّم مستقبل",
      title2: "الأعمال الرقمية",
      subtitle: "في Axuraa، نحن لا نكتب الأكواد فحسب...",
    },
    stats: ["سنوات من الخبرة", "مشروع تم إطلاقه", "خبير في فريقنا", "نسبة احتفاظ بالعملاء"],
    mission: {
      title: "رسالتنا",
      kind: "لماذا نحن هنا",
      description:
        "تمكين المؤسسات بحلول برمجية ذكية وقابلة للتوسع ترفع الكفاءة وتفتح آفاقًا جديدة للنمو. نسعى إلى تبسيط التقنية وجعل الابتكار بمستوى المؤسسات الكبرى في متناول الشركات الطموحة.",
    },
    vision: {
      title: "رؤيتنا",
      kind: "إلى أين نتجه",
      description:
        "أن نكون المعيار العالمي للتميّز في هندسة البرمجيات، ونسهم في عالم تستطيع فيه الشركات بمختلف أحجامها مواكبة التحول الرقمي بسلاسة، دون عوائق تقنية أو تعقيد.",
    },
    history: {
      badge: "قصتنا",
      fallbackTitle: "رحلة من التطور المستمر",
      fallbackTimeline: [
        {
          year: "2015",
          title: "البداية",
          description: "تأسست على يد مهندسَين في مرآب صغير بسان فرانسيسكو برؤية لتبسيط برمجيات المؤسسات.",
        },
        {
          year: "2018",
          title: "انتشار عالمي",
          description: "توسعت أعمالنا إلى أوروبا وأنجزنا مشروعنا الكبير الخمسين، ونما فريقنا إلى 20 متخصصًا.",
        },
        {
          year: "2021",
          title: "قفزة في الابتكار",
          description: "أطلقنا إطار العمل الخاص بنا لنقل الأنظمة إلى السحابة، فخفّضنا تكاليف عملائنا بنسبة 40% في المتوسط.",
        },
        {
          year: "2024",
          title: "رواد في المجال",
          description:
            "أصبحنا من أبرز مزودي الحلول البرمجية، نخدم عملاء من قائمة Fortune 500 حول العالم بفريق متخصص يضم أكثر من 45 خبيرًا.",
        },
      ],
      cardTitle: "نكتب التاريخ",
      cardSubtitle: "سطرًا برمجيًا تلو الآخر.",
    },
    why: {
      badge: "AXURAA",
      title: " لماذا Axuraa؟",
      subtitle: "ثقافتنا قائمة على مبادئ تضمن أن نقدّم قيمة حقيقية لأعمالك، لا مجرد أكواد.",
      items: [
        {
          title: "الابتكار أولًا",
          description: "نستكشف أحدث التقنيات باستمرار لنبقيك متقدمًا على منافسيك.",
        },
        {
          title: "النزاهة",
          description: "شفافية في كل خطوة؛ لا تكاليف خفية ولا مفاجآت، بل عمل صادق.",
        },
        {
          title: "الشراكة",
          description: "نعمل معك لا لأجلك فقط؛ أهداف عملك تصبح أهدافنا.",
        },
        {
          title: "تنفيذ مرن",
          description: "تسليم سريع وتحسين مستمر لنتائج أسرع وأفضل.",
        },
      ],
    },
    team: {
      badge: "AXURAA",
      title: " فريقنا",
      subtitle: "المهندسون والمصممون والخبراء الذين يقفون وراء كل منتج نطلقه",
      founderSuffix: " والمؤسس",
    },
    cta: {
      title: "مستعد للابتكار؟",
      subtitle: "انضم إلى الشركات المتطلعة للمستقبل التي تثق في Axuraa لتقديم التميّز.",
      primary: "تواصل معنا",
      secondary: "شاهد دراسات الحالة",
    },
  },

  contactPage: {
    hero: {
      badge: "تواصل معنا",
      title1: "لنبنِ معًا شيئًا",
      title2: "استثنائيًا.",
      subtitle: "لديك فكرة مشروع؟ يسعدنا أن نسمع عنها.",
    },
    social: {
      eyebrow: "وسائل التواصل",
      title: "تابعنا على وسائل التواصل",
      subtitle: "ابقَ على اطلاع بأحدث أخبارنا ومشروعاتنا.",
    },
    email: {
      eyebrow: "راسلنا",
      title: "تواصل عبر البريد",
      subtitle: "اختر القسم المناسب لاستفسارك.",
    },
    block: {
      badge: "تواصل معنا",
      title1: "لنبنِ معًا شيئًا",
      title2: "استثنائيًا.",
      subtitle: "لديك فكرة مشروع؟ يسعدنا أن نسمع عنها.",
    },
  },

  form: {
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "محمد أحمد",
    contactMethod: "وسيلة التواصل المفضلة",
    email: "البريد",
    phone: "الهاتف",
    phoneNumber: "رقم الهاتف",
    emailPlaceholder: "name@example.com",
    phonePlaceholder: "+20 100 000 0000",
    services: "الخدمات المطلوبة",
    selectServices: "اختر الخدمات",
    servicesSelected: (n: number) => (n === 2 ? "تم اختيار خدمتين" : `تم اختيار ${n} خدمات`),
    serviceOptions: {
      ERP: "نظام تخطيط الموارد (ERP)",
      E_commerce: "التجارة الإلكترونية",
      Website: "موقع إلكتروني",
      Mobile_App: "تطبيق جوال",
      Cloud_Migration: "الانتقال إلى السحابة",
      AI_Integration: "دمج الذكاء الاصطناعي",
    },
    message: "رسالتك",
    messagePlaceholder: "أخبرنا عن مشروعك...",
    send: "أرسل الرسالة",
    sending: "جارٍ الإرسال...",
    errors: {
      fullName: "الاسم الكامل مطلوب",
      email: "البريد الإلكتروني مطلوب",
      emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
      phone: "رقم الهاتف مطلوب",
      phoneInvalid: "يرجى إدخال رقم هاتف صحيح",
      services: "يرجى اختيار خدمة واحدة على الأقل",
      message: "الرسالة مطلوبة",
    },
    success: "شكرًا لك! تم إرسال رسالتك بنجاح.",
    failure: "تعذّر إرسال الرسالة. يرجى المحاولة مرة أخرى.",
    unexpected: "حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.",
  },

  chat: {
    open: "فتح المحادثة",
    close: "إغلاق المحادثة",
    tooltip: "اسأل مساعدنا الذكي",
    dialog: "محادثة المساعد الذكي",
    name: "المساعد الذكي",
    online: "متصل · يرد فورًا",
    typing: "يكتب…",
    typingLabel: "المساعد يكتب الآن",
    greeting: "مرحبًا! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
    error: "عذرًا، حدث خطأ. يرجى المحاولة مرة أخرى.",
    placeholder: "اكتب رسالتك...",
    inputLabel: "اكتب رسالة",
    send: "إرسال الرسالة",
    suggestions: [
      "من هي Axuraa؟",
      "ما الخدمات التي تقدمونها؟",
      "كيف يمكنني التواصل معكم؟",
      "ما هي أسعاركم؟",
      "هل لديكم معرض أعمال؟",
      "كم يستغرق تنفيذ المشروع؟",
    ],
  },

  footer: {
    description:
      "نحوّل رؤيتك الرقمية إلى واقع من خلال تطوير مواقع ويب مبتكرة وتطبيقات جوال وتصميم تجربة وواجهة المستخدم وحلول التسويق الرقمي.",
    company: "الشركة",
    services: "الخدمات",
    products: "المنتجات",
    links: {
      about: "من نحن",
      portfolio: "أعمالنا",
      services: "الخدمات",
      businessSolutions: "حلول الأعمال",
      contact: "تواصل معنا",
    },
    rights: (year: number) => `© ${year} AXURAA. جميع الحقوق محفوظة.`,
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
  },

  notFound: {
    title: "الصفحة غير موجودة",
    text: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    back: "العودة إلى الرئيسية",
  },

  error: {
    title: "حدث خطأ ما",
    text: "تعذّر تحميل هذه الصفحة. يرجى المحاولة مرة أخرى بعد قليل.",
    retry: "حاول مرة أخرى",
  },

  meta: {
    siteDescription:
      "تبني Axuraa برمجيات قابلة للتوسع وحلول أعمال ذكية: مواقع ويب وتطبيقات جوال وحلول سحابية وذكاء اصطناعي.",
    about: { title: "من نحن", description: "قصتنا ورسالتنا وقيمنا والفريق الذي يقف وراء Axuraa." },
    businessSolutions: {
      title: "حلول الأعمال",
      description: "حلول أعمال جاهزة من Axuraa، مصممة لتناسب طريقة عملك.",
    },
    contact: { title: "تواصل معنا", description: "لديك فكرة مشروع؟ تواصل مع فريق Axuraa." },
    portfolio: { title: "أعمالنا", description: "دراسات حالة ومشروعات نفذتها Axuraa." },
    services: { title: "الخدمات", description: "خدمات الويب والجوال والسحابة والذكاء الاصطناعي من Axuraa." },
    privacy: {
      title: "سياسة الخصوصية",
      description: "كيف تجمع Axuraa بياناتك الشخصية وتستخدمها وتحميها.",
    },
    terms: {
      title: "شروط الخدمة",
      description: "الشروط التي تنظم استخدام موقع Axuraa وخدماتها.",
    },
  },

  /**
   * A few CMS endpoints (track record, history, contact info) return English
   * even with `?lang=ar`. Known strings are translated here; anything else is
   * shown as the CMS sent it.
   */
  cms: {
    // Track record
    "Proven Track Record": "سجلّ حافل بالإنجازات",
    "Successful Projects": "مشروع ناجح",
    "Happy Clients": "عميل سعيد",
    Awards: "جائزة",
    "Team Members": "عضو في الفريق",
    // History
    "Our Journey": "رحلتنا",
    "The Beginning": "البداية",
    "Axuraa was founded with a vision to deliver innovative tech solutions.":
      "تأسست Axuraa برؤية واضحة لتقديم حلول تقنية مبتكرة.",
    "Growth Phase": "مرحلة النمو",
    "We expanded our services and worked with international clients.":
      "وسّعنا نطاق خدماتنا وبدأنا العمل مع عملاء دوليين.",
    Today: "اليوم",
    "Axuraa is a trusted partner for scalable backend systems.":
      "أصبحت Axuraa شريكًا موثوقًا في بناء أنظمة خلفية قابلة للتوسع.",
    // Client countries
    Egypt: "مصر",
    "Saudi Arabia": "السعودية",
    "United Arab Emirates": "الإمارات",
    UAE: "الإمارات",
    Kuwait: "الكويت",
    Qatar: "قطر",
    // Contact information
    "Contact Us": "تواصل معنا",
    info: "معلومات عامة",
    support: "الدعم الفني",
    sales: "المبيعات",
    "For general inquiries and information about our services": "للاستفسارات العامة والمعلومات حول خدماتنا",
    "For technical support and troubleshooting": "للدعم الفني وحل المشكلات التقنية",
    "For sales inquiries and quotations": "لاستفسارات المبيعات وطلب عروض الأسعار",
  },
};
