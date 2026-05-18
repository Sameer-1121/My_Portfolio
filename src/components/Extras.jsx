import { useState, useEffect, useRef } from 'react';
import { useScrollProgress } from '../hooks';

export function ScrollProgress() {
  const pct = useScrollProgress();
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: 3, zIndex: 600,
      width: `${pct}%`,
      background: 'linear-gradient(90deg, #7c6aff, #ff6a9e)',
      transition: 'width 0.08s linear',
      boxShadow: '0 0 12px rgba(124,106,255,0.6)',
    }} />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100,
        width: 46, height: 46, borderRadius: '50%',
        background: 'rgba(124,106,255,0.15)',
        border: '1px solid rgba(124,106,255,0.3)',
        color: '#7c6aff', fontSize: '1.1rem', cursor: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.35s ease',
        backdropFilter: 'blur(8px)',
        pointerEvents: show ? 'all' : 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#7c6aff';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(124,106,255,0.15)';
        e.currentTarget.style.color = '#7c6aff';
        e.currentTarget.style.transform = show ? 'none' : 'translateY(16px)';
      }}
    >
      ↑
    </button>
  );
}

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function EasterEgg() {
  const [show, setShow] = useState(false);
  const seq = useRef([]);

  useEffect(() => {
    const fn = (e) => {
      seq.current.push(e.key);
      if (seq.current.length > 10) seq.current.shift();
      if (seq.current.join(',') === KONAMI.join(',')) {
        setShow(true);
        seq.current = [];
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 800,
      background: 'rgba(8,8,14,0.97)', backdropFilter: 'blur(16px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '1rem',
      animation: 'fadeUp 0.4s ease',
    }}>
      <div style={{ fontSize: '3.5rem' }}>🤫</div>
      <div style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2rem',
        background: 'linear-gradient(135deg, #7c6aff, #ff6a9e)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>You found it!</div>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem',
        color: '#8885a8', textAlign: 'center',
        maxWidth: 360, lineHeight: 1.85,
      }}>
        Konami Code activated ✓<br />
        Like JARVIS, this portfolio hides secrets.<br />
        <span style={{ color: '#7c6aff' }}>↑ ↑ ↓ ↓ ← → ← → B A</span>
      </p>
      <button
        onClick={() => setShow(false)}
        style={{
          marginTop: '0.5rem', padding: '0.75rem 1.75rem',
          background: 'linear-gradient(135deg, #7c6aff, #ff6a9e)',
          color: '#fff', border: 'none', borderRadius: '0.5rem',
          cursor: 'none', fontSize: '0.88rem', fontWeight: 500,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        Back to Portfolio
      </button>
    </div>
  );
}
