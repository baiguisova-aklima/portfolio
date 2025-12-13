'use client';

import { useState, useEffect } from 'react';

const sections = [
  { id: 'about', label: '1 About' },
  { id: 'what-i-do', label: '2 What I do' },
  { id: 'experience', label: '3 Experience' },
  { id: 'who-i-work-with', label: '4 Who I work with' },
  { id: 'how-we-can-work-together', label: '5 How we work' },
  { id: 'recent-work', label: '6 Recent work' },
  { id: 'contact', label: '7 Contact' },
];

export default function SideNavigation() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-32 space-y-3">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`block text-sm font-medium transition-colors py-2 ${
            activeSection === section.id
              ? 'text-slate-900 font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
