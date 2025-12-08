import Image from "next/image";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-4">
          <span className="text-base font-bold tracking-tight text-[#003366]">Aklima Morozova</span>
          <nav className="hidden md:flex flex-wrap items-center gap-x-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-[#0056b3] transition-colors">About</a>
            <a href="#what-i-do" className="hover:text-[#0056b3] transition-colors">What I do</a>
            <a href="#experience" className="hover:text-[#0056b3] transition-colors">Experience</a>
            <a href="#how-we-can-work-together" className="hover:text-[#0056b3] transition-colors">Work together</a>
            <a href="#contact" className="hover:text-[#0056b3] transition-colors">Contact</a>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section id="hero" className="mt-12 lg:mt-24 pb-12 lg:pb-24 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">
            {/* Left Column - Hero Content */}
            <div>
              <p className="text-sm font-bold tracking-wider text-[#0056b3] uppercase mb-4">Product Strategy & SaaS Mentor</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#003366] leading-[1.1]">
                Aklima Morozova <br/>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-500">(née Baiguisova)</span>
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-slate-700 font-light">
                I help B2B SaaS teams turn complex workflows into simple, human products and make calm, confident product decisions.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-md bg-[#E6F0F9] px-3 py-1.5 text-xs font-semibold text-[#003366]">B2B SaaS</span>
                <span className="inline-flex items-center rounded-md bg-[#E6F0F9] px-3 py-1.5 text-xs font-semibold text-[#003366]">Fintech & payments</span>
                <span className="inline-flex items-center rounded-md bg-[#E6F0F9] px-3 py-1.5 text-xs font-semibold text-[#003366]">Fundraising</span>
                <span className="inline-flex items-center rounded-md bg-[#E6F0F9] px-3 py-1.5 text-xs font-semibold text-[#003366]">Mentor & advisor</span>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#0056b3] px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#003366] transition-colors"
                >
                  Work with me
                </a>
                <a
                  href="#what-i-do"
                  className="text-sm font-semibold text-[#003366] hover:text-[#0056b3] flex items-center gap-2 group"
                >
                  What I do <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100">
                 <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    Currently mentoring product leaders · Open for 1 new B2B SaaS team
                </span>
              </div>
            </div>

            {/* Right Column - Portrait Image */}
            <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:mx-0">
              <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/5] shadow-xl shadow-slate-200/50">
                <Image
                  src="/aklima-sun.jpg"
                  alt="Portrait of Aklima Morozova"
                  fill
                  className="object-cover object-[40%_15%] grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24 grid gap-16 lg:gap-24 lg:grid-cols-[200px_1fr]">
        {/* Left Column - Section Index Rail */}
        <aside className="hidden lg:block sticky top-28 self-start">
          <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-6">
            Menu
          </p>
          <nav className="flex flex-col space-y-3">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-[#0056b3] transition-colors border-l-2 border-transparent hover:border-[#0056b3] pl-3 -ml-3.5">About</a>
            <a href="#what-i-do" className="text-sm font-medium text-slate-600 hover:text-[#0056b3] transition-colors border-l-2 border-transparent hover:border-[#0056b3] pl-3 -ml-3.5">What I do</a>
            <a href="#experience" className="text-sm font-medium text-slate-600 hover:text-[#0056b3] transition-colors border-l-2 border-transparent hover:border-[#0056b3] pl-3 -ml-3.5">Experience</a>
            <a href="#who-i-work-with" className="text-sm font-medium text-slate-600 hover:text-[#0056b3] transition-colors border-l-2 border-transparent hover:border-[#0056b3] pl-3 -ml-3.5">Who I work with</a>
            <a href="#how-we-can-work-together" className="text-sm font-medium text-slate-600 hover:text-[#0056b3] transition-colors border-l-2 border-transparent hover:border-[#0056b3] pl-3 -ml-3.5">Work together</a>
            <a href="#recent-work" className="text-sm font-medium text-slate-600 hover:text-[#0056b3] transition-colors border-l-2 border-transparent hover:border-[#0056b3] pl-3 -ml-3.5">Recent work</a>
          </nav>
        </aside>

        {/* Right Column - All Sections */}
        <div className="space-y-24">
            {/* About Section */}
            <section id="about" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                 <span className="text-[#0056b3] font-bold">01</span>
                 <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <h2 className="text-3xl font-bold text-[#003366]">About</h2>
              <div className="text-lg leading-relaxed text-slate-700 space-y-6 max-w-2xl">
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

            {/* What I do Section */}
            <section id="what-i-do" className="scroll-mt-28 space-y-6">
               <div className="flex items-center gap-3 mb-2">
                 <span className="text-[#0056b3] font-bold">02</span>
                 <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <h2 className="text-3xl font-bold text-[#003366]">What I do</h2>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <h3 className="text-[#003366] font-bold mb-2">Product & UX mentoring</h3>
                        <p className="text-slate-600">Regular calls to review features, hypotheses and focus.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <h3 className="text-[#003366] font-bold mb-2">Product strategy</h3>
                        <p className="text-slate-600">Clarifying what to build next (and what to drop) so the roadmap matches the strategy.</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <h3 className="text-[#003366] font-bold mb-2">Simplifying complex flows</h3>
                        <p className="text-slate-600">Making sign-up, checkout, billing, reporting and admin tools usable for non-experts.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <h3 className="text-[#003366] font-bold mb-2">Founder / HoP sounding board</h3>
                        <p className="text-slate-600">A trusted partner to talk through decisions, org and go-to-market.</p>
                    </div>
                </div>
              </div>
              <blockquote className="mt-8 border-l-4 border-[#0056b3] pl-6 py-2 text-lg italic text-slate-700 bg-[#E6F0F9]/30 rounded-r-lg">
                  I don't build competing products. My goal is to make your existing product and team stronger.
              </blockquote>
            </section>

            {/* Experience Section */}
            <section id="experience" className="scroll-mt-28 space-y-6">
               <div className="flex items-center gap-3 mb-2">
                 <span className="text-[#0056b3] font-bold">03</span>
                 <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <h2 className="text-3xl font-bold text-[#003366]">Experience in short</h2>
              <div className="space-y-0 border-l border-slate-200 ml-3">
                <div className="relative pl-8 pb-8">
                    <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[#0056b3]"></div>
                    <p className="text-lg text-slate-700">
                    Joined a fast-growing online platform shortly after its Series A as a Product Manager and left after Series B as Head of Product. During that time, the company's valuation grew more than 10x (from around $40M to $500M), while we scaled the product, team and customer base.
                    </p>
                </div>
                <div className="relative pl-8 pb-8">
                    <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300"></div>
                    <p className="text-lg text-slate-700">
                    Led product for an online platform handling recurring payments and contributions for large organisations (enterprise segment, high volume, strict compliance).
                    </p>
                </div>
                <div className="relative pl-8 pb-8">
                    <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300"></div>
                    <p className="text-lg text-slate-700">
                    Product leader in B2B fintech / mobility: owned billing, invoicing, pricing and integrations with external finance and reporting systems.
                    </p>
                </div>
                <div className="relative pl-8">
                    <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-300"></div>
                    <p className="text-lg text-slate-700">
                    Earlier worked as Product Manager and business analyst on ERP tools, reporting and internal systems that reduced manual work and scaled with the business.
                    </p>
                </div>
              </div>
            </section>

            {/* Who I work with Section */}
            <section id="who-i-work-with" className="scroll-mt-28 space-y-6">
               <div className="flex items-center gap-3 mb-2">
                 <span className="text-[#0056b3] font-bold">04</span>
                 <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <h2 className="text-3xl font-bold text-[#003366]">Who I work with</h2>
              <ul className="grid gap-4 md:grid-cols-3">
                <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                    <span className="text-4xl mb-4">🏢</span>
                    <span className="text-slate-700 font-medium">B2B SaaS and data-heavy products with complex user journeys.</span>
                </li>
                 <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                    <span className="text-4xl mb-4">🤝</span>
                    <span className="text-slate-700 font-medium">Founders and product leaders who want a senior product partner a few hours a month.</span>
                </li>
                 <li className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                    <span className="text-4xl mb-4">⚖️</span>
                    <span className="text-slate-700 font-medium">Teams that feel their product has become heavy and want to simplify without losing depth.</span>
                </li>
              </ul>
            </section>

            {/* How we can work together Section */}
            <section id="how-we-can-work-together" className="scroll-mt-28 space-y-6">
               <div className="flex items-center gap-3 mb-2">
                 <span className="text-[#0056b3] font-bold">05</span>
                 <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <h2 className="text-3xl font-bold text-[#003366]">How we can work together</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-[#003366] text-white p-6 shadow-lg transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-lg font-bold mb-2">One-off advisory session</h3>
                  <div className="h-1 w-12 bg-[#0056b3] mb-4"></div>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    60–90 min on Zoom, with a short brief sent in advance.
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-md transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-lg font-bold text-[#003366] mb-2">Monthly mentoring</h3>
                  <div className="h-1 w-12 bg-[#0056b3] mb-4"></div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A set number of calls + async comments on docs and product flows.
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-md transform hover:-translate-y-1 transition-transform">
                  <h3 className="text-lg font-bold text-[#003366] mb-2">Focused product sprint</h3>
                  <div className="h-1 w-12 bg-[#0056b3] mb-4"></div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A short deep dive into one key area (onboarding, checkout, billing, reporting, internal tools).
                  </p>
                </div>
              </div>
            </section>

            {/* Recent work Section */}
            <section id="recent-work" className="scroll-mt-28 space-y-6">
               <div className="flex items-center gap-3 mb-2">
                 <span className="text-[#0056b3] font-bold">06</span>
                 <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <h2 className="text-3xl font-bold text-[#003366]">Recent work (examples)</h2>
              <div className="grid gap-6">
                <div className="group rounded-xl p-6 border-l-4 border-[#0056b3] bg-white shadow-sm hover:shadow-md transition-all">
                  <p className="text-lg text-slate-700">
                    Helped a SaaS team see where users were getting lost in key journeys and turn that into a small set of UX changes they could ship quickly.
                  </p>
                </div>
                <div className="group rounded-xl p-6 border-l-4 border-slate-300 hover:border-[#0056b3] bg-white shadow-sm hover:shadow-md transition-all">
                  <p className="text-lg text-slate-700">
                    Worked with a data-heavy product to make the interface less "for experts only" and easier for non-technical staff to trust and use.
                  </p>
                </div>
                <div className="group rounded-xl p-6 border-l-4 border-slate-300 hover:border-[#0056b3] bg-white shadow-sm hover:shadow-md transition-all">
                  <p className="text-lg text-slate-700">
                    Mentored early-stage founders on roadmap and focus so the product matched a clear target user, not "everyone at once".
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="scroll-mt-28 mt-12">
              <div className="rounded-2xl bg-[#003366] text-white p-8 lg:p-12 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Let's talk</h2>
                <p className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                    If you're building a SaaS or data-driven product and want a senior product brain on your side, I'd be happy to talk.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:baiguisova@gmail.com"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#003366] hover:bg-blue-50 transition-colors"
                  >
                    Email me
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aklima/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-blue-400 px-8 py-3 text-sm font-bold text-white hover:bg-[#0056b3] transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
                <p className="mt-8 text-xs text-blue-200/60">
                  Based in Europe, working remotely with teams worldwide.
                </p>
              </div>
            </section>
          </div>
        </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-10 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-xs text-slate-500 font-medium">© {currentYear} Aklima Morozova. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
