import { useState, useEffect } from 'react';
import { TYPING_LINES } from '../constants';

function Typewriter() {
  const [text, setText] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPING_LINES[lineIdx];
    const delay = deleting ? 45 : charIdx === word.length ? 1600 : 88;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < word.length) {
          setText(word.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (charIdx > 0) {
          setText(word.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setLineIdx((i) => (i + 1) % TYPING_LINES.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, lineIdx, charIdx, deleting]);

  return (
    <span style={{ color: '#7c6aff', fontFamily: "'JetBrains Mono', monospace" }}>
      {text}
      <span style={{
        display: 'inline-block', width: 2, height: '1.1em',
        background: '#7c6aff', marginLeft: 3,
        verticalAlign: 'text-bottom',
        animation: 'blink 0.8s infinite',
      }} />
    </span>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : 'translateY(32px)',
    transition: `opacity 0.85s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.85s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '8rem 4rem 5rem',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Orbs */}
      <div style={{
        position: 'absolute', width: 640, height: 640, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,106,255,0.1) 0%, transparent 70%)',
        top: -180, right: -180, pointerEvents: 'none',
        animation: 'floatOrb 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', width: 440, height: 440, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,106,158,0.07) 0%, transparent 70%)',
        bottom: -100, left: -100, pointerEvents: 'none',
        animation: 'floatOrb 13s ease-in-out infinite reverse',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div style={{ ...fade(0.1), display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
          <div style={{ width: 32, height: 1, background: '#7c6aff' }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7c6aff',
          }}>
            Available for opportunities
          </span>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#4ade80',
            animation: 'pulseGlow 2s infinite',
          }} />
        </div>

        {/* Heading */}
        <h1 style={{
          ...fade(0.22),
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
          lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: '1rem',
        }}>
          Hey, I'm<br />
          <span style={{
            background: 'linear-gradient(135deg, #7c6aff 0%, #ff6a9e 55%, #ffb86a 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Sameer.
          </span>
        </h1>

        {/* Typing row */}
        <div style={{
          ...fade(0.36),
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: '#8885a8', marginBottom: '1.75rem',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: '#ff6a9e' }}>&gt;&nbsp;</span>
          <Typewriter />
        </div>

        {/* Description */}
        <p style={{
          ...fade(0.46),
          fontSize: '1.05rem', color: '#8885a8',
          maxWidth: 480, lineHeight: 1.85, marginBottom: '2.5rem',
        }}>
          A second-year CSE student at{' '}
          <strong style={{ color: '#f0eeff', fontWeight: 500 }}>
            MM Deemed University
          </strong>
          , building software that's fast, functional, and feels good to use.
        </p>

        {/* CTAs */}
        <div style={{ ...fade(0.56), display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'linear-gradient(135deg, #7c6aff, #ff6a9e)',
              color: '#fff', border: 'none',
              padding: '0.9rem 2.2rem', borderRadius: '0.5rem',
              fontSize: '0.9rem', fontWeight: 500,
              letterSpacing: '0.02em', cursor: 'none',
              boxShadow: '0 8px 32px rgba(124,106,255,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 14px 44px rgba(124,106,255,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,106,255,0.3)';
            }}
          >
            View My Work ↓
          </button>

          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent', color: '#f0eeff',
              border: '1px solid rgba(124,106,255,0.35)',
              padding: '0.9rem 2.2rem', borderRadius: '0.5rem',
              fontSize: '0.9rem', cursor: 'none',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#7c6aff';
              e.currentTarget.style.background = 'rgba(124,106,255,0.1)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124,106,255,0.35)';
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Get in Touch →
          </button>
        </div>

        {/* Stats row */}
        <div style={{ ...fade(0.7), display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          {[['2nd', 'Year CSE'], ['2+', 'Projects'], ['6+', 'Technologies'], ['∞', 'Coffee ☕']].map(([num, label]) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: '2rem', letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #7c6aff, #ff6a9e)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{num}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: '#8885a8', marginTop: 3,
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', right: '4rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        ...fade(1.1),
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
          letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8885a8',
        }}>Scroll</span>
        <div style={{
          width: 1, height: 56,
          background: 'linear-gradient(to bottom, #7c6aff, transparent)',
          animation: 'floatOrb 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
