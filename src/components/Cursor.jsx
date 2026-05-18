import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.13;
      ring.current.y += (pos.current.y - ring.current.y) * 0.13;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();

    const mutObs = new MutationObserver(addListeners);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 10, height: 10, borderRadius: '50%',
          background: '#7c6aff', pointerEvents: 'none',
          zIndex: 9999, mixBlendMode: 'screen',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40, borderRadius: '50%',
          border: `1.5px solid ${hovered ? '#ff6a9e' : 'rgba(124,106,255,0.5)'}`,
          pointerEvents: 'none', zIndex: 9998,
          transition: 'border-color 0.25s, width 0.2s, height 0.2s',
          ...(hovered ? { width: 56, height: 56 } : {}),
        }}
      />
    </>
  );
}
