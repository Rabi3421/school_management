import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Use — Greenwood Academy',
  description:
    'Read the terms and conditions governing the use of the Greenwood Academy website and related digital services.',
};

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using the Greenwood Academy website ("Site"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.',
      'These terms apply to all visitors, students, parents, and any other users of the Site. Greenwood Academy reserves the right to update these terms at any time. Continued use of the Site following any changes constitutes your acceptance of the revised terms.',
    ],
  },
  {
    id: 'use-of-website',
    title: '2. Use of the Website',
    content: [
      'The Greenwood Academy website is provided for informational and educational purposes. You may browse, print, and download content for personal, non-commercial use only.',
      'You agree not to: misuse the Site in any way that violates applicable laws; attempt to gain unauthorised access to any part of the Site or its infrastructure; use automated tools to scrape or harvest content; transmit any harmful, offensive, or illegal material through the Site.',
    ],
  },
  {
    id: 'intellectual-property',
    title: '3. Intellectual Property',
    content: [
      'All content on this Site — including text, graphics, logos, photographs, audio, video, and software — is the property of Greenwood Academy or its licensors and is protected by applicable intellectual property laws.',
      'You may not reproduce, distribute, modify, publicly display, or create derivative works from any content on this Site without prior written permission from Greenwood Academy.',
    ],
  },
  {
    id: 'user-conduct',
    title: '4. User Conduct',
    content: [
      'Users are expected to interact with this Site respectfully and in accordance with applicable laws. You agree not to post, transmit, or distribute any content that is defamatory, discriminatory, harmful, or in violation of any third-party rights.',
      'Any content submitted through contact forms or feedback mechanisms must be truthful, relevant, and free from inappropriate material. Greenwood Academy reserves the right to remove any content and restrict access for violations of these standards.',
    ],
  },
  {
    id: 'disclaimer',
    title: '5. Disclaimer of Warranties',
    content: [
      'The information provided on this Site is for general informational purposes only. Greenwood Academy makes no warranties, express or implied, regarding the accuracy, completeness, or suitability of the information for any particular purpose.',
      'The Site is provided on an "as is" and "as available" basis. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.',
    ],
  },
  {
    id: 'limitation',
    title: '6. Limitation of Liability',
    content: [
      'To the fullest extent permitted by law, Greenwood Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this Site.',
      'This includes, without limitation, damages for loss of data, goodwill, revenue, or other intangible losses, even if Greenwood Academy has been advised of the possibility of such damages.',
    ],
  },
  {
    id: 'third-party',
    title: '7. Third-Party Links',
    content: [
      'This Site may contain links to third-party websites for your convenience. These links do not constitute an endorsement by Greenwood Academy. We have no control over the content or practices of third-party sites and are not responsible for their content, privacy policies, or terms.',
      'We recommend reviewing the terms and privacy policies of any third-party websites you access through links on our Site.',
    ],
  },
  {
    id: 'governing-law',
    title: '8. Governing Law',
    content: [
      'These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of New Delhi.',
      'If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.',
    ],
  },
  {
    id: 'contact',
    title: '9. Contact Us',
    content: [
      'If you have questions about these Terms of Use, please contact us at:',
      'Greenwood Academy, 123 Education Lane, Academic District, New Delhi — 110001. Email: legal@greenwoodacademy.edu.in | Phone: +91 98765 43210',
    ],
  },
];

export default function TermsOfUsePage() {
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
              <span className="text-white">Terms of Use</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
              Legal
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-800 leading-tight mb-4">
              Terms of Use
            </h1>
            <p className="text-white/70 leading-relaxed max-w-xl mx-auto text-sm sm:text-base">
              Please read these terms carefully before using the Greenwood Academy website and digital services.
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
                  These Terms of Use govern your access to and use of the Greenwood Academy website. By using this Site, you agree to these terms. Please also review our{' '}
                  <Link href="/privacy-policy" className="text-primary underline underline-offset-2 hover:text-primary/70">Privacy Policy</Link>.
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
                  <Link href="/privacy-policy" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary transition-colors">
                    Privacy Policy
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
