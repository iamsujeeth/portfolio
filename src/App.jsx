import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PipelineDiagram from './components/PipelineDiagram'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

// Charts library is heavy, so load the Skills section separately
const Skills = lazy(() => import('./components/Skills'))

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <PipelineDiagram />
        <Suspense fallback={<div className="section h-96" />}>
          <Skills />
        </Suspense>
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </>
  )
}
