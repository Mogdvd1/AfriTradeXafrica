import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Handshake, Play, Loader2, CheckCircle2 } from 'lucide-react';
import { sendEmail, EMAIL_ADDRESSES } from '../services/emailService';

export default function Contact() {
  const location = useLocation();
  const [subject, setSubject] = useState('General Inquiry');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.initialSubject) {
      setSubject(location.state.initialSubject);
    }
  }, [location.state]);

  const handleQuickAction = (newSubject: string) => {
    setSubject(newSubject);
    window.scrollTo({ top: document.getElementById('contact-form')?.offsetTop ? document.getElementById('contact-form')!.offsetTop - 100 : 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Determine which email to send to based on subject
      let toEmail = EMAIL_ADDRESSES.INFO;
      if (subject === 'Partnership Proposal') toEmail = EMAIL_ADDRESSES.SALES;
      if (subject === 'Training Request') toEmail = EMAIL_ADDRESSES.SUPPORT;
      if (subject === 'KYC Inquiry') toEmail = EMAIL_ADDRESSES.KYC;
      if (subject === 'Administrative') toEmail = EMAIL_ADDRESSES.ADMIN;
      if (subject === 'Specific Inquiry') toEmail = EMAIL_ADDRESSES.INQUIRY;

      await sendEmail({
        to: toEmail,
        subject: `${subject}: ${formData.name}`,
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${subject}\n\nMessage:\n${formData.message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
        `
      });

      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-charcoal py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8"
          >
            Get In <span className="text-gold">Touch</span>
          </motion.h1>
          <p className="text-soft-grey text-xl max-w-3xl mx-auto leading-relaxed">
            We are here to support miners, buyers, regulators, investors, and partners.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-jet-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Details</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-soft-grey uppercase tracking-widest mb-1">Email (General)</p>
                    <p className="text-xl font-bold">{EMAIL_ADDRESSES.INFO}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-soft-grey uppercase tracking-widest mb-1">Email (Support)</p>
                    <p className="text-xl font-bold">{EMAIL_ADDRESSES.SUPPORT}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-soft-grey uppercase tracking-widest mb-1">Email (KYC)</p>
                    <p className="text-xl font-bold">{EMAIL_ADDRESSES.KYC}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-soft-grey uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-xl font-bold">+260 974 174 268</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-soft-grey uppercase tracking-widest mb-1">Office</p>
                    <p className="text-xl font-bold">Limbe Road, Northmead, Lusaka, Zambia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => handleQuickAction('Training Request')}
                className="btn-primary py-4 px-2 text-xs flex flex-col items-center gap-2"
              >
                <MessageSquare size={20} />
                Request Training
              </button>
              <button 
                onClick={() => handleQuickAction('Platform Demo')}
                className="btn-primary py-4 px-2 text-xs flex flex-col items-center gap-2"
              >
                <Play size={20} />
                Book a Demo
              </button>
              <button 
                onClick={() => handleQuickAction('Partnership Proposal')}
                className="btn-primary py-4 px-2 text-xs flex flex-col items-center gap-2"
              >
                <Handshake size={20} />
                Partner With Us
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="glass-card p-10">
            <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 size={64} className="text-gold mx-auto mb-6" />
                <h4 className="text-2xl font-bold mb-4">Message Sent!</h4>
                <p className="text-soft-grey mb-8">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="btn-secondary py-3 px-8"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-soft-grey uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-jet-black border border-white/10 rounded-lg p-4 focus:border-gold outline-none transition-colors" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-soft-grey uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-jet-black border border-white/10 rounded-lg p-4 focus:border-gold outline-none transition-colors" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-soft-grey uppercase tracking-widest">Subject</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-jet-black border border-white/10 rounded-lg p-4 focus:border-gold outline-none transition-colors appearance-none"
                  >
                    <option>General Inquiry</option>
                    <option>Specific Inquiry</option>
                    <option>Platform Demo</option>
                    <option>Training Request</option>
                    <option>Partnership Proposal</option>
                    <option>KYC Inquiry</option>
                    <option>Administrative</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-soft-grey uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-jet-black border border-white/10 rounded-lg p-4 focus:border-gold outline-none transition-colors" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <Loader2 size={20} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
