import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Achievements from './components/Achievements'
import DataFlow from './components/DataFlow'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Achievements />
        <DataFlow />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </>
  )
}
