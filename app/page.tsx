import ScrollToTop from './components/ScrollToTop';
import SideNavigation from './components/SideNavigation';
import Image from 'next/image';

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <ScrollToTop />

      {/* Hero Section with Photo */}
      <section id="hero" className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Aklima Baiguisova
              </h1>
              <p className="text-lg lg:text-2xl font-medium text-slate-700">
                Product Strategy & SaaS Mentor
              </p>
            </div>
            <p className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
              I help B2B SaaS teams turn complex workflows into simple, human products and make calm, confident product decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 pt-4 lg:pt-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-8 lg:px-10 py-4 lg:py-5 text-base font-medium text-white hover:from-slate-800 hover:to-slate-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                Work with me
              </a>
              <a
                href="#what-i-do"
                className="inline-flex items-center justify-center text-base font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 group"
              >
                What I do
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[600px] rounded-2xl lg:rounded-3xl overflow-hidden bg-slate-50">
            <Image
              src="/aklima-sun.jpg"
              alt="Aklima Baiguisova"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content Sections with Side Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-[240px_1fr] gap-12 lg:gap-24">
          {/* Left Side Navigation */}
          <aside className="hidden lg:block">
            <SideNavigation />
          </aside>

          {/* Main Content */}
          <div className="space-y-24 lg:space-y-32">
        
        {/* About Section - Simple text */}
        <section id="about" className="space-y-6 lg:space-y-8 pb-12 lg:pb-16 border-b border-slate-200/50">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            About
          </h2>
          <div className="space-y-5 lg:space-y-6 text-base lg:text-lg leading-relaxed text-slate-700 max-w-3xl">
            <p>
              I'm a product leader with 10+ years in B2B SaaS: billing, payments, reporting and online platforms.
            </p>
            <p>
              I've been a PM, team lead and Head of Product — launching new products from zero, rebuilding legacy flows and growing product teams in fast-moving companies.
            </p>
            <p>
              Now I work as an independent advisor and mentor for founders and product leaders.
            </p>
          </div>
        </section>

        {/* What I do Section - Subtle cards */}
        <section id="what-i-do" className="space-y-6 lg:space-y-8 pb-12 lg:pb-16 border-b border-slate-200/50">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            What I do
          </h2>
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-4xl">
            <div className="p-6 lg:p-8 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-2">
                Product & UX mentoring
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                Regular calls to review features, hypotheses and focus.
              </p>
            </div>
            <div className="p-6 lg:p-8 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-2">
                Product strategy
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                Clarifying what to build next (and what to drop) so the roadmap matches the strategy.
              </p>
            </div>
            <div className="p-6 lg:p-8 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-2">
                Simplifying complex flows
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                Making sign-up, checkout, billing, reporting and admin tools usable for non-experts.
              </p>
            </div>
            <div className="p-6 lg:p-8 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-2">
                Founder / HoP sounding board
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                A trusted partner to talk through decisions, org and go-to-market.
              </p>
            </div>
          </div>
          <blockquote className="mt-8 lg:mt-10 pl-6 lg:pl-8 border-l border-slate-300 text-base lg:text-lg text-slate-600 leading-relaxed max-w-3xl italic">
            I don't build competing products. My goal is to make your existing product and team stronger.
          </blockquote>
        </section>

        {/* Experience in short Section - Subtle timeline */}
        <section id="experience" className="space-y-6 lg:space-y-8 pb-12 lg:pb-16 border-b border-slate-200/50">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Experience in short
          </h2>
          <div className="flow-root max-w-3xl">
            <ul role="list" className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <span className="absolute left-3 top-3 -ml-px h-full w-px bg-slate-200" aria-hidden="true"></span>
                  <div className="relative flex space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 ring-4 ring-white"></span>
                    </div>
                    <div className="flex min-w-0 flex-1 pt-0.5">
                      <p className="text-base lg:text-lg leading-relaxed text-slate-700">
                        Joined a fast-growing online platform shortly after its Series A as a Product Manager and left after Series B as Head of Product. During that time, the company's valuation grew more than 10x (from around $40M to $500M), while we scaled the product, team and customer base.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <span className="absolute left-3 top-3 -ml-px h-full w-px bg-slate-200" aria-hidden="true"></span>
                  <div className="relative flex space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 ring-4 ring-white"></span>
                    </div>
                    <div className="flex min-w-0 flex-1 pt-0.5">
                      <p className="text-base lg:text-lg leading-relaxed text-slate-700">
                        Led product for an online platform handling recurring payments and contributions for large organisations (enterprise segment, high volume, strict compliance).
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <span className="absolute left-3 top-3 -ml-px h-full w-px bg-slate-200" aria-hidden="true"></span>
                  <div className="relative flex space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 ring-4 ring-white"></span>
                    </div>
                    <div className="flex min-w-0 flex-1 pt-0.5">
                      <p className="text-base lg:text-lg leading-relaxed text-slate-700">
                        Product leader in B2B fintech / mobility: owned billing, invoicing, pricing and integrations with external finance and reporting systems.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative">
                  <div className="relative flex space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 ring-4 ring-white"></span>
                    </div>
                    <div className="flex min-w-0 flex-1 pt-0.5">
                      <p className="text-base lg:text-lg leading-relaxed text-slate-700">
                        Earlier worked as Product Manager and business analyst on ERP tools, reporting and internal systems that reduced manual work and scaled with the business.
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Who I work with Section - Simple list */}
        <section id="who-i-work-with" className="space-y-6 lg:space-y-8 pb-12 lg:pb-16 border-b border-slate-200/50">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Who I work with
          </h2>
          <ul className="space-y-4 lg:space-y-5 text-base lg:text-lg leading-relaxed text-slate-700 max-w-3xl">
            <li className="flex items-start gap-3">
              <span className="text-slate-300 mt-1.5">•</span>
              <span>B2B SaaS and data-heavy products with complex user journeys.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-slate-300 mt-1.5">•</span>
              <span>Founders and product leaders who want a senior product partner a few hours a month.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-slate-300 mt-1.5">•</span>
              <span>Teams that feel their product has become heavy and want to simplify without losing depth.</span>
            </li>
          </ul>
        </section>

        {/* How we can work together Section - Subtle cards */}
        <section id="how-we-can-work-together" className="space-y-6 lg:space-y-8 pb-12 lg:pb-16 border-b border-slate-200/50">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            How we can work together
          </h2>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl">
            <div className="p-6 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-2">
                One-off advisory session
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                60–90 min on Zoom, with a short brief sent in advance.
              </p>
            </div>
            <div className="p-6 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-2">
                Monthly mentoring / advisory
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                A set number of calls + async comments on docs and product flows.
              </p>
            </div>
            <div className="p-6 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <h3 className="text-base lg:text-lg font-semibold text-slate-900 mb-2">
                Focused product sprint
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                A short deep dive into one key area (onboarding, checkout, billing, reporting, internal tools).
              </p>
            </div>
          </div>
        </section>

        {/* Recent work Section - Subtle cards */}
        <section id="recent-work" className="space-y-6 lg:space-y-8 pb-12 lg:pb-16 border-b border-slate-200/50">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Recent work
          </h2>
          <div className="space-y-4 max-w-3xl">
            <div className="p-6 lg:p-8 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <p className="text-base lg:text-lg leading-relaxed text-slate-700">
                Helped a SaaS team see where users were getting lost in key journeys and turn that into a small set of UX changes they could ship quickly.
              </p>
            </div>
            <div className="p-6 lg:p-8 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <p className="text-base lg:text-lg leading-relaxed text-slate-700">
                Worked with a data-heavy product to make the interface less "for experts only" and easier for non-technical staff to trust and use.
              </p>
            </div>
            <div className="p-6 lg:p-8 hover:bg-slate-50/50 transition-colors duration-200 rounded-lg">
              <p className="text-base lg:text-lg leading-relaxed text-slate-700">
                Mentored early-stage founders on roadmap and focus so the product matched a clear target user, not "everyone at once".
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-6 lg:space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Let's talk
          </h2>
          <div className="bg-slate-50/50 rounded-2xl lg:rounded-3xl p-8 lg:p-12 lg:p-16 space-y-8 lg:space-y-10 max-w-4xl">
            <p className="text-base lg:text-lg leading-relaxed text-slate-700">
              If you're building a SaaS or data-driven product and want a senior product brain on your side, I'd be happy to talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:baiguisova@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 lg:py-5 text-base font-medium text-white hover:bg-slate-800 transition-colors duration-200 min-h-[48px]"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email me
              </a>
              <a
                href="https://www.linkedin.com/in/aklima/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white border border-slate-200 px-8 py-4 lg:py-5 text-base font-medium text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200 min-h-[48px]"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
            <div className="pt-4 border-t border-slate-200/50">
              <p className="text-slate-600 text-base lg:text-lg">
                Based in Europe, working remotely with teams worldwide.
              </p>
            </div>
          </div>
        </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 border-t border-slate-200/50">
        <p className="text-sm text-slate-400 text-center">
          © {currentYear} Aklima Baiguisova. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
