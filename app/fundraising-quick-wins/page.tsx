'use client';
import ScrollToTop from '../components/ScrollToTop';

import { FormEvent } from 'react';
import Image from 'next/image';

const companyLogos: Record<string, { src: string; alt: string }> = {
  'Fundraise Up': { src: '/Images/Logo/Fundraise Up.png', alt: 'Fundraise Up logo' },
  Gett: { src: '/Images/Logo/Gett.webp', alt: 'Gett logo' },
  'EL 6': { src: '/Images/Logo/EL 6 .png', alt: 'EL 6 logo' },
  Salesforce: { src: '/Images/Logo/Salesforce.png', alt: 'Salesforce logo' },
  Shopify: { src: '/Images/Logo/Shopify.svg', alt: 'Shopify logo' },
  GoFundMe: { src: '/Images/Logo/GoFundMe.png', alt: 'GoFundMe logo' },
  HP: { src: '/Images/Logo/HP.png', alt: 'HP logo' },
};

function HostExperienceItem({
  company,
  children,
}: {
  company: string;
  children: React.ReactNode;
}) {
  const logo = companyLogos[company];

  return (
    <li className="flex items-center gap-3.5">
      {logo && (
        <div className="h-10 w-10 lg:h-12 lg:w-12 flex-shrink-0 flex items-center justify-center">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={40}
            height={40}
            className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
          />
        </div>
      )}
      <span>{children}</span>
    </li>
  );
}

export default function FundraisingQuickWinsPage() {
  const currentYear = new Date().getFullYear();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = (data.get('name') || '').toString();
    const organization = (data.get('organization') || '').toString();
    const role = (data.get('role') || '').toString();
    const email = (data.get('email') || '').toString();
    const website = (data.get('website') || '').toString();
    const improve = (data.get('improve') || '').toString();
    const donationPage = (data.get('donationPage') || '').toString();

    const subject = encodeURIComponent('Fundraising Quick Wins Lab request');

    const bodyLines = [
      name && `Name: ${name}`,
      organization && `Organization: ${organization}`,
      role && `Role / team: ${role}`,
      email && `Email: ${email}`,
      website && `Website: ${website}`,
      improve && `What do you want to improve?:\n${improve}`,
      donationPage && `Link to donation page: ${donationPage}`,
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join('\n\n'));

    window.location.href = `mailto:baiguisova@gmail.com?subject=${subject}&body=${body}`;
  };


  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 text-[0.95rem] sm:text-[1rem] lg:text-[1.05rem]">
      <ScrollToTop />

      {/* Local sticky nav for this page */}
      <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200/60 backdrop-blur-sm">
        <nav className="max-w-5xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center">
            <Image
              src="/Images/Logo_QWL.png"
              alt="Fundraising Quick Wins Lab logo"
              width={420}
              height={96}
              className="h-20 w-auto"
              priority
            />
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs lg:text-sm text-slate-500">
            <a href="#hero" className="hover:text-slate-900 transition-colors">
              About
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How it works
            </a>
            <a href="#hosts" className="hover:text-slate-900 transition-colors">
              Hosts
            </a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">
              Request a session
            </a>
          </div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-0 py-16 lg:py-24 space-y-20 lg:space-y-24">
        {/* HERO */}
        <section id="hero" className="space-y-7">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
            Workshop
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Fundraising Quick Wins Lab
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed">
              For teams doing hard work — with too little time.
            </p>
          </div>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
            A practical workshop where we review your real donation experience and show small, respectful fixes that remove friction,
            reduce second-guessing, and help more supporters follow through.
          </p>
          <p className="text-sm lg:text-base text-slate-500">
            90 minutes · light prep · clear recommendations + examples
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-7 py-3 text-sm font-medium text-white shadow-md ring-1 ring-slate-900/5 hover:from-slate-800 hover:to-slate-600 hover:ring-slate-900/10 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
            >
              Request a session
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors group"
            >
              See how it works
              <span className="ml-1 text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>
          <p className="text-sm lg:text-base text-slate-500 pt-2">
            You’re carrying a lot. This is designed to make one part of your week feel lighter.
          </p>
        </section>

        {/* 3 CARDS */}
        <section id="about" className="space-y-8 border-t border-slate-200/60 pt-12">
          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
              What this lab is
            </span>
            <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
              Three calm, practical lenses on your giving experience: what it is, what we look at, and what you leave with.
            </p>
          </div>

          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            {/* Card 1 — What this is */}
            <article className="rounded-3xl border border-slate-200/70 bg-white/60 overflow-hidden transition-colors duration-200 hover:bg-slate-50 hover:border-slate-300">
              <Image
                src="/Images/review.avif"
                alt="Handwritten notes representing a calm, hands-on review"
                width={480}
                height={320}
                className="h-40 sm:h-48 w-full object-cover"
              />
              <div className="p-6 lg:p-7 space-y-5">
                <h2 className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-sm lg:text-base font-semibold uppercase tracking-[0.18em] text-slate-700">
                  WHAT THIS IS
                </h2>
                <div className="space-y-4 lg:space-y-5">
                  <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                    <span className="font-semibold">Not a training.</span> Not a “transformation”. Not another thing to maintain.
                  </p>
                  <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                    It’s a <span className="font-semibold">calm, hands-on review</span> of your giving experience — with the goal of making it easier
                    for people to help you, right when they feel ready.
                  </p>
                </div>
              </div>
            </article>

            {/* Card 2 — What we review */}
            <article className="rounded-3xl border border-slate-200/70 bg-white/60 overflow-hidden transition-colors duration-200 hover:bg-slate-50 hover:border-slate-300">
              <Image
                src="/Images/photo-1492366254240-43affaefc3e3.avif"
                alt="Team reviewing a flow together"
                width={480}
                height={320}
                className="h-40 sm:h-48 w-full object-cover"
              />
              <div className="p-6 lg:p-7 space-y-5">
                <h2 className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-sm lg:text-base font-semibold uppercase tracking-[0.18em] text-slate-700">
                  WHAT WE REVIEW
                </h2>
                <ul className="space-y-4 lg:space-y-5 text-sm lg:text-base text-slate-700 leading-relaxed">
                  <li>
                    • <span className="font-semibold">the full giving path</span> (donation page → checkout).
                  </li>
                  <li>
                    • <span className="font-semibold">choices that cause hesitation</span> (amounts, frequency, wording).
                  </li>
                  <li>
                    • <span className="font-semibold">monthly giving</span>: whether it feels natural, respectful, and easy.
                  </li>
                  <li>
                    • <span className="font-semibold">trust and clarity</span> (what reassures people vs what creates doubt).
                  </li>
                  <li>
                    • <span className="font-semibold">what happens right after the gift</span> (thank-you page + receipt email).
                  </li>
                  <li>
                    • <span className="font-semibold">post-gift follow-up &amp; tools</span>: how CRM, email and other marketing
                    touchpoints support trust and long-term relationships.
                  </li>
                </ul>
              </div>
            </article>

            {/* Card 3 — What you get */}
            <article className="rounded-3xl border border-slate-200/70 bg-white/60 overflow-hidden transition-colors duration-200 hover:bg-slate-50 hover:border-slate-300">
              <Image
                src="/Images/3.avif"
                alt="Notes and highlights representing clear next steps"
                width={480}
                height={320}
                className="h-40 sm:h-48 w-full object-cover"
              />
              <div className="p-6 lg:p-7 space-y-5">
                <h2 className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-sm lg:text-base font-semibold uppercase tracking-[0.18em] text-slate-700">
                  WHAT YOU GET
                </h2>
                <ul className="space-y-4 lg:space-y-5 text-sm lg:text-base text-slate-700 leading-relaxed">
                  <li>
                    • <span className="font-semibold">a clear review</span> of what’s getting in the way.
                  </li>
                  <li>
                    • <span className="font-semibold">a short list of recommendations</span>.
                  </li>
                  <li>
                    • <span className="font-semibold">concrete examples</span> of what to change (copy + layout + order of choices).
                  </li>
                  <li>
                    • <span className="font-semibold">a short write-up</span> you can share internally to align the team.
                  </li>
                </ul>
                <p className="text-sm lg:text-base text-slate-700 leading-relaxed pt-1.5">
                  <span className="font-semibold">No big rebuild. No extra headcount.</span> Just low-effort fixes that remove needless friction.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Emotional line between blocks */}
        <p className="text-sm lg:text-base text-slate-500">
          This isn’t about squeezing your team. It’s about removing avoidable friction for supporters.
        </p>

        {/* DOES THIS SOUND FAMILIAR? */}
        <section id="fit" className="space-y-6 border-t border-slate-200/60 pt-12">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
            Context
          </span>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">Does this sound familiar?</h2>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
            If this sounds familiar, you’re in the right place:
          </p>
          <ul className="space-y-2 text-base lg:text-lg text-slate-700 leading-relaxed">
            <li>• you’re doing your best — but the donation experience still feels heavier than it should</li>
            <li>• your team is stretched thin, and even “small improvements” take weeks to start</li>
            <li>
              • you’re balancing fundraising needs, comms, CRM, compliance — and it all ends up on the same page
            </li>
            <li>• supporters hesitate because something doesn’t feel clear or confident in the moment</li>
            <li>• monthly giving is important, but asking for it can feel awkward (or easy to miss)</li>
            <li>• you don’t want a platform switch or a big project — you want progress that’s realistic</li>
          </ul>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
            Most supporters don’t stop because they don’t care. They stop because the moment got harder than it needed to be.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="space-y-7 border-t border-slate-200/60 pt-12">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
            Format
          </span>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">How it works</h2>
          <ol className="space-y-3 text-base lg:text-lg text-slate-700 leading-relaxed list-decimal list-inside">
            <li>
              <span className="font-semibold">You share (lightweight)</span> — A few links or screenshots (donation page/checkout,
              thank-you page, receipt email, monthly giving if you have it). Numbers are optional — share only what you already
              track.
            </li>
            <li>
              <span className="font-semibold">We review together (90 minutes)</span> — We walk through the experience, name what’s creating
              friction or doubt, and choose one or two priorities that matter most right now (finishing the gift, monthly giving,
              gentle upgrades, repeat giving).
            </li>
            <li>
              <span className="font-semibold">You get the write-up</span> — A short summary of what we saw + recommended changes + examples
              you can reuse.
            </li>
          </ol>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
            Format: online, one core team • Duration: 90 minutes (or 2 hours if you want more discussion time)
          </p>
        </section>

        {/* Emotional line between blocks */}
        <p className="text-sm lg:text-base text-slate-500">
          Supporters come with good intentions. The experience should help them follow through.
        </p>

        {/* WHO RUNS THE LAB */}
        <section id="hosts" className="space-y-7 border-t border-slate-200/60 pt-12">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
            Team
          </span>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">People behind the lab</h2>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed max-w-3xl">
            We respect the reality of nonprofit teams: too much to do, not enough time — and work that truly matters.
          </p>

          <div className="space-y-8">
            {/* Aklima spotlight */}
            <article className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
              <div className="w-full lg:w-64 xl:w-72">
                <Image
                  src="/aklima-sun.jpg"
                  alt="Portrait of Aklima Baiguisova"
                  width={320}
                  height={320}
                  className="h-56 lg:h-64 w-full rounded-2xl object-cover"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Host</p>
                  <h3 className="text-xl lg:text-2xl font-semibold text-slate-900">Aklima Baiguisova</h3>
                  <p className="text-sm lg:text-base text-slate-600">Product leader | Strong ownership &amp; execution</p>
                  <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
                    12+ years in product &amp; fundraising
                  </span>
                </div>
                <p className="text-sm lg:text-base text-slate-900 leading-relaxed font-medium">
                  Turns “we should fix this” into calm, realistic changes your team can actually act on.
                </p>
                <ul className="space-y-1.5 text-sm lg:text-base text-slate-700 leading-relaxed">
                  <li>• Make the donation experience feel simpler and easier to finish</li>
                  <li>• Make monthly giving feel natural (not pushy)</li>
                  <li>• Add small upgrades that don’t feel salesy</li>
                </ul>
                <div className="pt-3 space-y-1.5">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 lg:h-16 lg:w-16 flex items-center justify-center">
                      <Image
                        src={companyLogos['Fundraise Up'].src}
                        alt={companyLogos['Fundraise Up'].alt}
                        width={60}
                        height={60}
                        className="h-12 w-12 lg:h-14 lg:w-14 object-contain"
                      />
                    </div>
                    <div className="h-14 w-14 lg:h-16 lg:w-16 flex items-center justify-center">
                      <Image
                        src={companyLogos['Gett'].src}
                        alt={companyLogos['Gett'].alt}
                        width={60}
                        height={60}
                        className="h-12 w-12 lg:h-14 lg:w-14 object-contain"
                      />
                    </div>
                    <div className="h-14 w-14 lg:h-16 lg:w-16 flex items-center justify-center">
                      <Image
                        src={companyLogos['EL 6'].src}
                        alt={companyLogos['EL 6'].alt}
                        width={60}
                        height={60}
                        className="h-12 w-12 lg:h-14 lg:w-14 object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm text-slate-500 leading-relaxed">
                    Fundraise Up — Product Manager → Head of Product (~3y) • Gett — Product Manager (~3y) • EL 6 — Product roles (~3y)
                  </p>
                </div>
              </div>
            </article>

            {/* Kusum spotlight */}
            <article className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 lg:p-8 flex flex-col lg:flex-row-reverse gap-6 lg:gap-10 items-start">
              <div className="w-full lg:w-64 xl:w-72">
                <Image
                  src="/Kusum.jpeg"
                  alt="Portrait of Kusum Kanwar"
                  width={320}
                  height={320}
                  className="h-56 lg:h-64 w-full rounded-2xl object-cover"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Host</p>
                  <h3 className="text-xl lg:text-2xl font-semibold text-slate-900">Kusum Kanwar</h3>
                  <p className="text-sm lg:text-base text-slate-600">
                    Product Leader | WIP Cafe Owner | Crafting Authentic Soulful Experiences.
                  </p>
                  <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
                    25+ years building &amp; leading product teams
                  </span>
                </div>
                <p className="text-sm lg:text-base text-slate-900 leading-relaxed font-medium">
                  Brings the supporter’s voice into the room — so giving feels clear, warm, and trustworthy.
                </p>
                <ul className="space-y-1.5 text-sm lg:text-base text-slate-700 leading-relaxed">
                  <li>• Reduce hesitation with clearer choices and language</li>
                  <li>• Make the experience feel confident and calm</li>
                  <li>• Make monthly + upgrades feel respectful</li>
                </ul>
                <div className="pt-3 space-y-1.5">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center">
                      <Image
                        src={companyLogos['Salesforce'].src}
                        alt={companyLogos['Salesforce'].alt}
                        width={44}
                        height={44}
                        className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
                      />
                    </div>
                    <div className="h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center">
                      <Image
                        src={companyLogos['Shopify'].src}
                        alt={companyLogos['Shopify'].alt}
                        width={44}
                        height={44}
                        className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
                      />
                    </div>
                    <div className="h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center">
                      <Image
                        src={companyLogos['GoFundMe'].src}
                        alt={companyLogos['GoFundMe'].alt}
                        width={44}
                        height={44}
                        className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
                      />
                    </div>
                    <div className="h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center">
                      <Image
                        src={companyLogos['HP'].src}
                        alt={companyLogos['HP'].alt}
                        width={44}
                        height={44}
                        className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm text-slate-500 leading-relaxed">
                    Salesforce — Director, Product Management (~14y) • Shopify — Senior Product Lead (~2.5y) • GoFundMe — Principal
                    Product Manager (~1y) • HP — Business Analyst &amp; Project Manager (~2y)
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* REQUEST A SESSION / CONTACT */}
        <section id="contact" className="space-y-6 border-t border-slate-200/60 pt-12 pb-10">
          <div className="bg-slate-100/60 rounded-2xl lg:rounded-3xl border border-slate-200/50 p-8 lg:p-12 space-y-8 lg:space-y-10 max-w-4xl">
            <div className="space-y-3">
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">Request a session</h2>
              <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
                Send a short note. We’ll reply with a couple of time options and a lightweight prep checklist.
              </p>
            </div>

            {/* Form stays as is (frontend-only, mailto) */}
            <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-600">Name</label>
                <input
                  name="name"
                  type="text"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-600">Organization</label>
                <input
                  name="organization"
                  type="text"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-600">Role / team</label>
                <input
                  name="role"
                  type="text"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-600">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">Website (optional)</label>
              <input
                name="website"
                type="url"
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">What do you want to improve?</label>
              <textarea
                name="improve"
                rows={4}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">Link to donation page (optional)</label>
              <input
                name="donationPage"
                type="url"
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
              />
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-3.5 text-sm font-medium text-white shadow-md ring-1 ring-slate-900/5 hover:from-slate-800 hover:to-slate-600 hover:ring-slate-900/10 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[44px]"
              >
                Send request
              </button>
              <p className="text-xs lg:text-sm text-slate-500 leading-relaxed">
                We’ll reply with a couple of time options and a simple pre-work template.
              </p>
              <p className="text-xs lg:text-sm text-slate-500 leading-relaxed">
                Or email me directly at{' '}
                <a href="mailto:baiguisova@gmail.com" className="text-slate-900 underline underline-offset-2">
                  baiguisova@gmail.com
                </a>
                .
              </p>
            </div>
          </form>

            <p className="pt-2 text-xs text-slate-400">© {currentYear} Aklima Baiguisova.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
