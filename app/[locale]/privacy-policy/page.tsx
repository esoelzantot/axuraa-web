"use client";

import React from 'react';
import styles from './privacy-policy.module.css';

const BulletIcon = () => (
    <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1.66675C5.4 1.66675 1.66666 5.40008 1.66666 10.0001C1.66666 14.6001 5.4 18.3334 10 18.3334C14.6 18.3334 18.3333 14.6001 18.3333 10.0001C18.3333 5.40008 14.6 1.66675 10 1.66675ZM8.33333 15L3.33333 10.0001L4.55 8.78341L8.33333 12.5584L15.45 5.44175L16.6667 6.66675L8.33333 15Z" fill="#D04A1D"/>
    </svg>
);

export default function PrivacyPolicyPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.mainTitle}>Privacy Policy</h1>
                <p className={styles.introText}>
                    This Privacy Policy explains how we collect, use, store, process, and protect your personal information when you use our website, services, or contact us. By using our website, you agree to the practices described in this Privacy Policy.
                </p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                    <p className={styles.paragraph}>We may collect the following types of information:</p>
                    
                    <h3 className={styles.subTitle}>1.1 Information you provide directly:</h3>
                    <div className={styles.list}>
                        {['Name', 'Email address', 'Phone number', 'Company or project details', 'Any information you submit through contact forms or email'].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>

                    <h3 className={styles.subTitle}>1.2 Information collected automatically:</h3>
                    <p className={styles.paragraph}>When you visit our website, we may collect:</p>
                    <div className={styles.list}>
                        {['IP address', 'Browser type and version', 'Device information', 'Pages visited and usage behavior', 'Cookies, tracking technologies, and similar technologies'].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                    <p className={styles.paragraph}>We use your information to:</p>
                    <div className={styles.list}>
                        {['Respond to inquiries and communicate with you', 'Provide and manage our software services', 'Understand project requirements', 'Improve our website and services', 'Maintain security, detect fraud, and prevent misuse'].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Legal Basis for Processing Data</h2>
                    <p className={styles.paragraph}>We process your personal data only when permitted by applicable laws and regulations, based on:</p>
                    <div className={styles.list}>
                        {['Your consent', 'Our legitimate business interests', 'Legal and regulatory obligations'].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Data Sharing</h2>
                    <p className={styles.paragraph}>We do not sell, rent, or trade your personal data to third parties for marketing purposes.</p>
                    <p className={styles.paragraph}>We may share your data only with:</p>
                    <div className={styles.list}>
                        {['Trusted service providers (e.g., hosting, analytics tools)', 'Clients or partners when required for project delivery', 'Legal authorities if required by law'].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className={styles.paragraph}>All third parties are required to handle your data securely.</p>
                    <p className={styles.paragraph}>We may also disclose information if necessary to protect our legal rights, enforce our agreements, or prevent security threats or illegal activities.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Data Retention</h2>
                    <p className={styles.paragraph}>We keep your personal data only for as long as necessary to:</p>
                    <div className={styles.list}>
                        {['Provide our services', 'Maintain business records', 'Comply with legal obligations'].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className={styles.paragraph}>After that, your data is securely deleted, anonymized, or archived where legally required.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Your Rights</h2>
                    <p className={styles.paragraph}>You have the right to:</p>
                    <div className={styles.list}>
                        {['Access the personal data we hold about you', 'Request correction of inaccurate data', 'Request deletion of your data', 'Object to processing of your data', 'Request limitation of data usage'].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className={styles.paragraph}>To exercise these rights, contact us using the details below.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Cookies</h2>
                    <p className={styles.paragraph}>Our website uses cookies to:</p>
                    <div className={styles.list}>
                        {['Improve user experience', 'Analyze website traffic', 'Enhance website performance'].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className={styles.paragraph}>You can manage or disable cookies through your browser settings, but some parts of the website may not function properly.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Data Security</h2>
                    <p className={styles.paragraph}>We use appropriate technical and organizational measures to protect your data against:</p>
                    <div className={styles.list}>
                        {['Unauthorized access', 'Loss or misuse', 'Alteration or disclosure'].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                    <p className={styles.paragraph}>However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>9. Third-Party Services</h2>
                    <p className={styles.paragraph}>We may use third-party services (such as hosting or analytics providers). These services may collect, store, and process data according to their own privacy policies, and we encourage users to review those policies.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>10. Changes to This Policy</h2>
                    <p className={styles.paragraph}>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date, and continued use of the website constitutes acceptance of those changes.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>11. Contact Us</h2>
                    <p className={styles.paragraph}>If you have any questions about this Privacy Policy, you can contact us:</p>
                    <p className={styles.paragraph}>Email: <a href="mailto:info@axuraa.com" className={styles.contactLink}>info@axuraa.com</a></p>
                </section>
            </div>
        </div>
    );
}
