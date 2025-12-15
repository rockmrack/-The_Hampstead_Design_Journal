'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  projectType: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('loading');

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        projectType: '',
      });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-hampstead-cream border-b border-hampstead-grey py-16 md:py-24">
        <div className="editorial-container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-hampstead-charcoal/80 leading-relaxed">
              Whether you have questions about a project, want to collaborate on editorial content, 
              or simply wish to say hello, we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="editorial-container">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl mb-8">Contact Details</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-hampstead-cream rounded-sm">
                    <MapPin className="w-5 h-5 text-hampstead-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-hampstead-charcoal/70 leading-relaxed">
                      250 Finchley Road<br />
                      London NW3 6DN
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-hampstead-cream rounded-sm">
                    <Phone className="w-5 h-5 text-hampstead-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a href="tel:+442073947400" className="text-hampstead-charcoal/70 hover:text-hampstead-black transition-colors">
                      +44 (0)20 7394 7400
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-hampstead-cream rounded-sm">
                    <Mail className="w-5 h-5 text-hampstead-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a href="mailto:editor@hampsteaddesignjournal.com" className="text-hampstead-charcoal/70 hover:text-hampstead-black transition-colors">
                      editor@hampsteaddesignjournal.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-hampstead-cream rounded-sm">
                    <Clock className="w-5 h-5 text-hampstead-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office Hours</h3>
                    <p className="text-hampstead-charcoal/70 leading-relaxed">
                      Monday – Friday<br />
                      9:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-hampstead-cream border border-hampstead-grey">
                <h3 className="font-serif text-xl mb-3">Project Enquiries</h3>
                <p className="text-hampstead-charcoal/70 text-sm leading-relaxed">
                  For renovation and restoration consultations, please visit our parent company 
                  <a href="https://hampsteadrenovations.com" className="underline hover:text-hampstead-black ml-1" target="_blank" rel="noopener noreferrer">
                    Hampstead Renovations
                  </a>.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <h2 className="font-serif text-3xl mb-8">Send a Message</h2>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-50 border border-green-200 p-8 text-center"
                  >
                    <Check className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-serif text-2xl mb-2">Message Sent</h3>
                    <p className="text-green-800 mb-6">
                      Thank you for reaching out. We&apos;ll respond within 24-48 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-sm uppercase tracking-widest text-green-700 hover:text-green-900 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={cn(
                            "w-full px-4 py-3 border focus:outline-none focus:border-hampstead-black transition-colors",
                            errors.name ? "border-red-300" : "border-hampstead-grey"
                          )}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={cn(
                            "w-full px-4 py-3 border focus:outline-none focus:border-hampstead-black transition-colors",
                            errors.email ? "border-red-300" : "border-hampstead-grey"
                          )}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-hampstead-grey focus:outline-none focus:border-hampstead-black transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                          Enquiry Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-hampstead-grey focus:outline-none focus:border-hampstead-black transition-colors bg-white"
                        >
                          <option value="">Select an option</option>
                          <option value="editorial">Editorial Collaboration</option>
                          <option value="advertising">Advertising & Sponsorship</option>
                          <option value="subscription">Subscription Query</option>
                          <option value="project">Project Consultation</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject (optional)
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-hampstead-grey focus:outline-none focus:border-hampstead-black transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className={cn(
                          "w-full px-4 py-3 border focus:outline-none focus:border-hampstead-black transition-colors resize-none",
                          errors.message ? "border-red-300" : "border-hampstead-grey"
                        )}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {status === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>Something went wrong. Please try again.</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex items-center justify-center px-8 py-4 bg-hampstead-black text-hampstead-white hover:bg-hampstead-charcoal transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
                    >
                      {status === 'loading' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          <span className="uppercase tracking-widest text-sm">Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}