import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import { ThemeProvider } from "./context/ThemeContext";
import Altas from "./components/Altas";

// Lazy loading de componentes
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Plans = lazy(() => import("./components/Plans"));
const Coverage = lazy(() => import("./components/Coverage"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Payment = lazy(() => import("./components/Payment"));
const AnimatedSection = lazy(() => import("./components/AnimatedSection"));
const Grilla = lazy(() => import("./components/Grilla"));
const Terminos = lazy(() => import("./components/terminos"));
const Legal = lazy(() => import("./components/legal"));
const Privacidad = lazy(() => import("./components/privacidad"));
const FAQ = lazy(() => import("./components/FAQ"));
const Reclamos = lazy(() => import("./components/Reclamos"));
const QuienesSomos = lazy(() => import("./components/QuienesSomos"));
const Banner = lazy(() => import("./components/Banner"));
const Offers = lazy(() => import("./components/Ofertas"));

// // //TODO: Agregar: preguntas frecuentes, cambiar el about por frases comovelocom.com
// // //TODO: quienes somos
//TODO: Agregar sección reclamos, ir mostrando un formulario y en cada instancia ir mostrando información y fotos para solucionar dependiendo del reclamo
// // //TODO: Agregar modo claro/oscuro
// // //TODO: ofertas
//TODO: en cobertura agregar ampliamos nuevas zonas, y mostrar fotos
// // //TODO: banner futbol en video digital
//TODO: mas de 200canales, agregar link grilla, logos de canales
//TODO: En que podemos ayudarte
//TODO: seguinos en redes

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar />
          <main>
            <Suspense fallback={<div>Cargando...</div>}>
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
                      {/* <AnimatedSection>
                      <Offers /> 
                    </AnimatedSection> */}
                      <AnimatedSection>
                        <Banner
                          backgroundImage="/patchera.jpg"
                          title="Más de 200 canales en HD"
                          subtitle="Disfruta de entretenimiento sin límites"
                          logos={[
                            {
                              src: "/canales/animalplanet.png",
                              alt: "Animal Planet",
                            },
                            { src: "/canales/natgeo.png", alt: "Nat Geo" },
                            { src: "/canales/hbo.png", alt: "HBO" },
                            { src: "/canales/espn.png", alt: "ESPN" },
                            { src: "/canales/fox.png", alt: "Fox" },
                            { src: "/canales/disney.png", alt: "Disney" },
                          ]}
                          height="h-[300px]"
                          width="w-[100%]"
                          titleStyle="text-3xl font-bold tracking-wide"
                          subtitleStyle="text-lg"
                          overlayColor={{
                            light: "rgba(255, 255, 255, 0.7)",
                            dark: "rgba(0, 0, 0, 0.6)",
                          }}
                          className="flex flex-col justify-between mx-auto"
                          buttonText="Ver Grilla"
                          buttonUrl="/grilla" // Redirige a un ID de sección
                          buttonStyle="bg-blue-600 text-white hover:bg-blue-500"
                          buttonTarget="_self"
                          logosContainerClass="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6 w-full max-w-5xl"
                          logoClass="p-2 bg-white rounded-lg shadow-sm hover:shadow-md"
                        />

                        <Banner
                          backgroundImage="/canales/canalessd.png"
                          title="TV 85 Canales Estándar"
                          logos={[
                            { src: "/canales/canalessd.png", alt: "Canal 1" },
                            { src: "/canales/canalessd.png", alt: "Canal 2" },
                            { src: "/canales/canalessd.png", alt: "Canal 3" },
                            { src: "/canales/canalessd.png", alt: "Canal 4" },
                            { src: "/canales/canalessd.png", alt: "Canal 5" },
                            { src: "/canales/canalessd.png", alt: "Canal 6" },
                          ]}
                          height="h-[300px]"
                          titleStyle="text-2xl font-bold"
                          overlayColor={{
                            light: "rgba(255, 255, 255, 0.8)",
                            dark: "rgba(0, 0, 0, 0.6)",
                          }}
                        />
                      </AnimatedSection>
                      <AnimatedSection>
                        <About />
                      </AnimatedSection>
                      <AnimatedSection>
                        <Banner
                          backgroundImage="/canales/bannerfutbol.webp"
                          title="Vive el Fútbol por Video Digital"
                          subtitle="Canales 231 y 232 por HD --- 69.6 y 69.7 por ISDBT"
                          height="h-[200px]"
                          titleStyle="text-2xl font-bold"
                          subtitleStyle="text-sm"
                          overlayColor={{
                            light: "rgba(255, 255, 255, 0.5)",
                            dark: "rgba(0, 0, 0, 0.6)",
                          }}
                        />
                      </AnimatedSection>
                      <AnimatedSection>
                        <Coverage />
                      </AnimatedSection>
                      <AnimatedSection>
                        <Testimonials />
                      </AnimatedSection>
                      {/* <AnimatedSection>
                    <Payment />
                    </AnimatedSection> */}
                      <AnimatedSection>
                        <FAQ />
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

                <Route path="/grilla" element={<Grilla />} />
                <Route path="/altas" element={<Altas />} />
                <Route path="/terminos" element={<Terminos />} />
                <Route path="/pagos" element={<Payment />} />
                <Route path="/reclamos" element={<Reclamos />} />
                <Route path="/quienes-somos" element={<QuienesSomos />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/privacidad" element={<Privacidad />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
