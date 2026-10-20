import { About } from '../sections/About';
import { Contact } from '../sections/Contact';
import { Education } from '../sections/Education';
import { Experience } from '../sections/Experience';
import { Hero } from '../sections/Hero';
import { SelectedWork } from '../sections/SelectedWork';
import { Skills } from '../sections/Skills';

export function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Experience />
      <About />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
