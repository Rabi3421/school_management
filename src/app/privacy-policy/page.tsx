import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Greenwood Academy',
  description:
    'Learn how Greenwood Academy collects, uses, and protects personal information from students, parents, and visitors.',
};

const sections = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: [
      'We collect information you provide directly to us, such as when you complete an admissions enquiry form, contact us via email, or subscribe to our newsletter. This may include your name, phone number, email address, child\'s grade level, and other relevant details.',
      'We also automatically collect certain technical data when you visit our website, including IP address, browser type, pages visited, and time spent on pages. This data is collected via cookies and similar technologies.',
    ],
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    content: [
      'We use the information we collect to: respond to admissions enquiries and communications; send school updates, newsletters, and event notifications (where you have opted in); improve the quality and relevance of our website and services; comply with applicable legal and regulatory obligations.',
      'We do not sell, rent, or trade your personal information to third parties for marketing purposes.',
    ],
  },
  {
    id: 'data-security',
    title: '3. Data Security',
    content: [
      'We implement appropriate technical and organisational measures to safeguard personal data against unauthorised access, disclosure, alteration, or destruction. This includes SSL encryption on all pages, restricted staff access to personal data, and regular security reviews.',
      'While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and to contact us immediately if you suspect any unauthorised use of your information.',
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies & Tracking',
    content: [
      'Our website uses cookies to enhance your browsing experience, remember your preferences, and analyse site traffic. Cookies are small text files stored on your device. You can control cookie settings through your browser preferences.',
      'We use analytics cookies (such as Google Analytics) to understand how visitors interact with our site. These cookies do not identify you personally. You may opt out of analytics tracking by adjusting your browser or using the Google Analytics opt-out extension.',
    ],
  },
  {
    id: 'third-party',
    title: '5. Third-Party Links',
    content: [
      'Our website may contain links to third-party websites (such as social media platforms, government portals, or educational resources). These sites have their own privacy policies, and we are not responsible for their content or practices.',
      'We encourage you to review the privacy policies of any third-party websites you visit.',
    ],
  },
  {
    id: 'childrens-privacy',
    title: '6. Children\'s Privacy',
    content: [
      'Greenwood Academy is committed to protecting the privacy of children. We do not knowingly collect personal information directly from children under 13 without verifiable parental consent. All student data is collected through parents or guardians during the admissions process.',
      'If you believe we have inadvertently collected information from a child without parental consent, please contact us immediately and we will take prompt steps to delete such information.',
    ],
  },
  {
    id: 'changes',
    title: '7. Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of significant changes by posting a prominent notice on our website and updating the "Last Updated" date below.',
      'Your continued use of our website after any changes constitutes your acceptance of the updated policy.',
    ],
  },
  {
    id: 'contact',
    title: '8. Contact Us',
    content: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer at:',
      'Greenwood Academy, 123 Education Lane, Academic District, New Delhi — 110001. Email: privacy@greenwoodacademy.edu.in | Phone: +91 98765 43210',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative pt-32 pb-20 text-white overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 40%, #1C4ED8 70%, #0EA5E9 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/10 blur-2xl" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-white/60 text-xs mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Privacy Policy</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
              Legal & Privacy
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-800 leading-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/70 leading-relaxed max-w-xl mx-auto text-sm sm:text-base">
              Your privacy matters to us. This policy explains how we handle personal information at Greenwood Academy.
            </p>
            <p className="text-white/50 text-xs mt-4">Last updated: March 2026</p>
          </div>
          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#F8FAFF" />
            </svg>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
              {/* TOC */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Contents</h3>
                  <nav className="space-y-1">
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="block text-xs text-muted hover:text-primary transition-colors py-1 leading-snug"
                      >
                        {s.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Sections */}
              <div className="space-y-12">
                <p className="text-muted leading-relaxed text-sm border-l-4 border-primary/30 pl-4 bg-primary/5 py-3 pr-4 rounded-r-xl">
                  This Privacy Policy applies to Greenwood Academy&apos;s website and all related digital services. By using our website, you agree to the terms described herein.
                </p>
                {sections.map((s) => (
                  <div key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="font-display text-xl font-700 text-foreground mb-4">{s.title}</h2>
                    {s.content.map((p, i) => (
                      <p key={i} className="text-muted leading-relaxed text-sm mb-3">{p}</p>
                    ))}
                  </div>
                ))}

                {/* Back links */}
                <div className="pt-8 border-t border-border flex flex-wrap items-center gap-4">
                  <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/70 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                    Back to Home
                  </Link>
                  <Link href="/terms-of-use" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors">
                    Terms of Use
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors">
                    Contact Us
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
