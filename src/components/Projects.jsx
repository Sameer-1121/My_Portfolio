import { useState } from 'react';
import { useReveal } from '../hooks';
import { PROJECTS } from '../constants';

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

function ProjectCard({ project, delay, visible }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hov ? 'translateY(-7px)' : 'none'
          : 'translateY(38px)',
        transition: `opacity 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.75s ${delay}s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s, border-color 0.3s, background 0.3s`,
        background: hov ? `${project.color}09` : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hov ? project.color + '55' : 'rgba(124,106,255,0.12)'}`,
        borderRadius: '1.25rem', padding: '2.25rem',
        position: 'relative', overflow: 'hidden',
        boxShadow: hov ? `0 20px 60px ${project.color}18` : 'none',
        cursor: 'default',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${project.color}, transparent)`,
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left', transition: 'transform 0.4s ease',
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: `radial-gradient(circle, ${project.color}14 0%, transparent 70%)`,
        opacity: hov ? 1 : 0, transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }} />

      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{project.emoji}</div>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
        color: '#8885a8', letterSpacing: '0.1em', marginBottom: '0.75rem',
      }}>{project.id} / project</div>

      <div style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: '1.75rem', letterSpacing: '-0.03em', marginBottom: '0.4rem',
      }}>{project.name}</div>

      <div style={{
        fontSize: '0.75rem', color: project.color,
        marginBottom: '1rem',
        fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em',
      }}>{project.subtitle}</div>

      <p style={{
        fontSize: '0.9rem', color: '#8885a8',
        lineHeight: 1.75, marginBottom: '1.75rem',
      }}>{project.desc}</p>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              background: 'rgba(124,106,255,0.09)', color: '#8885a8',
              padding: '0.22rem 0.65rem', borderRadius: '0.3rem',
              border: '1px solid rgba(124,106,255,0.14)', letterSpacing: '0.06em',
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[['GH', project.github], project.live && ['↗', project.live]].filter(Boolean).map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{
                width: 34, height: 34,
                border: '1px solid rgba(124,106,255,0.2)',
                borderRadius: '0.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#8885a8', textDecoration: 'none',
                fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace",
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.color;
                e.currentTarget.style.color = project.color;
                e.currentTarget.style.background = project.color + '18';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124,106,255,0.2)';
                e.currentTarget.style.color = '#8885a8';
                e.currentTarget.style.background = 'transparent';
              }}
            >{label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, vis] = useReveal();

  return (
    <section id="projects" style={{ padding: '8rem 4rem', background: '#08080e' }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(28px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <SectionLabel num="02" text="Projects" />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.04em',
            marginBottom: '3rem',
          }}>
            What I've shipped
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={0.1 + i * 0.13}
              visible={vis}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
