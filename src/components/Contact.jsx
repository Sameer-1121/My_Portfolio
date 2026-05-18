import { useReveal } from '../hooks';
import { CONTACTS } from '../constants';

function SectionLabel({ num, text }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7c6aff',
    }}>
      <span>{num}</span>
      <div style={{ width: 36, height: 1, background: '#7c6aff' }} />
      <span>{text}</span>
    </div>
  );
}

export function Contact() {
  const [ref, vis] = useReveal();

  const reveal = (d) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : 'translateY(28px)',
    transition: `opacity 0.75s ${d}s cubic-bezier(0.16,1,0.3,1), transform 0.75s ${d}s cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <section
      id="contact"
      style={{
        padding: '8rem 4rem', background: '#08080e',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Centre glow */}
      <div style={{
        position: 'absolute', width: 640, height: 640, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,106,255,0.07) 0%, transparent 70%)',
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ ...reveal(0), display: 'flex', justifyContent: 'center' }}>
          <SectionLabel num="04" text="Contact" />
        </div>

        <h2 style={{
          ...reveal(0.1),
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.04em',
          lineHeight: 1.1, marginBottom: '1rem',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #7c6aff, #ff6a9e)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Let's build<br />something dope.
          </span>
        </h2>

        <p style={{
          ...reveal(0.2),
          fontSize: '1rem', color: '#8885a8',
          lineHeight: 1.8, marginBottom: '3rem',
          maxWidth: 420, margin: '0 auto 3rem',
        }}>
          Open to internships, collabs, or just vibing over tech, music, or games. Hit me up.
        </p>

        <div style={{ ...reveal(0.3), display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {CONTACTS.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.65rem',
                padding: '0.9rem 1.75rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(124,106,255,0.18)',
                borderRadius: '0.6rem', textDecoration: 'none',
                color: '#f0eeff', fontSize: '0.9rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#7c6aff';
                e.currentTarget.style.background = 'rgba(124,106,255,0.1)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,106,255,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,106,255,0.18)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{
      padding: '1.75rem 4rem', background: '#0a0a12',
      borderTop: '1px solid rgba(124,106,255,0.1)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
      color: '#8885a8', letterSpacing: '0.06em',
      flexWrap: 'wrap', gap: '0.5rem',
    }}>
      <span>© 2025 Sameer · MM Deemed University</span>
      <span style={{ color: '#7c6aff' }}>Built with React + ❤️</span>
    </footer>
  );
}
