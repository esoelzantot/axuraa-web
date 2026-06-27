import { useState, useRef, useEffect } from "react";
import styles from "./ContactForm.module.css";
import { ContactRequest } from "@/types/Generals/contactForm";
import { create } from "@/service/Contact/contactServices";
import Image from "next/image";

//icons
import fullNameIcon from "../../../../public/assets/fullname.svg";
import emailIcon from "../../../../public/assets/Email.svg";
import servicesIcon from "../../../../public/assets/services.svg";
import chooseIcon from "../../../../public/assets/chose.svg";
import sendIcon from "../../../../public/assets/sendbuttom.svg";

const ContactForm = () => {
  // Service options with proper backend values matching existing API data
  const serviceOptions = [
    { value: "ERP", label: "ERP" },
    { value: "E_commerce", label: "E-commerce" },
    { value: "Website", label: "Website" },
    { value: "Mobile_App", label: "Mobile App" },
    { value: "Cloud_Migration", label: "Cloud Migration" },
    { value: "AI_Integration", label: "AI Integration" },
  ];

  const [formData, setFormData] = useState<ContactRequest>({
    full_name: "",
    email: "",
    phone_number: "",
    services_interest: [],
    message: "",
  });

  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [errors, setErrors] = useState<Partial<ContactRequest>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactRequest> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    // Validate based on selected contact method
    if (contactMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else {
      if (!formData.phone_number?.trim()) {
        newErrors.phone_number = "Phone number is required";
      }
    }

    if (formData.services_interest.length === 0) {
      newErrors.services_interest = ["Please select at least one service"];
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactRequest]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContactMethodChange = (method: 'email' | 'phone') => {
    setContactMethod(method);
    // Clear errors for contact fields when switching
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.email;
      delete newErrors.phone_number;
      return newErrors;
    });
  };

  const handleServiceToggle = (serviceValue: string) => {
    setFormData((prev) => {
      const newServices = prev.services_interest.includes(serviceValue)
        ? prev.services_interest.filter((s) => s !== serviceValue)
        : [...prev.services_interest, serviceValue];

      console.log("Service toggled:", serviceValue);
      console.log("New services array:", newServices);

      return { ...prev, services_interest: newServices };
    });

    if (errors.services_interest) {
      setErrors((prev) => ({ ...prev, services_interest: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Prepare submission data based on contact method
      const submitData: ContactRequest = {
        full_name: formData.full_name,
        services_interest: formData.services_interest,
        message: formData.message,
      };

      if (contactMethod === 'email') {
        submitData.email = formData.email;
      } else {
        submitData.phone_number = formData.phone_number;
      }

      console.log("Submitting data:", submitData);
      console.log("Services being sent:", submitData.services_interest);
      console.log(
        "Services detail:",
        JSON.stringify(submitData.services_interest, null, 2),
      );

      const response = await create(submitData);

      if (response.success) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          full_name: "",
          email: "",
          phone_number: "",
          services_interest: [],
          message: "",
        });
        setTimeout(() => {
          setSubmitStatus({ type: null, message: "" });
        }, 2000);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            response.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDisplayText = () => {
    if (formData.services_interest.length === 0) {
      return "Select services";
    }
    if (formData.services_interest.length === 1) {
      const service = serviceOptions.find(
        (s) => s.value === formData.services_interest[0],
      );
      return service?.label || formData.services_interest[0];
    }
    return `${formData.services_interest.length} services selected`;
  };

  return (
    <div className={styles.contactForm}>
      <div className={styles.circleBackground}></div>

      {submitStatus.type && (
        <div
          className={
            submitStatus.type === "success"
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="full_name" className={styles.label}>
            Full Name
          </label>
          <div className={styles.inputWithIcon}>
            <Image
              src={fullNameIcon}
              alt="Name"
              width={20}
              height={20}
              className={styles.inputIcon}
            />
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className={`${styles.inputField} ${errors.full_name ? styles.inputError : ""}`}
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </div>
          {errors.full_name && (
            <span className={styles.errorText}>{errors.full_name}</span>
          )}
        </div>

        <div className={styles.formGroup1}>
          <label className={styles.label}>
            Preferred Contact Method 
          </label>
          <div className={styles.radio}>
            <label className={styles.radioGroup}>
              <input 
                type="radio" 
                name="contactMethod" 
                value="email" 
                className={styles.radioInput}
                checked={contactMethod === 'email'}
                onChange={() => handleContactMethodChange('email')}
                disabled={isSubmitting}
              />
              <span className={styles.radioLabel}>Email</span>
            </label>
            <label className={styles.radioGroup}>
              <input 
                type="radio" 
                name="contactMethod" 
                value="phone" 
                className={styles.radioInput}
                checked={contactMethod === 'phone'}
                onChange={() => handleContactMethodChange('phone')}
                disabled={isSubmitting}
              />
              <span className={styles.radioLabel}>Phone</span>
            </label>
          </div>
          <div className={styles.inputWithIcon}>
            <Image
              src={emailIcon}
              alt={contactMethod === 'email' ? 'Email' : 'Phone'}
              width={20}
              height={20}
              className={styles.inputIcon}
            />
            {contactMethod === 'email' ? (
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${styles.inputField} ${errors.email ? styles.inputError : ""}`}
                placeholder="john.doe@example.com"
                disabled={isSubmitting}
              />
            ) : (
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className={`${styles.inputField} ${errors.phone_number ? styles.inputError : ""}`}
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
              />
            )}
          </div>
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
          {errors.phone_number && (
            <span className={styles.errorText}>{errors.phone_number}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="services" className={styles.label}>
            Services of Interest 
          </label>
          <div className={`${styles.inputWithIcon} ${styles.selectWrapper}`} ref={dropdownRef}>
            <Image 
              src={servicesIcon} 
              alt="Services" 
              width={20} 
              height={20} 
              className={styles.inputIcon}
            />
            <div
              className={`${styles.selectField} ${styles.customSelect} ${isDropdownOpen ? styles.selectOpen : ""} ${errors.services_interest ? styles.inputError : ""}`}
              onClick={() =>
                !isSubmitting && setIsDropdownOpen(!isDropdownOpen)
              }
              style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
            >
              <span
                style={{
                  color:
                    formData.services_interest.length === 0
                      ? "#9CA3AF"
                      : "#ffffff",
                }}
              >
                {getDisplayText()}
              </span>
            </div>
            <Image 
              src={chooseIcon} 
              alt="Choose" 
              width={20} 
              height={20} 
              className={`${styles.selectArrow} ${isDropdownOpen ? styles.selectArrowOpen : ''}`}
            />
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {serviceOptions.map((service) => (
                  <label key={service.value} className={styles.dropdownItem}>
                    <input
                      type="checkbox"
                      checked={formData.services_interest.includes(
                        service.value,
                      )}
                      onChange={() => handleServiceToggle(service.value)}
                      disabled={isSubmitting}
                      className={styles.checkboxInput}
                    />
                    <span className={styles.checkmark}></span>
                    <span className={styles.serviceText}>{service.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {errors.services_interest && (
            <span className={styles.errorText}>{errors.services_interest}</span>
          )}
        </div>

        <div className={styles.formGroup2}>
          <label htmlFor="message" className={styles.label}>
            Message 
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={`${styles.inputField} ${styles.textarea} ${errors.message ? styles.inputError : ""}`}
            placeholder="Tell us about your project..."
            rows={5}
            disabled={isSubmitting}
          />
          {errors.message && (
            <span className={styles.errorText}>{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <Image 
            src={sendIcon} 
            alt="Send" 
            width={12.689} 
            height={10.685} 
            className={styles.sendIcon}
          />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;