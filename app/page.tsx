import ScrollToTop from './components/ScrollToTop';

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <ScrollToTop />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-10 space-y-10 lg:space-y-12">
          {/* Hero Section */}
          <section id="hero" className="space-y-6">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Aklima Morozova (née Baiguisova)
            </h1>
            <p className="text-lg font-medium text-slate-700">
              Product Strategy & SaaS Mentor
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              I help B2B SaaS teams turn complex workflows into simple, human products and make calm, confident product decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800 transition"
              >
                Work with me
              </a>
              <a
                href="#what-i-do"
                className="inline-flex items-center justify-center text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                What I do
              </a>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                About
              </p>
              <h2 className="text-xl lg:text-2xl font-semibold text-slate-900">
                About
              </h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-slate-700">
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
          <section id="what-i-do" className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                What I do
              </p>
              <h2 className="text-xl lg:text-2xl font-semibold text-slate-900">
                What I do
              </h2>
            </div>
            <ul className="space-y-2 text-base leading-relaxed text-slate-700 list-disc list-inside">
              <li>
                <strong>Product & UX mentoring</strong> – regular calls to review features, hypotheses and focus.
              </li>
              <li>
                <strong>Product strategy</strong> – clarifying what to build next (and what to drop) so the roadmap matches the strategy.
              </li>
              <li>
                <strong>Simplifying complex flows</strong> – making sign-up, checkout, billing, reporting and admin tools usable for non-experts.
              </li>
              <li>
                <strong>Founder / HoP sounding board</strong> – a trusted partner to talk through decisions, org and go-to-market.
              </li>
            </ul>
            <blockquote className="mt-6 pl-4 border-l-4 border-slate-300 italic text-slate-600 leading-relaxed">
              I don't build competing products. My goal is to make your existing product and team stronger.
            </blockquote>
          </section>

          {/* Experience in short Section */}
          <section id="experience" className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Experience in short
              </p>
              <h2 className="text-xl lg:text-2xl font-semibold text-slate-900">
                Experience in short
              </h2>
            </div>
            <ul className="space-y-4 text-base leading-relaxed text-slate-700 list-disc list-inside">
              <li>
                Joined a fast-growing online platform shortly after its Series A as a Product Manager and left after Series B as Head of Product. During that time, the company's valuation grew more than 10x (from around $40M to $500M), while we scaled the product, team and customer base.
              </li>
              <li>
                Led product for an online platform handling recurring payments and contributions for large organisations (enterprise segment, high volume, strict compliance).
              </li>
              <li>
                Product leader in B2B fintech / mobility: owned billing, invoicing, pricing and integrations with external finance and reporting systems.
              </li>
              <li>
                Earlier worked as Product Manager and business analyst on ERP tools, reporting and internal systems that reduced manual work and scaled with the business.
              </li>
            </ul>
          </section>

          {/* Who I work with Section */}
          <section id="who-i-work-with" className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Who I work with
              </p>
              <h2 className="text-xl lg:text-2xl font-semibold text-slate-900">
                Who I work with
              </h2>
            </div>
            <ul className="space-y-2 text-base leading-relaxed text-slate-700 list-disc list-inside">
              <li>B2B SaaS and data-heavy products with complex user journeys.</li>
              <li>Founders and product leaders who want a senior product partner a few hours a month.</li>
              <li>Teams that feel their product has become heavy and want to simplify without losing depth.</li>
            </ul>
          </section>

          {/* How we can work together Section */}
          <section id="how-we-can-work-together" className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                How we can work together
              </p>
              <h2 className="text-xl lg:text-2xl font-semibold text-slate-900">
                How we can work together
              </h2>
            </div>
            <ul className="space-y-2 text-base leading-relaxed text-slate-700 list-disc list-inside">
              <li>
                <strong>One-off advisory session</strong> – 60–90 min on Zoom, with a short brief sent in advance.
              </li>
              <li>
                <strong>Monthly mentoring / advisory</strong> – a set number of calls + async comments on docs and product flows.
              </li>
              <li>
                <strong>Focused product sprint</strong> – a short deep dive into one key area (onboarding, checkout, billing, reporting, internal tools).
              </li>
            </ul>
          </section>

          {/* Recent work Section */}
          <section id="recent-work" className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Recent work
              </p>
              <h2 className="text-xl lg:text-2xl font-semibold text-slate-900">
                Recent work (examples)
              </h2>
            </div>
            <ul className="space-y-2 text-base leading-relaxed text-slate-700 list-disc list-inside">
              <li>Helped a SaaS team see where users were getting lost in key journeys and turn that into a small set of UX changes they could ship quickly.</li>
              <li>Worked with a data-heavy product to make the interface less "for experts only" and easier for non-technical staff to trust and use.</li>
              <li>Mentored early-stage founders on roadmap and focus so the product matched a clear target user, not "everyone at once".</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section id="contact" className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </p>
              <h2 className="text-xl lg:text-2xl font-semibold text-slate-900">
                Let's talk
              </h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                If you're building a SaaS or data-driven product and want a senior product brain on your side, I'd be happy to talk.
              </p>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  <a
                    href="mailto:baiguisova@gmail.com"
                    className="text-slate-800 hover:underline"
                  >
                    baiguisova@gmail.com
                  </a>
                </p>
                <p>
                  <span className="font-medium">LinkedIn:</span>{' '}
                  <a
                    href="https://www.linkedin.com/in/aklima/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-800 hover:underline"
                  >
                    linkedin.com/in/aklima/
                  </a>
                </p>
                <p className="text-slate-600">
                  Based in Europe, working remotely with teams worldwide.
                </p>
              </div>
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
