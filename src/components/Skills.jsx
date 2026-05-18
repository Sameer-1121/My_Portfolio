import { useState, useEffect } from 'react';
import { useReveal } from '../hooks';
import { SKILLS } from '../constants';

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

function SkillCard({ skill, delay, visible }) {
  const [hov, setHov] = useState(false);
  const [barW, setBarW] = useState(0);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setBarW(skill.level), delay * 1000 + 350);
      return () => clearTimeout(t);
    }
  }, [visible, delay, skill.level]);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hov ? 'translateY(-6px) scale(1.02)' : 'none'
          : 'translateY(28px)',
        transition: `opacity 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     transform 0.7s ${delay}s cubic-bezier(0.16,1,0.3,1),
                     box-shadow 0.3s, border-color 0.3s, background 0.3s`,
        background: hov ? `${skill.color}0c` : 'rgba(255,255,255,0.025)',
        border: `1px solid ${hov ? skill.color + '55' : 'rgba(124,106,255,0.12)'}`,
        borderRadius: '1rem', padding: '1.5rem 1.25rem',
        textAlign: 'center', cursor: 'default',
        boxShadow: hov ? `0 12px 40px ${skill.color}1a` : 'none',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{skill.icon}</div>

      <div style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: '0.95rem', marginBottom: '0.85rem',
      }}>{skill.name}</div>

      {/* Bar */}
      <div style={{
        width: '100%', height: 3,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 2, overflow: 'hidden',
      }}>
        <div style={{
          width: `${barW}%`, height: '100%',
          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
          borderRadius: 2,
          transition: 'width 1.3s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: hov ? `0 0 10px ${skill.color}` : 'none',
        }} />
      </div>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
        color: '#8885a8', marginTop: '0.5rem', letterSpacing: '0.08em',
      }}>{skill.level}%</div>
    </div>
  );
}

export default function Skills() {
  const [ref, vis] = useReveal();

  return (
    <section id="skills" style={{
      padding: '8rem 4rem', background: '#0a0a12',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative orb */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,106,158,0.05) 0%, transparent 70%)',
        bottom: -150, right: -150, pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(28px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <SectionLabel num="03" text="Skills" />
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.04em',
            marginBottom: '3rem',
          }}>
            My toolkit
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1rem',
        }}>
          {SKILLS.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              delay={0.08 + i * 0.08}
              visible={vis}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
