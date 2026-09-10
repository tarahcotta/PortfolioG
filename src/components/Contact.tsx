import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, FileText, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('tarahcotta@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto border-t border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Info & Direct Contact */}
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 block mb-2">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
            Let's build something exceptional together.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-8">
            Whether you're looking for design leadership, advisory on AI workflows, or consulting on complex enterprise products, I'd love to connect.
          </p>

          {/* Email Card */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-zinc-500 dark:text-zinc-400">Direct Email</span>
                <span className="block text-sm font-bold text-zinc-900 dark:text-white">tarahcotta@gmail.com</span>
              </div>
            </div>

            <button
              onClick={copyEmail}
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Copy Email"
              aria-label="Copy direct email address to clipboard"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Resume Card */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                <FileText className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-xs text-zinc-500 dark:text-zinc-400">Curriculum Vitae</span>
                <span className="block text-sm font-bold text-zinc-900 dark:text-white">Download Resume PDF</span>
              </div>
            </div>

            <button
              onClick={onOpenResume}
              className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none transition-colors inline-flex items-center gap-1.5"
              aria-label="View executive resume modal"
            >
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                Message Sent Successfully
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
                Thank you for reaching out, {formData.name}. Tarah will get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Send a Message
              </h3>

              <div>
                <label htmlFor="contact-name-input" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Your Name
                </label>
                <input
                  id="contact-name-input"
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email-input" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email-input"
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message-input" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message-input"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or role opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
