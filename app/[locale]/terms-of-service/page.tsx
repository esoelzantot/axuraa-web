"use client";

import React from 'react';
import styles from './terms-of-service.module.css';

const BulletIcon = () => (
    <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1.66675C5.4 1.66675 1.66666 5.40008 1.66666 10.0001C1.66666 14.6001 5.4 18.3334 10 18.3334C14.6 18.3334 18.3333 14.6001 18.3333 10.0001C18.3333 5.40008 14.6 1.66675 10 1.66675ZM8.33333 15L3.33333 10.0001L4.55 8.78341L8.33333 12.5584L15.45 5.44175L16.6667 6.66675L8.33333 15Z" fill="#D04A1D"/>
    </svg>
);

export default function TermsOfServicePage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentWrapper}>
                <h1 className={styles.mainTitle}>Terms of Service</h1>
                <p className={styles.introText}>
                    Welcome to Axuraa. By accessing or using our website and services, you agree to the following Terms of Service.
                </p>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Services</h2>
                    <p className={styles.paragraph}>
                        Axuraa is a software development company providing web, mobile, and digital solutions. All services are provided based on separate written agreements, proposals, or contracts with clients.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Use of the Website</h2>
                    <p className={styles.paragraph}>You agree not to:</p>
                    <div className={styles.list}>
                        {[
                            'Use the website for any illegal purpose',
                            'Attempt to gain unauthorized access',
                            'Disrupt or interfere with the website',
                            'Upload or share harmful or misleading content'
                        ].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. Intellectual Property</h2>
                    <p className={styles.paragraph}>
                        All content on this website, including text, graphics, logos, and code, is the property of Axuraa and is protected by applicable laws.
                    </p>
                    <p className={styles.paragraph}>
                        You may not copy, reproduce, distribute, modify, or use any content for commercial purposes without prior written consent from Axuraa.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Disclaimer of Warranty</h2>
                    <p className={styles.paragraph}>
                        All services and materials are provided “as is” without warranties of any kind.
                    </p>
                    <p className={styles.paragraph}>
                        Axuraa does not guarantee that the website, services, or servers will be uninterrupted, secure, error-free, or free from harmful components.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Limitation of Liability</h2>
                    <p className={styles.paragraph}>
                        To the maximum extent permitted by law, Axuraa shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. User Conduct</h2>
                    <p className={styles.paragraph}>You agree to use the website responsibly and not to:</p>
                    <div className={styles.list}>
                        {[
                            'Violate any laws',
                            'Impersonate others',
                            'Send spam or harmful content',
                            'Misuse any part of the service'
                        ].map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                <BulletIcon />
                                <span className={styles.itemText}>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Third-Party Links</h2>
                    <p className={styles.paragraph}>
                        Our website may contain links to third-party websites. Axuraa is not responsible for the content, availability, security, or privacy practices of these external sites.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Data and Privacy</h2>
                    <p className={styles.paragraph}>
                        Your use of our services is also governed by our Privacy Policy.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>9. Termination</h2>
                    <p className={styles.paragraph}>
                        We reserve the right to suspend, restrict, or terminate access to our website or services if these Terms are violated.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>10. Changes to Terms</h2>
                    <p className={styles.paragraph}>
                        We may update these Terms at any time. Continued use of the website after updates become effective means acceptance of the updated Terms.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>11. Governing Law</h2>
                    <p className={styles.paragraph}>
                        These Terms are governed by the laws of the Arab Republic of Egypt.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>12. Contact Us</h2>
                    <p className={styles.paragraph}>If you have any questions:</p>
                    <p className={styles.paragraph}>Email: <a href="mailto:info@axuraa.com" className={styles.contactLink}>info@axuraa.com</a></p>
                </section>
            </div>
        </div>
    );
}
