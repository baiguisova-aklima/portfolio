export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="#hero" className="text-sm font-medium text-slate-900 hover:text-slate-700">
              Aklima Morozova
            </a>
            <div className="flex items-center gap-6">
              <a href="#about" className="text-sm text-slate-600 hover:text-slate-900">
                About
              </a>
              <a href="#services" className="text-sm text-slate-600 hover:text-slate-900">
                Services
              </a>
              <a href="#work" className="text-sm text-slate-600 hover:text-slate-900">
                Work
              </a>
              <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900">
                Contact
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-10 space-y-12 lg:space-y-16">
          {/* Hero Section */}
          <section id="hero" className="scroll-mt-24">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Product strategy & mentoring
                </p>
                <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900">
                  Aklima Morozova (née Baiguisova)
                </h1>
                <p className="text-lg font-medium text-slate-700">
                  Product Strategy & SaaS Mentor
                </p>
                <p className="text-base text-slate-600 leading-relaxed max-w-[36rem]">
                  I help B2B SaaS teams turn complex workflows into simple, human products and make calm, confident product decisions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 text-slate-50 px-5 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    Work with me
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    See selected work
                  </a>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
                    Snapshot
                  </p>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>10+ years in B2B SaaS</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Billing, payments, reporting, online platforms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>PM → Team lead → Head of Product</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Independent advisor & mentor</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="scroll-mt-24 space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                About
              </p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">
                Who I work with
              </h2>
            </div>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
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

          {/* Services Section */}
          <section id="services" className="scroll-mt-24 space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Services
              </p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">
                How I can help
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Product & UX mentoring
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Regular calls to review features, hypotheses and product focus.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Product strategy
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Clarifying what to build next (and what to drop) so the roadmap matches the strategy.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Simplifying complex flows
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Turning complicated billing, payments and reporting flows into simple, human products.
                </p>
              </div>
            </div>
          </section>

          {/* Selected Work Section */}
          <section id="work" className="scroll-mt-24 space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Selected work
              </p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">
                Recent roles & projects
              </h2>
            </div>
            <div className="space-y-6 mt-8">
              <div className="border border-slate-200 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Fundraise Up — Head of Product
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Enterprise fundraising platform
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-3">
                      Led product strategy and execution for a B2B fundraising platform, rebuilding core payment flows and launching new features that increased user engagement.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                        B2B SaaS
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                        Payments
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                        Fundraising
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Yatta — Course platform
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Online courses for creators
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mt-3">
                      Built a course platform from zero to launch, designing user flows and product strategy for online education delivery.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                        B2B SaaS
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                        Online Platforms
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                        Education
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="scroll-mt-24 space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Contact
              </p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">
                Ready to talk?
              </h2>
            </div>
            <p className="text-base text-slate-600 leading-relaxed">
              If you'd like to work together or talk through your product challenges, email me.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:aklimabaiguisova@example.com"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 text-slate-50 px-5 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                aklimabaiguisova@example.com
              </a>
              <p className="text-sm text-slate-500">
                I usually reply within a couple of days.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-slate-500 text-center">
          © {currentYear} Aklima Morozova. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
