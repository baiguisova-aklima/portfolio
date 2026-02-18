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

export default function Quickwins() {
  const currentYear = new Date().getFullYear();
  const buildSessionMailto = (sessionType: string) => {
    const subject = encodeURIComponent(`Request: ${sessionType}`);
    const body = encodeURIComponent(
      [
        `Selected session: ${sessionType}`,
        '',
        'Organization:',
        'Main online fundraising challenge:',
        'Preferred dates:',
      ].join('\n')
    );

    return `mailto:baiguisova@gmail.com?subject=${subject}&body=${body}`;
  };

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
    const sessionType = (data.get('sessionType') || '').toString();

    const subject = encodeURIComponent(
      sessionType || 'Fundraising Quick Wins Lab request'
    );

    const bodyLines = [
      sessionType && `Selected session: ${sessionType}`,
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
    <main className="min-h-screen bg-white text-slate-900 text-[1rem] sm:text-[1.06rem] lg:text-[1.12rem]">
      <ScrollToTop />

      {/* Local sticky nav for this page */}
      <header className="sticky top-0 z-[9999] bg-white border-b border-slate-200/60">
        <nav className="max-w-5xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
          <a href="#hero" className="flex items-center">
            <Image
              src="/Images/Logo_QWL.png"
              alt="Fundraising Quick Wins Lab logo"
              width={420}
              height={96}
              className="h-20 w-auto cursor-pointer"
              priority
            />
          </a>
          <div className="hidden md:flex items-center gap-6 text-xs lg:text-sm text-slate-500">
            <a href="#free-options" className="hover:text-indigo-700 transition-colors">
              Free options
            </a>
            <a href="#how-it-works" className="hover:text-indigo-700 transition-colors">
              What format
            </a>
            <a href="#hosts" className="hover:text-indigo-700 transition-colors">
              Who runs it
            </a>
            <a href="#contact" className="hover:text-indigo-700 transition-colors">
              Let's talk
            </a>
          </div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 lg:px-0 py-14 lg:py-20 space-y-16 lg:space-y-20">
        {/* HERO */}
        <section id="hero" className="space-y-6">
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
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="#free-options"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-800 to-indigo-700 px-7 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-indigo-900/10 hover:from-blue-700 hover:to-indigo-600 hover:ring-indigo-800/20 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-md"
            >
              Choose free session
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors group"
            >
              Let's talk
              <span className="ml-1 text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>
          <p className="text-sm lg:text-base text-slate-500 pt-1">
            You’re carrying a lot. This is designed to make one part of your week feel lighter.
          </p>
        </section>

        {/* FREE OPTIONS */}
        <section id="free-options" className="space-y-6 border-t border-slate-200/60 pt-14">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
            Free support
          </span>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">Choose your free format</h2>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed">
            Supporters come with good intentions. The experience should help them follow through.
          </p>

          <div className="grid gap-6 lg:gap-7 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200/40 bg-white p-6 lg:p-7 space-y-5 shadow-sm shadow-slate-200/50">
              <div className="space-y-2">
                <h3 className="text-xl lg:text-2xl font-semibold text-slate-900">
                  Deep-dive on your flow (Free · 2 x 45 min)
                </h3>
                <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                  We review your real online fundraising flow and give your team a focused quick-win plan for your top 3 priorities.
                </p>
              </div>

              <details className="group rounded-2xl border border-slate-200/50 bg-slate-50/50 p-4">
                <summary className="cursor-pointer list-none text-sm lg:text-base font-medium text-slate-900 flex items-center justify-between">
                  <span>What is included</span>
                  <span className="text-slate-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-3 space-y-2 text-sm lg:text-base text-slate-700 leading-relaxed">
                  <li>• Session 1 (45 min): mission, goals, donor context, and top 3 challenge areas</li>
                  <li>• Pre-work by us (2-5h, up to ~2 weeks turnaround) based on your materials and public channels</li>
                  <li>• Session 2 (45 min): best practices, quick-win recommendations, optional prototype/demo</li>
                  <li>• Optional 60/120-day check-in</li>
                </ul>
              </details>

              <details className="group rounded-2xl border border-slate-200/50 bg-slate-50/50 p-4">
                <summary className="cursor-pointer list-none text-sm lg:text-base font-medium text-slate-900 flex items-center justify-between">
                  <span>Who should join</span>
                  <span className="text-slate-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-3 space-y-2 text-sm lg:text-base text-slate-700 leading-relaxed">
                  <li>• 1-2 people who own online fundraising performance</li>
                  <li>• Person who manages donation channels (site, forms, email, social, ads)</li>
                  <li>• Optional: person handling analytics and CRM related to donor journey</li>
                </ul>
              </details>

              <a
                href={buildSessionMailto('Free Deep-dive on your flow (2 x 45 min)')}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-800 to-indigo-700 px-6 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-indigo-900/10 hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-md"
              >
                Contact us about this option
              </a>
            </article>

            <article className="rounded-3xl border border-slate-200/40 bg-white p-6 lg:p-7 space-y-5 shadow-sm shadow-slate-200/50">
              <div className="space-y-2">
                <h3 className="text-xl lg:text-2xl font-semibold text-slate-900">
                  Quick guidance call (Free · 45 min)
                </h3>
                <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                  We share practical online fundraising best practices and answer the questions you and your team are dealing with right now.
                </p>
              </div>

              <details className="group rounded-2xl border border-slate-200/50 bg-slate-50/50 p-4">
                <summary className="cursor-pointer list-none text-sm lg:text-base font-medium text-slate-900 flex items-center justify-between">
                  <span>What is included</span>
                  <span className="text-slate-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-3 space-y-2 text-sm lg:text-base text-slate-700 leading-relaxed">
                  <li>• 45-minute expert conversation focused on your priorities</li>
                  <li>• Relevant industry patterns and common mistakes to avoid</li>
                  <li>• Q&A on your current online fundraising setup</li>
                  <li>• Suggested next steps your team can apply quickly</li>
                </ul>
              </details>

              <details className="group rounded-2xl border border-slate-200/50 bg-slate-50/50 p-4">
                <summary className="cursor-pointer list-none text-sm lg:text-base font-medium text-slate-900 flex items-center justify-between">
                  <span>Who should join</span>
                  <span className="text-slate-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-3 space-y-2 text-sm lg:text-base text-slate-700 leading-relaxed">
                  <li>• 1-2 people who own online fundraising performance</li>
                  <li>• Person who manages donation channels (site, forms, email, social, ads)</li>
                  <li>• Optional: person handling analytics and CRM related to donor journey</li>
                </ul>
              </details>

              <a
                href={buildSessionMailto('Free Quick guidance call (45 min)')}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-800 to-indigo-700 px-6 py-3 text-sm font-medium text-white shadow-sm ring-1 ring-indigo-900/10 hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-md"
              >
                Contact us about this option
              </a>
            </article>
          </div>
        </section>

        <p className="text-sm lg:text-base text-slate-500">
          This isn’t about squeezing your team. It’s about removing avoidable friction for supporters.
        </p>
        {/* 3 CARDS */}
        <section id="about" className="space-y-7 border-t border-slate-200/60 pt-14">
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
            <article className="rounded-3xl border border-slate-200/40 bg-white overflow-hidden shadow-sm shadow-slate-200/40 transition-colors duration-200 hover:bg-slate-50 hover:border-slate-300">
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
            <article className="rounded-3xl border border-slate-200/40 bg-white overflow-hidden shadow-sm shadow-slate-200/40 transition-colors duration-200 hover:bg-slate-50 hover:border-slate-300">
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
            <article className="rounded-3xl border border-slate-200/40 bg-white overflow-hidden shadow-sm shadow-slate-200/40 transition-colors duration-200 hover:bg-slate-50 hover:border-slate-300">
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

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="space-y-6 border-t border-slate-200/60 pt-14">
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
              <span className="font-semibold">We review together</span> — We walk through the experience, name what’s creating
              friction or doubt, and choose one or two priorities that matter most right now (finishing the gift, monthly giving,
              gentle upgrades, repeat giving).
            </li>
            <li>
              <span className="font-semibold">You get the write-up</span> — A short summary of what we saw + recommended changes + examples
              you can reuse.
            </li>
          </ol>
          <p className="text-sm lg:text-base text-slate-500">
            Small changes can make giving feel much easier.
          </p>
        </section>

        {/* WHO RUNS THE LAB */}
        <section id="hosts" className="space-y-6 border-t border-slate-200/60 pt-14">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
            Team
          </span>
          <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">People behind the lab</h2>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed max-w-3xl">
            We respect the reality of nonprofit teams: too much to do, not enough time — and work that truly matters.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Aklima spotlight */}
            <article className="h-full rounded-3xl border border-slate-200/40 bg-white p-6 lg:p-7 space-y-5 shadow-sm shadow-slate-200/40">
              <div className="w-full">
                <Image
                  src="/aklima-sun.jpg"
                  alt="Portrait of Aklima Baiguisova"
                  width={320}
                  height={320}
                  className="h-72 w-full rounded-2xl object-cover object-[50%_30%]"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Host</p>
                  <h3 className="text-xl lg:text-2xl font-semibold text-slate-900">Aklima Baiguisova</h3>
                  <p className="text-sm lg:text-base text-slate-600">Product leader | Strong ownership &amp; execution</p>
                  <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
                    12+ years in product &amp; fundraising
                  </span>
                </div>
                <div className="pt-3 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Experience</p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 flex items-center gap-2.5 min-h-[78px]">
                      <Image
                        src={companyLogos['Fundraise Up'].src}
                        alt={companyLogos['Fundraise Up'].alt}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                      <p className="text-sm text-slate-700 leading-snug">Fundraise Up<br />Head of Product</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 flex items-center gap-2.5 min-h-[78px]">
                      <Image
                        src={companyLogos['Gett'].src}
                        alt={companyLogos['Gett'].alt}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                      <p className="text-sm text-slate-700 leading-snug">Gett<br />Product Manager</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 flex items-center gap-2.5 min-h-[78px] sm:col-span-2">
                      <Image
                        src={companyLogos['EL 6'].src}
                        alt={companyLogos['EL 6'].alt}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                      <p className="text-sm text-slate-700 leading-snug">EL 6<br />Product Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Kusum spotlight */}
            <article className="h-full rounded-3xl border border-slate-200/40 bg-white p-6 lg:p-7 space-y-5 shadow-sm shadow-slate-200/40">
              <div className="w-full">
                <Image
                  src="/Kusum.jpeg"
                  alt="Portrait of Kusum Kanwar"
                  width={320}
                  height={320}
                  className="h-72 w-full rounded-2xl object-cover object-center"
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Host</p>
                  <h3 className="text-xl lg:text-2xl font-semibold text-slate-900">Kusum Kanwar</h3>
                  <p className="text-sm lg:text-base text-slate-600">
                    Product Leader | Crafting Authentic Soulful Experiences.
                  </p>
                  <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
                    25+ years building &amp; leading product teams
                  </span>
                </div>
                <div className="pt-3 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Experience</p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 flex items-center gap-2.5 min-h-[78px]">
                      <Image
                        src={companyLogos['Salesforce'].src}
                        alt={companyLogos['Salesforce'].alt}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                      <p className="text-sm text-slate-700 leading-snug">Salesforce<br />Director, Product Management</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 flex items-center gap-2.5 min-h-[78px]">
                      <Image
                        src={companyLogos['Shopify'].src}
                        alt={companyLogos['Shopify'].alt}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                      <p className="text-sm text-slate-700 leading-snug">Shopify<br />Senior Product Lead</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 flex items-center gap-2.5 min-h-[78px] sm:col-span-2">
                      <Image
                        src={companyLogos['GoFundMe'].src}
                        alt={companyLogos['GoFundMe'].alt}
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                      <p className="text-sm text-slate-700 leading-snug">GoFundMe<br />Principal Product Manager</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* REQUEST A SESSION / CONTACT */}
        <section id="contact" className="space-y-6 border-t border-slate-200/60 pt-14 pb-8">
          <div className="bg-slate-100/60 rounded-2xl lg:rounded-3xl border border-slate-200/50 p-7 lg:p-10 space-y-7 lg:space-y-8 max-w-4xl">
            <div className="space-y-3">
              <h2 className="text-2xl lg:text-3xl font-semibold text-slate-900">Let's talk</h2>
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
              <label className="block text-xs font-medium text-slate-600">Session type</label>
              <select
                name="sessionType"
                defaultValue="Request: Free Deep-dive on your flow (2 x 45 min)"
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
              >
                <option value="Request: Free Deep-dive on your flow (2 x 45 min)">
                  Free Deep-dive on your flow (2 x 45 min)
                </option>
                <option value="Request: Free Quick guidance call (45 min)">
                  Free Quick guidance call (45 min)
                </option>
              </select>
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
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-800 to-indigo-700 px-8 py-3.5 text-sm font-medium text-white shadow-sm ring-1 ring-indigo-900/10 hover:from-blue-700 hover:to-indigo-600 hover:ring-indigo-800/20 transition-all duration-300 ease-out hover:-translate-y-[1px] hover:shadow-md min-h-[44px]"
              >
                Send request
              </button>
              <p className="text-xs lg:text-sm text-slate-500 leading-relaxed">
                We’ll reply with a couple of time options and a simple pre-work template.
              </p>
              <p className="text-xs lg:text-sm text-slate-500 leading-relaxed">
                Or email me directly at{' '}
                <a href="mailto:baiguisova@gmail.com" className="text-indigo-700 underline underline-offset-2 hover:text-indigo-800">
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
