import { useReveal } from '../hooks';
import { TIMELINE, CURRENTLY } from '../constants';

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

export default function About() {
  const [ref, vis] = useReveal();

  const reveal = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'none' : 'translateY(30px)',
    transition: `opacity 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <section id="about" style={{ padding: '8rem 4rem', background: '#0a0a12', position: 'relative' }}>
      {/* Animated grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(124,106,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,106,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={reveal(0)}>
          <SectionLabel num="01" text="About" />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.04em',
            marginBottom: '3rem',
          }}>
            The person behind the code
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '5rem', alignItems: 'start',
        }}>
          {/* Left: bio + timeline */}
          <div>
            {[
              <>I'm <strong style={{ color: '#f0eeff', fontWeight: 500 }}>Sameer</strong>, a second-year Computer Science student at <strong style={{ color: '#f0eeff', fontWeight: 500 }}>Maharishi Markandeshwar Deemed to be University</strong>. I love turning ideas into real, working software.</>,
              <>My toolkit spans frontend (React, HTML/CSS/JS) and backend (Python, Java). Always learning — through projects, late nights, and a lot of console.log().</>,
              <>When I'm not coding, I'm deep in <strong style={{ color: '#7c6aff' }}>🎵 music</strong>, rewatching a <strong style={{ color: '#ff6a9e' }}>🎬 biopic</strong>, or lost in a <strong style={{ color: '#7c6aff' }}>🎮 game</strong>.</>,
            ].map((p, i) => (
              <p key={i} style={{
                ...reveal(0.12 + i * 0.1),
                fontSize: '1rem', color: '#8885a8',
                lineHeight: 1.9, marginBottom: '1.25rem',
              }}>{p}</p>
            ))}

            {/* Timeline */}
            <div style={reveal(0.45)}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: '1.1rem', letterSpacing: '-0.02em',
                margin: '2.5rem 0 1.5rem',
              }}>Journey</h3>
              <div style={{ position: 'relative', paddingLeft: 24 }}>
                <div style={{
                  position: 'absolute', left: 6, top: 6, bottom: 0,
                  width: 1, background: 'rgba(124,106,255,0.2)',
                }} />
                {TIMELINE.map(({ year, event, sub, active }, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.75rem', position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: -24 + 2, top: 4,
                      width: 10, height: 10, borderRadius: '50%',
                      background: active ? '#7c6aff' : '#0a0a12',
                      border: '2px solid #7c6aff', zIndex: 1,
                      boxShadow: active ? '0 0 14px rgba(124,106,255,0.6)' : 'none',
                    }} />
                    <div>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        color: '#7c6aff', letterSpacing: '0.1em', marginBottom: 3,
                      }}>{year}</div>
                      <div style={{ fontSize: '0.9rem', color: '#f0eeff', fontWeight: 400 }}>{event}</div>
                      <div style={{ fontSize: '0.78rem', color: '#8885a8', marginTop: 2 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Currently card */}
          <div style={{
            ...reveal(0.28),
            background: 'rgba(124,106,255,0.05)',
            border: '1px solid rgba(124,106,255,0.15)',
            borderRadius: '1.25rem', padding: '2rem',
            backdropFilter: 'blur(12px)',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#7c6aff', marginBottom: '1.5rem',
            }}>// Currently</div>

            {CURRENTLY.map(({ icon, label, val }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '0.9rem',
                padding: '0.85rem 0',
                borderBottom: '1px solid rgba(124,106,255,0.07)',
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '0.6rem',
                  background: 'rgba(124,106,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', flexShrink: 0,
                }}>{icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                    color: '#8885a8', letterSpacing: '0.12em', textTransform: 'uppercase',
                  }}>{label}</div>
                  <div style={{ fontSize: '0.87rem', color: '#f0eeff', fontWeight: 400, marginTop: 2 }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
