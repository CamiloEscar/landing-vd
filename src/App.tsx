import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Plans from './components/Plans';
import Coverage from './components/Coverage';
import Testimonials from './components/Testimonials';
import Payment from './components/Payment';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AnimatedSection from './components/AnimatedSection';
import Grilla from './components/Grilla';
import Terminos from './components/terminos';  // Importar nuevo componente
import Legal from './components/legal';        // Importar nuevo componente
import Privacidad from './components/privacidad';  // Importar nuevo componente

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            {/* Ruta principal (Home) */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <AnimatedSection>
                    <Plans />
                  </AnimatedSection>
                  <AnimatedSection>
                    <About />
                  </AnimatedSection>
                  <AnimatedSection>
                    <Coverage />
                  </AnimatedSection>
                  <AnimatedSection>
                    <Testimonials />
                  </AnimatedSection>
                  <AnimatedSection>
                    <Payment />
                  </AnimatedSection>
                </>
              }
            />

            {/* Ruta para /grilla */}
            <Route
              path="/grilla"
              element={
                <AnimatedSection>
                  <Grilla />
                </AnimatedSection>
              }
            />

            {/* Nueva ruta para /terminos */}
            <Route path="/terminos" element={<Terminos />} />

            {/* Nueva ruta para /legal */}
            <Route path="/legal" element={<Legal />} />

            {/* Nueva ruta para /privacidad */}
            <Route path="/privacidad" element={<Privacidad />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
