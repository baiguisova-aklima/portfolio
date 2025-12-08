import Image from "next/image";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#faf4ea] via-[#fffdf7] to-white text-slate-900">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-3">
          <span className="text-sm font-semibold tracking-tight">Aklima Morozova</span>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm sm:text-base text-slate-600">
            <a href="#about" className="relative hover:text-slate-950 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full">About</a>
            <a href="#what-i-do" className="relative hover:text-slate-950 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full">What I do</a>
            <a href="#experience" className="relative hover:text-slate-950 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full">Experience</a>
            <a href="#how-we-can-work-together" className="relative hover:text-slate-950 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full">Work together</a>
            <a href="#contact" className="relative hover:text-slate-950 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full">Contact</a>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section id="hero" className="mt-10 lg:mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-center">
            {/* Left Column - Hero Content */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">Product Strategy & SaaS Mentor</p>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-tight">
                Aklima Morozova (née Baiguisova)
              </h1>
              <p className="mt-4 text-lg font-medium text-slate-800">
                Product Strategy & SaaS Mentor
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-800">
                I help B2B SaaS teams turn complex workflows into simple, human products and make calm, confident product decisions.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-amber-100/70 px-3 py-1.5 text-xs font-medium text-amber-800">B2B SaaS</span>
                <span className="inline-flex items-center rounded-full bg-amber-100/70 px-3 py-1.5 text-xs font-medium text-amber-800">Fintech & payments</span>
                <span className="inline-flex items-center rounded-full bg-amber-100/70 px-3 py-1.5 text-xs font-medium text-amber-800">Fundraising</span>
                <span className="inline-flex items-center rounded-full bg-amber-100/70 px-3 py-1.5 text-xs font-medium text-amber-800">Mentor & advisor</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2 text-sm font-medium text-slate-50 shadow-[0_10px_30px_rgba(15,23,42,0.35)] hover:bg-slate-800 transition"
                >
                  Work with me
                </a>
                <a
                  href="#what-i-do"
                  className="text-sm font-medium text-slate-800 hover:text-slate-950"
                >
                  What I do
                </a>
              </div>
              <div className="mt-8 space-y-3 text-base text-slate-800">
                <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">
                  Snapshot
                </p>
                <ul className="space-y-2 text-base leading-relaxed">
                  <li>10+ years in B2B SaaS</li>
                  <li>Billing, payments, reporting & online platforms</li>
                  <li>PM → Head of Product</li>
                  <li>Independent advisor & mentor</li>
                </ul>
              </div>
              <div className="mt-5">
                <span className="inline-flex items-center rounded-full bg-amber-100/80 px-3 py-1.5 text-xs font-medium text-amber-900">
                  Currently mentoring product leaders · Open for 1 new B2B SaaS team
                </span>
              </div>
            </div>

            {/* Right Column - Portrait Image */}
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-sm justify-self-end">
              <div className="relative overflow-hidden rounded-[32px] border border-amber-200/80 bg-slate-900/80 shadow-[0_22px_55px_rgba(15,23,42,0.55)] aspect-[4/5]">
                <Image
                  src="/aklima-sun.jpg"
                  alt="Portrait of Aklima Morozova"
                  fill
                  className="object-cover object-[40%_15%]"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-20 grid gap-16 lg:gap-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.8fr)]">
        {/* Left Column - Section Index Rail */}
        <aside className="hidden lg:flex flex-col gap-4 text-sm text-slate-600 lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">
            Sections
          </p>
          <nav className="space-y-2">
            <a href="#about" className="block cursor-pointer text-sm text-slate-600 hover:text-slate-950 transition-colors">01 — About</a>
            <a href="#what-i-do" className="block cursor-pointer text-sm text-slate-600 hover:text-slate-950 transition-colors">02 — What I do</a>
            <a href="#experience" className="block cursor-pointer text-sm text-slate-600 hover:text-slate-950 transition-colors">03 — Experience</a>
            <a href="#who-i-work-with" className="block cursor-pointer text-sm text-slate-600 hover:text-slate-950 transition-colors">04 — Who I work with</a>
            <a href="#how-we-can-work-together" className="block cursor-pointer text-sm text-slate-600 hover:text-slate-950 transition-colors">05 — Work together</a>
            <a href="#recent-work" className="block cursor-pointer text-sm text-slate-600 hover:text-slate-950 transition-colors">06 — Recent work</a>
          </nav>
        </aside>

        {/* Right Column - All Sections */}
        <div className="space-y-16 lg:space-y-20">
            {/* About Section */}
            <section id="about" className="scroll-mt-28 space-y-5 border-t border-slate-200 pt-12 first:border-t-0 first:pt-0">
              <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">01 · ABOUT</p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-950">About</h2>
              <div className="text-base lg:text-lg leading-relaxed text-slate-800 space-y-4">
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
            <section id="what-i-do" className="scroll-mt-28 space-y-5 border-t border-slate-200 pt-12 first:border-t-0 first:pt-0">
              <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">02 · WHAT I DO</p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-950">What I do</h2>
              <div className="text-base lg:text-lg leading-relaxed text-slate-800 space-y-4">
                <ul className="list-disc list-inside space-y-3 text-base lg:text-lg leading-relaxed text-slate-800">
                  <li>
                    <strong className="font-semibold text-slate-900">Product & UX mentoring</strong> – regular calls to review features, hypotheses and focus.
                  </li>
                  <li>
                    <strong className="font-semibold text-slate-900">Product strategy</strong> – clarifying what to build next (and what to drop) so the roadmap matches the strategy.
                  </li>
                  <li>
                    <strong className="font-semibold text-slate-900">Simplifying complex flows</strong> – making sign-up, checkout, billing, reporting and admin tools usable for non-experts.
                  </li>
                  <li>
                    <strong className="font-semibold text-slate-900">Founder / HoP sounding board</strong> – a trusted partner to talk through decisions, org and go-to-market.
                  </li>
                </ul>
                <blockquote className="mt-5 border-l-2 border-slate-300 pl-5 text-base italic text-slate-600 leading-relaxed">
                  I don't build competing products. My goal is to make your existing product and team stronger.
                </blockquote>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="scroll-mt-28 space-y-5 border-t border-slate-200 pt-12 first:border-t-0 first:pt-0">
              <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">03 · EXPERIENCE</p>
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-950">Experience in short</h2>
              <div className="relative pl-10 space-y-8">
                <span className="pointer-events-none absolute left-2 top-2 h-full w-0.5 bg-slate-200" />
                <div className="relative pl-4">
                  <span className="absolute -left-2.5 top-1.5 h-4 w-4 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
                  <p className="text-base lg:text-lg leading-relaxed text-slate-800">
                    Joined a fast-growing online platform shortly after its Series A as a Product Manager and left after Series B as Head of Product. During that time, the company's valuation grew more than 10x (from around $40M to $500M), while we scaled the product, team and customer base.
                  </p>
                </div>
                <div className="relative pl-4">
                  <span className="absolute -left-2.5 top-1.5 h-4 w-4 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
                  <p className="text-base lg:text-lg leading-relaxed text-slate-800">
                    Led product for an online platform handling recurring payments and contributions for large organisations (enterprise segment, high volume, strict compliance).
                  </p>
                </div>
                <div className="relative pl-4">
                  <span className="absolute -left-2.5 top-1.5 h-4 w-4 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
                  <p className="text-base lg:text-lg leading-relaxed text-slate-800">
                    Product leader in B2B fintech / mobility: owned billing, invoicing, pricing and integrations with external finance and reporting systems.
                  </p>
                </div>
                <div className="relative pl-4">
                  <span className="absolute -left-2.5 top-1.5 h-4 w-4 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
                  <p className="text-base lg:text-lg leading-relaxed text-slate-800">
                    Earlier worked as Product Manager and business analyst on ERP tools, reporting and internal systems that reduced manual work and scaled with the business.
                  </p>
                </div>
              </div>
            </section>

            {/* Who I work with Section */}
            <section id="who-i-work-with" className="scroll-mt-28 space-y-4 border-t border-slate-200 pt-10 first:border-t-0 first:pt-0">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-700 uppercase">04 · WHO I WORK WITH</p>
              <h2 className="text-xl lg:text-[22px] font-semibold text-slate-950">Who I work with</h2>
              <div className="text-[15px] leading-relaxed text-slate-800 space-y-2">
                <ul className="list-disc list-inside space-y-2 text-[15px] leading-relaxed text-slate-800">
                  <li>B2B SaaS and data-heavy products with complex user journeys.</li>
                  <li>Founders and product leaders who want a senior product partner a few hours a month.</li>
                  <li>Teams that feel their product has become heavy and want to simplify without losing depth.</li>
                </ul>
              </div>
            </section>

            {/* How we can work together Section */}
            <section id="how-we-can-work-together" className="scroll-mt-28 space-y-4 border-t border-slate-200 pt-10 first:border-t-0 first:pt-0">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-700 uppercase">05 · WORK TOGETHER</p>
              <h2 className="text-xl lg:text-[22px] font-semibold text-slate-950">How we can work together</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 space-y-1 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                  <h3 className="text-sm font-semibold text-slate-950">One-off advisory session</h3>
                  <p className="text-[13px] leading-relaxed text-slate-700">
                    60–90 min on Zoom, with a short brief sent in advance.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 space-y-1 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                  <h3 className="text-sm font-semibold text-slate-950">Monthly mentoring / advisory</h3>
                  <p className="text-[13px] leading-relaxed text-slate-700">
                    A set number of calls + async comments on docs and product flows.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 space-y-1 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                  <h3 className="text-sm font-semibold text-slate-950">Focused product sprint</h3>
                  <p className="text-[13px] leading-relaxed text-slate-700">
                    A short deep dive into one key area (onboarding, checkout, billing, reporting, internal tools).
                  </p>
                </div>
              </div>
            </section>

            {/* Recent work Section */}
            <section id="recent-work" className="scroll-mt-28 space-y-4 border-t border-slate-200 pt-10 first:border-t-0 first:pt-0">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-700 uppercase">06 · RECENT WORK</p>
              <h2 className="text-xl lg:text-[22px] font-semibold text-slate-950">Recent work (examples)</h2>
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-100/80 p-4">
                  <p className="text-[14px] leading-relaxed text-slate-800">
                    Helped a SaaS team see where users were getting lost in key journeys and turn that into a small set of UX changes they could ship quickly.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100/80 p-4">
                  <p className="text-[14px] leading-relaxed text-slate-800">
                    Worked with a data-heavy product to make the interface less "for experts only" and easier for non-technical staff to trust and use.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100/80 p-4">
                  <p className="text-[14px] leading-relaxed text-slate-800">
                    Mentored early-stage founders on roadmap and focus so the product matched a clear target user, not "everyone at once".
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="scroll-mt-28 space-y-4 border-t border-slate-200 pt-10 first:border-t-0 first:pt-0">
              <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 p-6 lg:p-8 space-y-4">
                <h2 className="text-xl lg:text-[22px] font-semibold text-slate-50">Let's talk</h2>
                <div className="text-[15px] leading-relaxed text-slate-100 space-y-3">
                  <p>
                    If you're building a SaaS or data-driven product and want a senior product brain on your side, I'd be happy to talk.
                  </p>
                </div>
                <div className="space-y-3">
                  <a
                    href="mailto:baiguisova@gmail.com"
                    className="inline-flex items-center justify-center rounded-full bg-slate-50 px-5 py-2 text-sm font-medium text-slate-950 hover:bg-slate-200 transition"
                  >
                    Email me
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aklima/"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-slate-200 underline underline-offset-2 hover:text-slate-50"
                  >
                    linkedin.com/in/aklima/
                  </a>
                </div>
                <p className="text-xs text-slate-300">
                  Based in Europe, working remotely with teams worldwide.
                </p>
              </div>
            </section>
          </div>
        </div>

      {/* Footer */}
      <footer className="mt-10 pb-8 text-center text-[11px] text-slate-500">
        © {currentYear} Aklima Morozova. All rights reserved.
      </footer>
    </main>
  );
}
