import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

const scrollTo = (id) => {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
};

export default function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.1rem 4rem',
        background: scrolled ? 'rgba(8,8,14,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(124,106,255,0.12)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.4rem',
            letterSpacing: '-0.04em', textDecoration: 'none',
            background: 'linear-gradient(135deg, #7c6aff, #ff6a9e)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}
        >
          sameer.
        </a>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {NAV_LINKS.map((link) => {
            const isActive = active === link.toLowerCase();
            return (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  background: 'none', border: 'none', cursor: 'none',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: isActive ? '#7c6aff' : '#8885a8',
                  transition: 'color 0.25s',
                  position: 'relative', padding: '4px 0',
                }}
              >
                {link}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: isActive ? '100%' : '0%', height: 1,
                  background: '#7c6aff', transition: 'width 0.3s ease',
                }} />
              </button>
            );
          })}
        </div>

        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            display: 'flex', flexDirection: 'column', gap: 5, padding: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block', width: 24, height: 2,
                background: '#8885a8', borderRadius: 2,
                transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7px) rotate(45deg)'
                    : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(8,8,14,0.97)', backdropFilter: 'blur(16px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.35s ease',
      }}>
        {NAV_LINKS.map((link, i) => (
          <button
            key={link}
            onClick={() => { scrollTo(link); setMenuOpen(false); }}
            style={{
              background: 'none', border: 'none', cursor: 'none',
              fontFamily: "'Syne', sans-serif", fontWeight: 700,
              fontSize: '2.5rem', letterSpacing: '-0.04em',
              color: '#f0eeff', transition: `all 0.4s ${i * 0.07}s ease`,
              transform: menuOpen ? 'translateY(0)' : 'translateY(24px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            {link}
          </button>
        ))}
      </div>
    </>
  );
}
