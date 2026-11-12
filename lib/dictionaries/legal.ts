import type { Locale } from "@/lib/i18n";

/** A block inside a legal section. */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "email"; label: string; email: string };

export interface LegalDoc {
  title: string;
  intro: string;
  sections: { title: string; blocks: LegalBlock[] }[];
}

const p = (text: string): LegalBlock => ({ type: "p", text });
const h3 = (text: string): LegalBlock => ({ type: "h3", text });
const list = (...items: string[]): LegalBlock => ({ type: "list", items });
const email = (label: string): LegalBlock => ({ type: "email", label, email: "info@axuraa.com" });

/* ============================== Privacy ============================== */
const privacyEn: LegalDoc = {
  title: "Privacy Policy",
  intro:
    "This Privacy Policy explains how we collect, use, store, process, and protect your personal information when you use our website, services, or contact us. By using our website, you agree to the practices described in this Privacy Policy.",
  sections: [
    {
      title: "1. Information We Collect",
      blocks: [
        p("We may collect the following types of information:"),
        h3("1.1 Information you provide directly:"),
        list("Name", "Email address", "Phone number", "Company or project details", "Any information you submit through contact forms or email"),
        h3("1.2 Information collected automatically:"),
        p("When you visit our website, we may collect:"),
        list("IP address", "Browser type and version", "Device information", "Pages visited and usage behavior", "Cookies, tracking technologies, and similar technologies"),
      ],
    },
    {
      title: "2. How We Use Your Information",
      blocks: [
        p("We use your information to:"),
        list(
          "Respond to inquiries and communicate with you",
          "Provide and manage our software services",
          "Understand project requirements",
          "Improve our website and services",
          "Maintain security, detect fraud, and prevent misuse",
        ),
      ],
    },
    {
      title: "3. Legal Basis for Processing Data",
      blocks: [
        p("We process your personal data only when permitted by applicable laws and regulations, based on:"),
        list("Your consent", "Our legitimate business interests", "Legal and regulatory obligations"),
      ],
    },
    {
      title: "4. Data Sharing",
      blocks: [
        p("We do not sell, rent, or trade your personal data to third parties for marketing purposes."),
        p("We may share your data only with:"),
        list(
          "Trusted service providers (e.g., hosting, analytics tools)",
          "Clients or partners when required for project delivery",
          "Legal authorities if required by law",
        ),
        p("All third parties are required to handle your data securely."),
        p("We may also disclose information if necessary to protect our legal rights, enforce our agreements, or prevent security threats or illegal activities."),
      ],
    },
    {
      title: "5. Data Retention",
      blocks: [
        p("We keep your personal data only for as long as necessary to:"),
        list("Provide our services", "Maintain business records", "Comply with legal obligations"),
        p("After that, your data is securely deleted, anonymized, or archived where legally required."),
      ],
    },
    {
      title: "6. Your Rights",
      blocks: [
        p("You have the right to:"),
        list(
          "Access the personal data we hold about you",
          "Request correction of inaccurate data",
          "Request deletion of your data",
          "Object to processing of your data",
          "Request limitation of data usage",
        ),
        p("To exercise these rights, contact us using the details below."),
      ],
    },
    {
      title: "7. Cookies",
      blocks: [
        p("Our website uses cookies to:"),
        list("Improve user experience", "Analyze website traffic", "Enhance website performance"),
        p("You can manage or disable cookies through your browser settings, but some parts of the website may not function properly."),
      ],
    },
    {
      title: "8. Data Security",
      blocks: [
        p("We use appropriate technical and organizational measures to protect your data against:"),
        list("Unauthorized access", "Loss or misuse", "Alteration or disclosure"),
        p("However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security."),
      ],
    },
    {
      title: "9. Third-Party Services",
      blocks: [
        p("We may use third-party services (such as hosting or analytics providers). These services may collect, store, and process data according to their own privacy policies, and we encourage users to review those policies."),
      ],
    },
    {
      title: "10. Changes to This Policy",
      blocks: [
        p("We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date, and continued use of the website constitutes acceptance of those changes."),
      ],
    },
    {
      title: "11. Contact Us",
      blocks: [p("If you have any questions about this Privacy Policy, you can contact us:"), email("Email:")],
    },
  ],
};

const privacyAr: LegalDoc = {
  title: "سياسة الخصوصية",
  intro:
    "توضح سياسة الخصوصية هذه كيف نجمع معلوماتك الشخصية ونستخدمها ونخزنها ونعالجها ونحميها عند استخدامك لموقعنا الإلكتروني أو خدماتنا أو عند تواصلك معنا. باستخدامك لموقعنا، فإنك توافق على الممارسات الموضحة في هذه السياسة.",
  sections: [
    {
      title: "1. المعلومات التي نجمعها",
      blocks: [
        p("قد نجمع الأنواع التالية من المعلومات:"),
        h3("1.1 معلومات تقدمها لنا مباشرة:"),
        list("الاسم", "عنوان البريد الإلكتروني", "رقم الهاتف", "بيانات الشركة أو المشروع", "أي معلومات ترسلها عبر نماذج التواصل أو البريد الإلكتروني"),
        h3("1.2 معلومات نجمعها تلقائيًا:"),
        p("عند زيارتك لموقعنا، قد نجمع:"),
        list("عنوان IP", "نوع المتصفح وإصداره", "معلومات الجهاز", "الصفحات التي تزورها وسلوك الاستخدام", "ملفات تعريف الارتباط (الكوكيز) وتقنيات التتبع والتقنيات المشابهة"),
      ],
    },
    {
      title: "2. كيف نستخدم معلوماتك",
      blocks: [
        p("نستخدم معلوماتك من أجل:"),
        list(
          "الرد على استفساراتك والتواصل معك",
          "تقديم خدماتنا البرمجية وإدارتها",
          "فهم متطلبات المشروعات",
          "تحسين موقعنا وخدماتنا",
          "الحفاظ على الأمان واكتشاف الاحتيال ومنع إساءة الاستخدام",
        ),
      ],
    },
    {
      title: "3. الأساس القانوني لمعالجة البيانات",
      blocks: [
        p("لا نعالج بياناتك الشخصية إلا بالقدر الذي تسمح به القوانين واللوائح المعمول بها، وذلك استنادًا إلى:"),
        list("موافقتك", "مصالحنا التجارية المشروعة", "الالتزامات القانونية والتنظيمية"),
      ],
    },
    {
      title: "4. مشاركة البيانات",
      blocks: [
        p("لا نبيع بياناتك الشخصية أو نؤجرها أو نتاجر بها مع أطراف ثالثة لأغراض تسويقية."),
        p("قد نشارك بياناتك فقط مع:"),
        list(
          "مزودي خدمات موثوقين (مثل خدمات الاستضافة وأدوات التحليل)",
          "العملاء أو الشركاء عندما يتطلب ذلك تنفيذ المشروع",
          "الجهات القانونية إذا اقتضى القانون ذلك",
        ),
        p("ويلتزم جميع هذه الأطراف بالتعامل مع بياناتك بشكل آمن."),
        p("وقد نفصح عن المعلومات أيضًا إذا لزم الأمر لحماية حقوقنا القانونية، أو تنفيذ اتفاقياتنا، أو منع التهديدات الأمنية أو الأنشطة غير القانونية."),
      ],
    },
    {
      title: "5. الاحتفاظ بالبيانات",
      blocks: [
        p("نحتفظ ببياناتك الشخصية فقط للمدة اللازمة من أجل:"),
        list("تقديم خدماتنا", "الاحتفاظ بسجلات الأعمال", "الامتثال للالتزامات القانونية"),
        p("وبعد ذلك تُحذف بياناتك بشكل آمن، أو يُزال ما يدل على هويتك، أو تُؤرشف حيثما يقتضي القانون ذلك."),
      ],
    },
    {
      title: "6. حقوقك",
      blocks: [
        p("يحق لك:"),
        list(
          "الاطلاع على البيانات الشخصية التي نحتفظ بها عنك",
          "طلب تصحيح البيانات غير الدقيقة",
          "طلب حذف بياناتك",
          "الاعتراض على معالجة بياناتك",
          "طلب تقييد استخدام بياناتك",
        ),
        p("لممارسة هذه الحقوق، تواصل معنا عبر البيانات الموضحة أدناه."),
      ],
    },
    {
      title: "7. ملفات تعريف الارتباط (الكوكيز)",
      blocks: [
        p("يستخدم موقعنا ملفات تعريف الارتباط من أجل:"),
        list("تحسين تجربة المستخدم", "تحليل حركة الزيارات على الموقع", "تحسين أداء الموقع"),
        p("يمكنك إدارة ملفات تعريف الارتباط أو تعطيلها من إعدادات المتصفح، لكن قد لا تعمل بعض أجزاء الموقع بشكل صحيح."),
      ],
    },
    {
      title: "8. أمن البيانات",
      blocks: [
        p("نتخذ إجراءات تقنية وتنظيمية مناسبة لحماية بياناتك من:"),
        list("الوصول غير المصرح به", "الفقد أو إساءة الاستخدام", "التعديل أو الإفصاح"),
        p("ومع ذلك، لا توجد وسيلة نقل عبر الإنترنت أو تخزين إلكتروني آمنة تمامًا، ولا يمكننا ضمان الأمان المطلق."),
      ],
    },
    {
      title: "9. خدمات الأطراف الثالثة",
      blocks: [
        p("قد نستخدم خدمات تابعة لأطراف ثالثة (مثل مزودي الاستضافة أو التحليلات). وقد تجمع هذه الخدمات البيانات وتخزنها وتعالجها وفقًا لسياسات الخصوصية الخاصة بها، وننصح المستخدمين بمراجعة تلك السياسات."),
      ],
    },
    {
      title: "10. التغييرات على هذه السياسة",
      blocks: [
        p("قد نحدّث سياسة الخصوصية هذه من وقت لآخر. وسيتم نشر أي تغييرات على هذه الصفحة مع تاريخ سريان محدّث، ويُعد استمرارك في استخدام الموقع قبولًا لتلك التغييرات."),
      ],
    },
    {
      title: "11. تواصل معنا",
      blocks: [p("إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا:"), email("البريد الإلكتروني:")],
    },
  ],
};

/* =============================== Terms =============================== */
const termsEn: LegalDoc = {
  title: "Terms of Service",
  intro: "Welcome to Axuraa. By accessing or using our website and services, you agree to the following Terms of Service.",
  sections: [
    {
      title: "1. Services",
      blocks: [
        p("Axuraa is a software development company providing web, mobile, and digital solutions. All services are provided based on separate written agreements, proposals, or contracts with clients."),
      ],
    },
    {
      title: "2. Use of the Website",
      blocks: [
        p("You agree not to:"),
        list(
          "Use the website for any illegal purpose",
          "Attempt to gain unauthorized access",
          "Disrupt or interfere with the website",
          "Upload or share harmful or misleading content",
        ),
      ],
    },
    {
      title: "3. Intellectual Property",
      blocks: [
        p("All content on this website, including text, graphics, logos, and code, is the property of Axuraa and is protected by applicable laws."),
        p("You may not copy, reproduce, distribute, modify, or use any content for commercial purposes without prior written consent from Axuraa."),
      ],
    },
    {
      title: "4. Disclaimer of Warranty",
      blocks: [
        p("All services and materials are provided “as is” without warranties of any kind."),
        p("Axuraa does not guarantee that the website, services, or servers will be uninterrupted, secure, error-free, or free from harmful components."),
      ],
    },
    {
      title: "5. Limitation of Liability",
      blocks: [
        p("To the maximum extent permitted by law, Axuraa shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities."),
      ],
    },
    {
      title: "6. User Conduct",
      blocks: [
        p("You agree to use the website responsibly and not to:"),
        list("Violate any laws", "Impersonate others", "Send spam or harmful content", "Misuse any part of the service"),
      ],
    },
    {
      title: "7. Third-Party Links",
      blocks: [
        p("Our website may contain links to third-party websites. Axuraa is not responsible for the content, availability, security, or privacy practices of these external sites."),
      ],
    },
    { title: "8. Data and Privacy", blocks: [p("Your use of our services is also governed by our Privacy Policy.")] },
    {
      title: "9. Termination",
      blocks: [p("We reserve the right to suspend, restrict, or terminate access to our website or services if these Terms are violated.")],
    },
    {
      title: "10. Changes to Terms",
      blocks: [p("We may update these Terms at any time. Continued use of the website after updates become effective means acceptance of the updated Terms.")],
    },
    { title: "11. Governing Law", blocks: [p("These Terms are governed by the laws of the Arab Republic of Egypt.")] },
    { title: "12. Contact Us", blocks: [p("If you have any questions:"), email("Email:")] },
  ],
};

const termsAr: LegalDoc = {
  title: "شروط الخدمة",
  intro: "مرحبًا بك في Axuraa. بدخولك إلى موقعنا أو استخدامك لخدماتنا، فإنك توافق على شروط الخدمة التالية.",
  sections: [
    {
      title: "1. الخدمات",
      blocks: [
        p("Axuraa شركة متخصصة في تطوير البرمجيات، تقدم حلولًا للويب والجوال والحلول الرقمية. وتُقدَّم جميع الخدمات بناءً على اتفاقيات أو عروض أو عقود مكتوبة منفصلة مع العملاء."),
      ],
    },
    {
      title: "2. استخدام الموقع",
      blocks: [
        p("توافق على عدم:"),
        list(
          "استخدام الموقع لأي غرض غير قانوني",
          "محاولة الوصول غير المصرح به",
          "تعطيل الموقع أو التدخل في عمله",
          "رفع أو مشاركة محتوى ضار أو مضلل",
        ),
      ],
    },
    {
      title: "3. الملكية الفكرية",
      blocks: [
        p("جميع المحتويات على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والأكواد، مملوكة لشركة Axuraa ومحمية بموجب القوانين المعمول بها."),
        p("لا يجوز نسخ أي محتوى أو إعادة إنتاجه أو توزيعه أو تعديله أو استخدامه لأغراض تجارية دون الحصول على موافقة كتابية مسبقة من Axuraa."),
      ],
    },
    {
      title: "4. إخلاء المسؤولية عن الضمانات",
      blocks: [
        p("تُقدَّم جميع الخدمات والمواد «كما هي» دون أي ضمانات من أي نوع."),
        p("لا تضمن Axuraa أن يعمل الموقع أو الخدمات أو الخوادم دون انقطاع، أو أن تكون آمنة أو خالية من الأخطاء أو من أي مكونات ضارة."),
      ],
    },
    {
      title: "5. حدود المسؤولية",
      blocks: [
        p("إلى أقصى حد يسمح به القانون، لا تتحمل Axuraa المسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو تأديبية، بما في ذلك خسارة الأرباح أو البيانات أو فرص العمل."),
      ],
    },
    {
      title: "6. سلوك المستخدم",
      blocks: [
        p("توافق على استخدام الموقع بمسؤولية وعدم:"),
        list("مخالفة أي قوانين", "انتحال شخصية الآخرين", "إرسال رسائل مزعجة أو محتوى ضار", "إساءة استخدام أي جزء من الخدمة"),
      ],
    },
    {
      title: "7. روابط الأطراف الثالثة",
      blocks: [
        p("قد يحتوي موقعنا على روابط لمواقع تابعة لأطراف ثالثة، ولا تتحمل Axuraa المسؤولية عن محتوى هذه المواقع الخارجية أو توفرها أو أمانها أو ممارسات الخصوصية فيها."),
      ],
    },
    { title: "8. البيانات والخصوصية", blocks: [p("يخضع استخدامك لخدماتنا أيضًا لسياسة الخصوصية الخاصة بنا.")] },
    {
      title: "9. إنهاء الاستخدام",
      blocks: [p("نحتفظ بالحق في تعليق الوصول إلى موقعنا أو خدماتنا أو تقييده أو إنهائه في حال مخالفة هذه الشروط.")],
    },
    {
      title: "10. التغييرات على الشروط",
      blocks: [p("قد نحدّث هذه الشروط في أي وقت، ويُعد استمرارك في استخدام الموقع بعد سريان التحديثات قبولًا للشروط المحدّثة.")],
    },
    { title: "11. القانون الحاكم", blocks: [p("تخضع هذه الشروط لقوانين جمهورية مصر العربية.")] },
    { title: "12. تواصل معنا", blocks: [p("إذا كانت لديك أي أسئلة:"), email("البريد الإلكتروني:")] },
  ],
};

const LEGAL: Record<Locale, { privacy: LegalDoc; terms: LegalDoc }> = {
  en: { privacy: privacyEn, terms: termsEn },
  ar: { privacy: privacyAr, terms: termsAr },
};

/** Legal page content (server-only module: keeps long texts out of client bundles). */
export const getLegalDoc = (doc: "privacy" | "terms", locale: Locale): LegalDoc => LEGAL[locale]?.[doc] ?? LEGAL.en[doc];
