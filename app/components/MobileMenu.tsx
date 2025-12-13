'use client';

import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'what-i-do', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-slate-900 transition-all ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-slate-900 transition-all ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-slate-900 transition-all ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-8">
          <nav className="space-y-6">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-slate-900 hover:text-slate-700 transition-colors"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
