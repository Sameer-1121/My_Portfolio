import Cursor from './components/Cursor';
import Particles from './components/Particles';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { Contact, Footer } from './components/Contact';
import { ScrollProgress, BackToTop, EasterEgg } from './components/Extras';
import { useActiveSection } from './hooks';

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'contact'];

export default function App() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      {/* Global overlays */}
      <Cursor />
      <ScrollProgress />
      <Particles />

      {/* Navigation */}
      <Nav active={active} />

      {/* Page sections */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />

      {/* Floating UI */}
      <BackToTop />
      <EasterEgg />
    </>
  );
}
