"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ContactForm.module.css";
import { ContactRequest, FormErrors } from "@/types/Generals/contactForm";
import { create } from "@/service/Contact/contactServices";
import useDictionary from "@/hooks/useDictionary";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  Layers,
  Loader2,
  Mail,
  Phone,
  Send,
  User,
} from "lucide-react";

// Backend values for "Services of Interest" (labels come from the dictionary).
const SERVICE_VALUES = ["ERP", "E_commerce", "Website", "Mobile_App", "Cloud_Migration", "AI_Integration"] as const;

const ContactForm = () => {
  const { t } = useDictionary();
  const f = t.form;
  const serviceOptions = SERVICE_VALUES.map((value) => ({ value, label: f.serviceOptions[value] }));

  const [formData, setFormData] = useState<ContactRequest>({
    full_name: "",
    email: "",
    phone_number: "",
    services_interest: [],
    message: "",
  });

  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [errors, setErrors] = useState<FormErrors>({});
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
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = f.errors.fullName;
    }

    // Validate based on selected contact method
    if (contactMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email?.trim()) {
        newErrors.email = f.errors.email;
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = f.errors.emailInvalid;
      }
    } else {
      const digits = formData.phone_number?.replace(/\D/g, "") ?? "";
      if (!formData.phone_number?.trim()) {
        newErrors.phone_number = f.errors.phone;
      } else if (!/^\+?[\d\s\-().]+$/.test(formData.phone_number) || digits.length < 7 || digits.length > 15) {
        newErrors.phone_number = f.errors.phoneInvalid;
      }
    }

    if (formData.services_interest.length === 0) {
      newErrors.services_interest = f.errors.services;
    }

    if (!formData.message.trim()) {
      newErrors.message = f.errors.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
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
        full_name: formData.full_name.trim(),
        services_interest: formData.services_interest,
        message: formData.message.trim(),
      };

      if (contactMethod === 'email') {
        submitData.email = formData.email?.trim();
      } else {
        submitData.phone_number = formData.phone_number?.trim();
      }

      const response = await create(submitData);

      if (response.success) {
        setSubmitStatus({
          type: "success",
          message: f.success,
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
        }, 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            f.failure,
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: f.unexpected,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDisplayText = () => {
    if (formData.services_interest.length === 0) {
      return f.selectServices;
    }
    if (formData.services_interest.length === 1) {
      const service = serviceOptions.find(
        (s) => s.value === formData.services_interest[0],
      );
      return service?.label || formData.services_interest[0];
    }
    return f.servicesSelected(formData.services_interest.length);
  };

  const ContactIcon = contactMethod === "email" ? Mail : Phone;

  return (
    <div className={styles.contactForm}>
      <span className={styles.circleBackground} aria-hidden="true" />
      <span className={styles.texture} aria-hidden="true" />

      {submitStatus.type && (
        <div
          role={submitStatus.type === "success" ? "status" : "alert"}
          className={submitStatus.type === "success" ? styles.successMessage : styles.errorMessage}
        >
          {submitStatus.type === "success" ? (
            <CheckCircle2 size={18} aria-hidden="true" />
          ) : (
            <AlertCircle size={18} aria-hidden="true" />
          )}
          <span>{submitStatus.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Full name */}
        <div className={styles.formGroup}>
          <label htmlFor="full_name" className={styles.label}>
            {f.fullName}
          </label>
          <div className={`${styles.control} ${errors.full_name ? styles.controlError : ""}`}>
            <User className={styles.inputIcon} size={18} aria-hidden="true" />
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder={f.fullNamePlaceholder}
              autoComplete="name"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.full_name)}
            />
          </div>
          {errors.full_name && <span className={styles.errorText}>{errors.full_name}</span>}
        </div>

        {/* Preferred contact method */}
        <div className={styles.formGroup}>
          <span className={styles.label} id="contact-method-label">
            {f.contactMethod}
          </span>
          <div
            className={`${styles.segmented} ${contactMethod === "phone" ? styles.segmentedPhone : ""}`}
            role="radiogroup"
            aria-labelledby="contact-method-label"
          >
            <span className={styles.segmentThumb} aria-hidden="true" />
            <label className={styles.segment}>
              <input
                type="radio"
                name="contactMethod"
                value="email"
                className={styles.radioInput}
                checked={contactMethod === "email"}
                onChange={() => handleContactMethodChange("email")}
                disabled={isSubmitting}
              />
              <Mail size={16} aria-hidden="true" />
              <span>{f.email}</span>
            </label>
            <label className={styles.segment}>
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                className={styles.radioInput}
                checked={contactMethod === "phone"}
                onChange={() => handleContactMethodChange("phone")}
                disabled={isSubmitting}
              />
              <Phone size={16} aria-hidden="true" />
              <span>{f.phone}</span>
            </label>
          </div>
          <div
            className={`${styles.control} ${errors.email || errors.phone_number ? styles.controlError : ""}`}
          >
            <ContactIcon className={styles.inputIcon} size={18} aria-hidden="true" />
            {contactMethod === "email" ? (
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder={f.emailPlaceholder}
                autoComplete="email"
                aria-label={f.email}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
              />
            ) : (
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder={f.phonePlaceholder}
                autoComplete="tel"
                aria-label={f.phoneNumber}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.phone_number)}
              />
            )}
          </div>
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          {errors.phone_number && <span className={styles.errorText}>{errors.phone_number}</span>}
        </div>

        {/* Services of interest */}
        <div className={styles.formGroup}>
          <span id="services-label" className={styles.label}>
            {f.services}
          </span>
          <div className={styles.selectWrapper} ref={dropdownRef}>
            <button
              type="button"
              id="services"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-labelledby="services-label services"
              disabled={isSubmitting}
              className={`${styles.control} ${styles.selectControl} ${isDropdownOpen ? styles.controlOpen : ""} ${errors.services_interest ? styles.controlError : ""}`}
              onClick={() => setIsDropdownOpen((open) => !open)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsDropdownOpen(false);
              }}
            >
              <Layers className={styles.inputIcon} size={18} aria-hidden="true" />
              <span
                className={`${styles.selectText} ${formData.services_interest.length === 0 ? styles.placeholder : ""}`}
              >
                {getDisplayText()}
              </span>
              {formData.services_interest.length > 1 && (
                <span className={styles.countBadge}>{formData.services_interest.length}</span>
              )}
              <ChevronDown
                className={`${styles.selectArrow} ${isDropdownOpen ? styles.selectArrowOpen : ""}`}
                size={18}
                aria-hidden="true"
              />
            </button>
            {isDropdownOpen && (
              <div
                className={styles.dropdownMenu}
                role="group"
                aria-labelledby="services-label"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsDropdownOpen(false);
                }}
              >
                {serviceOptions.map((service) => {
                  const checked = formData.services_interest.includes(service.value);
                  return (
                    <label
                      key={service.value}
                      className={`${styles.dropdownItem} ${checked ? styles.dropdownItemChecked : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleServiceToggle(service.value)}
                        disabled={isSubmitting}
                        className={styles.checkboxInput}
                      />
                      <span className={styles.checkmark} aria-hidden="true">
                        <Check size={13} strokeWidth={3} />
                      </span>
                      <span className={styles.serviceText}>{service.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
          {errors.services_interest && (
            <span className={styles.errorText}>{errors.services_interest}</span>
          )}
        </div>

        {/* Message */}
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            {f.message}
          </label>
          <div className={`${styles.control} ${styles.textareaControl} ${errors.message ? styles.controlError : ""}`}>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`${styles.inputField} ${styles.textarea}`}
              placeholder={f.messagePlaceholder}
              rows={5}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.message)}
            />
          </div>
          {errors.message && <span className={styles.errorText}>{errors.message}</span>}
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          <span className={styles.submitLabel}>{isSubmitting ? f.sending : f.send}</span>
          <span className={styles.submitIcon} aria-hidden="true">
            {isSubmitting ? (
              <Loader2 size={18} className={styles.spin} />
            ) : (
              <Send size={18} className={styles.plane} />
            )}
          </span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;