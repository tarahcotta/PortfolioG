import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Printer,
  FileText,
  CheckCircle2,
  Briefcase,
  Award,
  ShieldCheck,
  Sparkles,
  Layers,
  Users,
  Code2,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Download
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [printing, setPrinting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            modalRef.current.focus();
          }
        }
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap focus
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    setPrinting(true);
    window.print();
    setTimeout(() => setPrinting(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tarahcotta@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPlainText = () => {
    const plainText = `TARAH COTTA
Staff Product Designer • Enterprise Design Systems • UX Strategy • Product Leadership
tarahcotta@gmail.com | (720) 238 1605 | Denver, CO

SUMMARY
Staff Product Designer with 8+ years of experience directing enterprise UX strategy, multi-application design systems, and web accessibility (WCAG 2.2 AA). Combines a full-stack engineering background (React, Tailwind CSS, TypeScript) with Figma Enterprise governance to establish design operations, accelerate designer-developer handoffs, and lead cross-functional product strategy across complex scientific and regulatory platforms.

SKILLS (Highlighted items represent core practice areas & architecture)
Design Strategy: Product Design Architecture, UX Strategy & Vision*, Systems Thinking*, Information Architecture, User Discovery
Design Systems: Figma Enterprise Admin*, USWDS Standards, Component Libraries, Design Token Architecture*, WCAG 2.2 AA Compliance*
Technical Stack: React*, Tailwind CSS*, JavaScript / TypeScript, HTML / CSS, Git Version Control
Leadership: Design Operations (DesignOps)*, Cross-Functional Leadership*, UX Community of Practice*, Mentorship & Coaching, Executive Stakeholder Alignment

PROFESSIONAL EXPERIENCE
Staff Product Designer (ITS Professional III)
National Laboratories of the Rockies | October 2021 – Present
• Architected and governed the laboratory's first enterprise design system, establishing reusable component libraries, multi-theme design tokens, and design standards across 15 enterprise applications.
• Administered Figma Enterprise and Figma for Government environments for 100+ multidisciplinary users, establishing organization-wide component governance, shared UI kits, and DesignOps workflows.
• Led enterprise-wide WCAG 2.2 AA accessibility initiatives, embedding audit standards, automated testing tools, and compliance checklists directly into the design and software development lifecycle.
• Partnered with engineering leadership to align Figma UI kits with React and Tailwind CSS components, reducing front-end implementation time by 40%.
• Directed end-to-end product strategy and UX design for six scientific and regulatory applications, turning complex multi-stakeholder technical requirements into clean, accessible workflows.
• Founded and led the internal UX Community of Practice, hosting workshops, design critiques, and coaching sessions to elevate design maturity across engineering leaders, product owners, and executive stakeholders.

Developer & Product Designer (ITS Professional II)
National Laboratories of the Rockies | April 2019 – October 2021
• Transitioned from software engineering into product design to lead the modernization of internal legacy tools and complex enterprise applications.
• Conducted UX and accessibility audits across enterprise tools, presenting actionable findings to executive leadership to shift organizational focus toward intuitive user workflows rather than mandatory staff training.
• Leveraged full-stack development experience to establish technical feasibility standards and streamline designer-developer component handoffs.

Full-Stack Developer (ITS Professional I)
National Laboratories of the Rockies | October 2018 – April 2019
• Engineered and maintained internal web applications supporting mission-critical laboratory operations using React, JavaScript, and responsive CSS frameworks.
• Implemented accessible front-end interfaces and partnered with project managers to refine system requirements, building the technical foundation for cross-functional design leadership.

CERTIFICATIONS & AWARDS
Certifications: Google UX Design Certificate • Nielsen Norman Group UX Certification
Awards: Chairperson's Award (2025) • President's Award (2024)`;

    navigator.clipboard.writeText(plainText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleDownloadFile = () => {
    // Generates a downloadable clean text file asset and triggers browser save
    const plainText = `TARAH COTTA
Staff Product Designer (ITS Professional III)
National Laboratories of the Rockies
Denver, CO | tarahcotta@gmail.com | linkedin.com/in/tarah-cotta | github.com/tarahcotta | tarahcotta.studio

PROFESSIONAL SUMMARY
Staff Product Designer with 8+ years of experience directing enterprise UX strategy, multi-application design systems, and web accessibility (WCAG 2.2 AA). Combines a full-stack engineering background (React, Tailwind CSS, TypeScript) with Figma Enterprise governance to establish design operations, accelerate designer-developer handoffs, and lead cross-functional product strategy across complex scientific and regulatory platforms.

SKILLS (Highlighted items represent core practice areas & architecture)
Design Strategy: Product Design Architecture, UX Strategy & Vision*, Systems Thinking*, Information Architecture, User Discovery
Design Systems: Figma Enterprise Admin*, USWDS Standards, Component Libraries, Design Token Architecture*, WCAG 2.2 AA Compliance*
Technical Stack: React*, Tailwind CSS*, JavaScript / TypeScript, HTML / CSS, Git Version Control
Leadership: Design Operations (DesignOps)*, Cross-Functional Leadership*, UX Community of Practice*, Mentorship & Coaching, Executive Stakeholder Alignment

PROFESSIONAL EXPERIENCE
Staff Product Designer (ITS Professional III)
National Laboratories of the Rockies | October 2021 – Present
• Architected and governed the laboratory's first enterprise design system, establishing reusable component libraries, multi-theme design tokens, and design standards across 15 enterprise applications.
• Administered Figma Enterprise and Figma for Government environments for 100+ multidisciplinary users, establishing organization-wide component governance, shared UI kits, and DesignOps workflows.
• Led enterprise-wide WCAG 2.2 AA accessibility initiatives, embedding audit standards, automated testing tools, and compliance checklists directly into the design and software development lifecycle.
• Partnered with engineering leadership to align Figma UI kits with React and Tailwind CSS components, reducing front-end implementation time by 40%.
• Directed end-to-end product strategy and UX design for six scientific and regulatory applications, turning complex multi-stakeholder technical requirements into clean, accessible workflows.
• Founded and led the internal UX Community of Practice, hosting workshops, design critiques, and coaching sessions to elevate design maturity across engineering leaders, product owners, and executive stakeholders.

Developer & Product Designer (ITS Professional II)
National Laboratories of the Rockies | April 2019 – October 2021
• Transitioned from software engineering into product design to lead the modernization of internal legacy tools and complex enterprise applications.
• Conducted UX and accessibility audits across enterprise tools, presenting actionable findings to executive leadership to shift organizational focus toward intuitive user workflows rather than mandatory staff training.
• Leveraged full-stack development experience to establish technical feasibility standards and streamline designer-developer component handoffs.

Full-Stack Developer (ITS Professional I)
National Laboratories of the Rockies | October 2018 – April 2019
• Engineered and maintained internal web applications supporting mission-critical laboratory operations using React, JavaScript, and responsive CSS frameworks.
• Implemented accessible front-end interfaces and partnered with project managers to refine system requirements, building the technical foundation for cross-functional design leadership.

CERTIFICATIONS & AWARDS
Certifications: Google UX Design Certificate • Nielsen Norman Group UX Certification
Awards: Chairperson's Award (2025) • President's Award (2024)`;

    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Tarah_Cotta_Staff_Product_Designer_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleDownloadPDF = async () => {
    setDownloadingPdf(true);

    try {
      const { jsPDF } = await import('jspdf');

      const doc = new jsPDF({
        unit: 'pt',
        format: 'letter',
      });

      const pageWidth = doc.internal.pageSize.getWidth(); // 612pt
      const pageHeight = doc.internal.pageSize.getHeight(); // 792pt
      const margin = 42;
      const contentWidth = pageWidth - margin * 2; // 528pt
      let y = 46;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - 42) {
          doc.addPage();
          y = 46;
        }
      };

      // HEADER
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(17, 24, 39); // #111827
      doc.text('Tarah Cotta', margin, y);
      y += 18;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(79, 70, 229); // #4F46E5
      doc.text('Staff Product Designer  •  Design Systems  •  UX Strategy  •  Product Leadership', margin, y);
      y += 15;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(75, 85, 99); // #4B5563
      doc.text('tarahcotta@gmail.com   |   (720) 238 1605   |   github.com/tarahcotta   |   Denver, CO', margin, y);
      y += 14;

      // Divider Line
      doc.setDrawColor(229, 231, 235); // #E5E7EB
      doc.setLineWidth(0.75);
      doc.line(margin, y, pageWidth - margin, y);
      y += 18;

      // Section Header Helper
      const renderSectionHeader = (title: string) => {
        checkPageBreak(28);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(79, 70, 229); // #4F46E5
        doc.text(title.toUpperCase(), margin, y);
        y += 12;
      };

      // SUMMARY
      renderSectionHeader('Summary');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(31, 41, 55); // #1F2937
      const summaryText = "Staff Product Designer with 8+ years of experience directing enterprise UX strategy, multi-application design systems, and web accessibility (WCAG 2.2 AA). Combines a full-stack engineering background (React, Tailwind CSS, TypeScript) with Figma Enterprise governance to establish design operations, accelerate designer-developer handoffs, and lead cross-functional product strategy across complex scientific and regulatory platforms.";
      const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
      checkPageBreak(summaryLines.length * 11.5 + 8);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 11.5 + 14;

      // SKILLS
      renderSectionHeader('Skills');
      const skills = [
        { cat: 'Design Strategy', list: 'Product Design Architecture, UX Strategy & Vision, Systems Thinking, Information Architecture, User Discovery' },
        { cat: 'Design Systems', list: 'Figma Enterprise Admin, USWDS Standards, Component Libraries, Design Token Architecture, WCAG 2.2 AA Compliance' },
        { cat: 'Technical Stack', list: 'React, Tailwind CSS, JavaScript / TypeScript, HTML / CSS, Git Version Control' },
        { cat: 'Leadership', list: 'Design Operations (DesignOps), Cross-Functional Leadership, UX Community of Practice, Mentorship & Coaching, Executive Stakeholder Alignment' }
      ];
      skills.forEach(s => {
        checkPageBreak(13);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(17, 24, 39);
        doc.text(s.cat + ':', margin, y);
        const catWidth = doc.getTextWidth(s.cat + ': ');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(55, 65, 81);
        const lines = doc.splitTextToSize(s.list, contentWidth - catWidth);
        if (lines.length === 1) {
          doc.text(lines[0], margin + catWidth, y);
          y += 13;
        } else {
          doc.text(lines, margin + catWidth, y);
          y += lines.length * 11.5 + 2;
        }
      });
      y += 12;

      // PROFESSIONAL EXPERIENCE
      renderSectionHeader('Professional Experience');

      const jobs = [
        {
          title: 'Staff Product Designer (ITS Professional III)',
          dates: 'October 2021 – Present',
          company: 'National Laboratories of the Rockies',
          bullets: [
            "Architected and governed the laboratory's first enterprise design system, establishing reusable component libraries, multi-theme design tokens, and design standards across 15 enterprise applications.",
            "Administered Figma Enterprise and Figma for Government environments for 100+ multidisciplinary users, establishing organization-wide component governance, shared UI kits, and DesignOps workflows.",
            "Led enterprise-wide WCAG 2.2 AA accessibility initiatives, embedding audit standards, automated testing tools, and compliance checklists directly into the design and software development lifecycle.",
            "Partnered with engineering leadership to align Figma UI kits with React and Tailwind CSS components, reducing front-end implementation time by 40%.",
            "Directed end-to-end product strategy and UX design for six scientific and regulatory applications, turning complex multi-stakeholder technical requirements into clean, accessible workflows.",
            "Founded and led the internal UX Community of Practice, hosting workshops, design critiques, and coaching sessions to elevate design maturity across engineering leaders, product owners, and executive stakeholders."
          ]
        },
        {
          title: 'Developer & Product Designer (ITS Professional II)',
          dates: 'April 2019 – October 2021',
          company: 'National Laboratories of the Rockies',
          bullets: [
            "Transitioned from software engineering into product design to lead the modernization of internal legacy tools and complex enterprise applications.",
            "Conducted UX and accessibility audits across enterprise tools, presenting actionable findings to executive leadership to shift organizational focus toward intuitive user workflows rather than mandatory staff training.",
            "Used full-stack development experience to establish technical feasibility standards and streamline designer-developer component handoffs."
          ]
        },
        {
          title: 'Full-Stack Developer (ITS Professional I)',
          dates: 'October 2018 – April 2019',
          company: 'National Laboratories of the Rockies',
          bullets: [
            "Engineered and maintained internal web applications supporting mission-critical laboratory operations using React, JavaScript, and responsive CSS frameworks.",
            "Implemented accessible front-end interfaces and partnered with project managers to refine system requirements, building the technical foundation for cross-functional design leadership."
          ]
        }
      ];

      jobs.forEach(job => {
        checkPageBreak(30);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(17, 24, 39);
        doc.text(job.title, margin, y);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(107, 114, 128);
        const datesWidth = doc.getTextWidth(job.dates);
        doc.text(job.dates, pageWidth - margin - datesWidth, y);
        y += 12;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(79, 70, 229);
        doc.text(job.company, margin, y);
        y += 12;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(55, 65, 81);
        job.bullets.forEach(b => {
          const lines = doc.splitTextToSize(b, contentWidth - 14);
          checkPageBreak(lines.length * 11 + 2);
          doc.setFillColor(79, 70, 229);
          doc.circle(margin + 4, y - 3, 1.8, 'F');
          doc.text(lines, margin + 12, y);
          y += lines.length * 11 + 2;
        });
        y += 8;
      });

      // CERTIFICATIONS & AWARDS
      renderSectionHeader('Certifications & Awards');
      checkPageBreak(28);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(17, 24, 39);
      doc.text('Certifications: ', margin, y);
      let certWidth = doc.getTextWidth('Certifications: ');
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(55, 65, 81);
      doc.text('Google UX Design Certificate  •  Nielsen Norman Group UX Certification', margin + certWidth, y);
      y += 13;

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(17, 24, 39);
      doc.text('Awards: ', margin, y);
      let awardWidth = doc.getTextWidth('Awards: ');
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(55, 65, 81);
      doc.text('Chairperson\'s Award (2025)  •  President\'s Award (2024)', margin + awardWidth, y);

      doc.save('Tarah_Cotta_Staff_Product_Designer_Resume.pdf');
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error('Failed to generate PDF via jsPDF, falling back to print window:', err);
      window.print();
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-doc-title"
      tabIndex={-1}
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-md flex justify-center p-0 md:p-6 animate-in fade-in duration-200 outline-none print:p-0 print:bg-white print:static"
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 md:rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden min-h-screen md:min-h-0 flex flex-col print:border-none print:shadow-none print:rounded-none print:min-h-0">
        {/* Sticky Action Header (hidden in print) */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-8 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs tracking-tight">
              TC
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <span>Tarah Cotta</span>
                <span className="text-zinc-400 font-normal">/</span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Resume</span>
              </h2>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium hidden sm:block">
                Staff Product Designer (ITS Professional III)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={downloadingPdf}
              className="px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs font-semibold shadow-sm transition-all inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:opacity-75"
              title="Download actual PDF resume document"
            >
              {downloadingPdf ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                  <span>Generating PDF...</span>
                </>
              ) : downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  <span>Downloaded PDF</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              aria-label="Close resume dialog"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Content */}
        <div
          id="printable-resume"
          className="px-6 sm:px-10 py-6 sm:py-8 space-y-6 sm:space-y-7 flex-1 overflow-y-auto text-start bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 print:p-0 print:overflow-visible print:text-black print:bg-white"
        >
          {/* Header Block matching PDF exactly */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 print:border-zinc-300 pb-5">
            <h1
              id="resume-doc-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 print:text-black mb-1"
            >
              Tarah Cotta
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 print:text-zinc-700 mb-2.5 tracking-wide">
              Staff Product Designer • Enterprise Design Systems • UX Strategy • Product Leadership
            </p>

            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs sm:text-xs text-zinc-600 dark:text-zinc-400 print:text-zinc-700 font-medium">
              <a
                href="mailto:tarahcotta@gmail.com"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 print:text-black transition-colors underline-offset-2 hover:underline inline-flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400 print:hidden" aria-hidden="true" />
                <span>tarahcotta@gmail.com</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-700 print:text-zinc-400">|</span>
              <a
                href="tel:7202381605"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 print:text-black transition-colors inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-400 print:hidden" aria-hidden="true" />
                <span className="tracking-normal font-medium text-zinc-800 dark:text-zinc-200 print:text-black hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">(720) 238 1605</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-700 print:text-zinc-400">|</span>
              <a
                href="https://github.com/tarahcotta"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 print:text-black transition-colors underline-offset-2 hover:underline inline-flex items-center gap-1.5"
              >
                <span>github.com/tarahcotta</span>
              </a>
              <span className="text-zinc-300 dark:text-zinc-700 print:text-zinc-400">|</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 print:hidden" aria-hidden="true" />
                <span>Denver, CO</span>
              </span>
            </div>
          </div>

          {/* SUMMARY */}
          <section aria-labelledby="resume-summary-heading">
            <h2
              id="resume-summary-heading"
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 print:text-zinc-600 mb-2"
            >
              Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 print:text-zinc-900">
              Staff Product Designer with 8+ years of experience directing <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">enterprise UX strategy</strong>, multi-application design systems, and web accessibility (<strong className="font-semibold text-zinc-900 dark:text-white print:text-black">WCAG 2.2 AA</strong>). Combines a full-stack engineering background (<strong className="font-semibold text-zinc-900 dark:text-white print:text-black">React, Tailwind CSS, TypeScript</strong>) with <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">Figma Enterprise</strong> governance to establish design operations, accelerate designer-developer handoffs, and lead cross-functional product strategy across complex scientific and regulatory platforms.
            </p>
          </section>

          {/* SKILLS */}
          <section aria-labelledby="resume-skills-heading">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
              <h2
                id="resume-skills-heading"
                className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 print:text-zinc-600"
              >
                Skills
              </h2>
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 print:text-zinc-600 flex items-center gap-1.5 print:hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 inline-block shrink-0" aria-hidden="true" />
                <span>Highlighted items represent primary areas of practice & architecture</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {/* Design Strategy */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900/90 print:bg-transparent border border-zinc-200/90 dark:border-zinc-800 print:border-zinc-300 shadow-2xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="mb-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800/80 print:border-zinc-200">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 print:text-black uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 print:hidden" aria-hidden="true" />
                      <span>Design Strategy</span>
                    </h3>
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-900">
                    <li tabIndex={0} title="End-to-End Product Architecture" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">Product Design</li>
                    <li tabIndex={0} title="UX Strategy & Vision Roadmapping (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>UX Strategy & Vision</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                    <li tabIndex={0} title="Holistic Systems Thinking & Mapping (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>Systems Thinking</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                    <li tabIndex={0} title="Information Architecture & Taxonomy" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">Information Architecture</li>
                    <li tabIndex={0} title="Qualitative User Research & Discovery" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">User Discovery</li>
                  </ul>
                </div>
              </div>

              {/* Design Systems */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900/90 print:bg-transparent border border-zinc-200/90 dark:border-zinc-800 print:border-zinc-300 shadow-2xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="mb-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800/80 print:border-zinc-200">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 print:text-black uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 print:hidden" aria-hidden="true" />
                      <span>Design Systems</span>
                    </h3>
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-900">
                    <li tabIndex={0} title="Figma Organization Management & Governance (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>Figma Enterprise Admin</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                    <li tabIndex={0} title="U.S. Web Design System Federal Standards" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">USWDS Standards</li>
                    <li tabIndex={0} title="Reusable Component Architecture" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">Component Libraries</li>
                    <li tabIndex={0} title="Semantic Design Token Architecture (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>Design Token Architecture</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                    <li tabIndex={0} title="WCAG 2.2 AA Compliance & Audits (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>WCAG 2.2 AA Compliance</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Technical Stack */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900/90 print:bg-transparent border border-zinc-200/90 dark:border-zinc-800 print:border-zinc-300 shadow-2xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="mb-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800/80 print:border-zinc-200">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 print:text-black uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 print:hidden" aria-hidden="true" />
                      <span>Technical Stack</span>
                    </h3>
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-900">
                    <li tabIndex={0} title="Modern Front-End Component Development (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>React</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                    <li tabIndex={0} title="Utility-First CSS & Responsive Layouts (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>Tailwind CSS</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                    <li tabIndex={0} title="JavaScript (ES6+) & TypeScript" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">JavaScript / TypeScript</li>
                    <li tabIndex={0} title="Semantic HTML & CSS Architecture" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">HTML / CSS</li>
                    <li tabIndex={0} title="Version Control & GitHub Workflow" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">Git Version Control</li>
                  </ul>
                </div>
              </div>

              {/* Leadership */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900/90 print:bg-transparent border border-zinc-200/90 dark:border-zinc-800 print:border-zinc-300 shadow-2xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="mb-2.5 pb-2 border-b border-zinc-100 dark:border-zinc-800/80 print:border-zinc-200">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 print:text-black uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 print:hidden" aria-hidden="true" />
                      <span>Leadership</span>
                    </h3>
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-700 dark:text-zinc-300 print:text-zinc-900">
                    <li tabIndex={0} title="Tooling Infrastructure & Design Workflows (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>Design Operations (DesignOps)</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                    <li tabIndex={0} title="Cross-Functional Leadership & Alignment (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>Cross-Functional Leadership</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                    <li tabIndex={0} title="Organization-wide Design Community Direction (Primary Focus Area)" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 font-semibold text-indigo-700 dark:text-indigo-400 flex items-center justify-between">
                      <span>UX Community of Practice</span>
                      <span className="sr-only"> (Primary focus area)</span>
                    </li>
                    <li tabIndex={0} title="Design Coaching & Mentorship" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">Mentorship & Coaching</li>
                    <li tabIndex={0} title="Executive & Technical Stakeholder Alignment" className="px-1.5 py-0.5 rounded hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-default -mx-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">Stakeholder Alignment</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* PROFESSIONAL EXPERIENCE */}
          <section aria-labelledby="resume-experience-heading">
            <h2
              id="resume-experience-heading"
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 print:text-zinc-600 mb-4 flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 print:hidden" aria-hidden="true" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-6">
              {/* Role 1 */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 print:text-black">
                    Staff Product Designer (ITS Professional III)
                  </h3>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 print:text-zinc-600">
                    October 2021 – Present
                  </span>
                </div>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 print:text-zinc-800">
                  National Laboratories of the Rockies
                </p>
                <ul className="list-disc list-outside ms-4 space-y-1.5 text-xs sm:text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 print:text-zinc-900 pt-0.5">
                  <li>
                    <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">Architected and governed</strong> the laboratory's first enterprise design system, establishing reusable component libraries, multi-theme design tokens, and design standards across <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">15 enterprise applications</strong>.
                  </li>
                  <li>
                    Administered <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">Figma Enterprise</strong> and <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">Figma for Government</strong> environments for 100+ multidisciplinary users, establishing organization-wide component governance, shared UI kits, and DesignOps workflows.
                  </li>
                  <li>
                    <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">Led enterprise-wide WCAG 2.2 AA accessibility initiatives</strong>, embedding audit standards, automated testing tools, and compliance checklists directly into the design and software development lifecycle.
                  </li>
                  <li>
                    Partnered with engineering leadership to align Figma UI kits with <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">React</strong> and <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">Tailwind CSS</strong> components, reducing front-end implementation time by <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">40%</strong>.
                  </li>
                  <li>
                    Directed end-to-end product strategy and UX design for six scientific and regulatory applications, turning complex multi-stakeholder technical requirements into clean, accessible workflows.
                  </li>
                  <li>
                    Founded and led the internal <strong className="font-semibold text-zinc-900 dark:text-white print:text-black">UX Community of Practice</strong>, hosting workshops, design critiques, and coaching sessions to elevate design maturity across engineering leaders, product owners, and executive stakeholders.
                  </li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 print:text-black">
                    Developer & Product Designer (ITS Professional II)
                  </h3>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 print:text-zinc-600">
                    April 2019 – October 2021
                  </span>
                </div>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 print:text-zinc-800">
                  National Laboratories of the Rockies
                </p>
                <ul className="list-disc list-outside ms-4 space-y-1.5 text-xs sm:text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 print:text-zinc-900 pt-0.5">
                  <li>
                    Transitioned from software engineering into product design to lead the modernization of internal legacy tools and complex enterprise applications.
                  </li>
                  <li>
                    Conducted UX and accessibility audits across enterprise tools, presenting actionable findings to executive leadership to shift organizational focus toward intuitive user workflows rather than mandatory staff training.
                  </li>
                  <li>
                    Leveraged full-stack development experience to establish technical feasibility standards and streamline designer-developer component handoffs.
                  </li>
                </ul>
              </div>

              {/* Role 3 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 print:text-black">
                    Full-Stack Developer (ITS Professional I)
                  </h3>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 print:text-zinc-600">
                    October 2018 – April 2019
                  </span>
                </div>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 print:text-zinc-800">
                  National Laboratories of the Rockies
                </p>
                <ul className="list-disc list-outside ms-4 space-y-1.5 text-xs sm:text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 print:text-zinc-900 pt-0.5">
                  <li>
                    Engineered and maintained internal web applications supporting mission-critical laboratory operations using React, JavaScript, and responsive CSS frameworks.
                  </li>
                  <li>
                    Implemented accessible front-end interfaces and partnered with project managers to refine system requirements, building the technical foundation for cross-functional design leadership.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CERTIFICATIONS & AWARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-200 dark:border-zinc-800/80 print:border-zinc-300">
            <section aria-labelledby="resume-certifications-heading">
              <h2
                id="resume-certifications-heading"
                className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 print:text-zinc-600 mb-2 flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 print:hidden" aria-hidden="true" />
                <span>Certifications</span>
              </h2>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 print:text-zinc-900">
                Google UX Design Certificate • Nielsen Norman Group UX Certification
              </p>
            </section>

            <section aria-labelledby="resume-awards-heading">
              <h2
                id="resume-awards-heading"
                className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 print:text-zinc-600 mb-2 flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 print:hidden" aria-hidden="true" />
                <span>Awards</span>
              </h2>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 print:text-zinc-900">
                Chairperson's Award (2025) • President's Award (2024)
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
