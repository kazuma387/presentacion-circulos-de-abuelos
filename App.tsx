import React, { useMemo, useState, useEffect } from 'react';
import { GRANDPARENTS_DATA, APP_TITLE, APP_SUBTITLE } from './constants';
import CustomBarChart from './components/CustomBarChart';
import CustomPieChart from './components/CustomPieChart';
import StatCard from './components/StatCard';
import AnalysisSection from './components/AnalysisSection';
import { ChevronLeft, ChevronRight, Presentation } from 'lucide-react';

// ==================================================================================
// CONFIGURACIÓN DE IMAGEN DE FONDO
// ==================================================================================
const BACKGROUND_IMAGE_URL = 'https://mpps.gob.ve/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-30-at-00.55.21-1.jpeg';

// ==================================================================================
// IMÁGENES DE PORTADA
// ==================================================================================
const COVER_IMAGES = [
  "https://i.ibb.co/1g3hWNt/PM-removebg-preview.png",
  "https://i.ibb.co/FbS4xCh5/images-removebg-preview.png",
  "https://i.ibb.co/fzYdCSZ0/images-removebg-preview-2.png"
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculate total participants
  const totalParticipants = useMemo(() => {
    return GRANDPARENTS_DATA.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  const locationCount = GRANDPARENTS_DATA.length;

  const slides = [
    { title: "Portada", type: "cover" },
    { title: "Resumen de Datos", type: "table" },
    { title: "Análisis Comparativo", type: "bar" },
    { title: "Distribución Porcentual", type: "pie" },
    { title: "Conclusiones", type: "analysis" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Slide Render Logic
  const renderSlideContent = () => {
    const slideType = slides[currentSlide].type;

    switch (slideType) {
      case "cover":
        return (
          // SOLUCIÓN SCROLL: Contenedor externo con scroll
          <div className="h-full w-full overflow-y-auto scrollbar-hide">
             {/* Contenedor interno con min-h-full para centrado seguro */}
            <div className="min-h-full w-full flex flex-col items-center justify-center text-center space-y-4 md:space-y-8 p-4 md:p-12">
              
              {/* Sección de 3 Imágenes Alineadas */}
              <div className="flex flex-row items-center justify-center gap-2 md:gap-8 mb-2 md:mb-4 relative z-10 w-full px-2 mt-4 md:mt-0">
                {COVER_IMAGES.map((imgUrl, index) => (
                  <div key={index} className="h-20 w-20 sm:h-28 sm:w-28 md:h-48 md:w-48 bg-white/40 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-white/60 p-2 md:p-4 flex items-center justify-center overflow-hidden transition-transform hover:scale-105 duration-300 group">
                    <img 
                      src={imgUrl} 
                      alt={`Logo Institucional ${index + 1}`} 
                      className="w-full h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-4 md:p-8 rounded-xl md:rounded-2xl border border-white/50 shadow-sm max-w-4xl w-full mx-auto">
                <h1 className="text-xl sm:text-3xl md:text-6xl font-extrabold text-slate-900 mb-2 md:mb-6 drop-shadow-sm leading-tight">{APP_TITLE}</h1>
                <p className="text-sm sm:text-lg md:text-3xl text-slate-600 font-medium">{APP_SUBTITLE}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-8 w-full max-w-2xl mt-2 md:mt-4 mx-auto pb-4 md:pb-0">
                <StatCard 
                  title="Total Participantes" 
                  value={totalParticipants} 
                  description="Registro Global"
                />
                <StatCard 
                  title="Sedes Activas" 
                  value={locationCount} 
                  description="Ubicaciones"
                />
              </div>
            </div>
          </div>
        );

      case "table":
        return (
          <div className="h-full w-full overflow-y-auto scrollbar-hide">
            <div className="min-h-full w-full flex flex-col justify-center p-4 md:p-12">
              <div className="w-full max-w-5xl mx-auto flex-col flex justify-center">
                <div className="overflow-x-auto bg-white/80 backdrop-blur-md shadow-lg rounded-xl border border-white/50 w-full">
                  <table className="min-w-full divide-y divide-slate-200/60 text-sm md:text-xl">
                    <thead className="bg-slate-50/80">
                      <tr>
                        <th className="px-4 py-3 md:px-8 md:py-6 text-left font-bold text-slate-500 uppercase tracking-wider">Ubicación</th>
                        <th className="px-4 py-3 md:px-8 md:py-6 text-right font-bold text-slate-500 uppercase tracking-wider">Cantidad</th>
                        <th className="px-4 py-3 md:px-8 md:py-6 text-right font-bold text-slate-500 uppercase tracking-wider">%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60">
                      {GRANDPARENTS_DATA.map((item, index) => (
                        <tr key={item.name} className={index % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/40'}>
                          <td className="px-4 py-3 md:px-8 md:py-6 whitespace-nowrap font-medium text-slate-900 flex items-center">
                            <span className="w-3 h-3 md:w-5 md:h-5 rounded-full mr-2 md:mr-4 shadow-sm shrink-0" style={{ backgroundColor: item.color }}></span>
                            <span className="truncate">{item.name}</span>
                          </td>
                          <td className="px-4 py-3 md:px-8 md:py-6 whitespace-nowrap text-slate-700 text-right font-medium">
                            {item.value}
                          </td>
                          <td className="px-4 py-3 md:px-8 md:py-6 whitespace-nowrap text-slate-700 text-right font-medium">
                            {((item.value / totalParticipants) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100/80 font-bold text-slate-900 text-base md:text-xl">
                      <tr>
                        <td className="px-4 py-3 md:px-8 md:py-6">Total General</td>
                        <td className="px-4 py-3 md:px-8 md:py-6 text-right">{totalParticipants}</td>
                        <td className="px-4 py-3 md:px-8 md:py-6 text-right">100%</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case "bar":
        // Charts need specific layout: h-full w-full with NO overflow on the parent to force size
        return (
          <div className="h-full w-full p-2 md:p-8 flex flex-col">
            <CustomBarChart data={GRANDPARENTS_DATA} />
          </div>
        );

      case "pie":
        return (
          <div className="h-full w-full p-2 md:p-8 flex flex-col">
            <CustomPieChart data={GRANDPARENTS_DATA} />
          </div>
        );

      case "analysis":
        return (
          <div className="h-full w-full overflow-y-auto scrollbar-hide">
             <div className="min-h-full w-full flex flex-col justify-center p-4 md:p-12">
               <AnalysisSection data={GRANDPARENTS_DATA} total={totalParticipants} />
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    // Full screen container
    <div className="fixed inset-0 w-full h-full bg-slate-50 flex flex-col overflow-hidden font-sans">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(10%) contrast(110%)',
          opacity: 0.25 
        }}
      />

      {/* HEADER */}
      <header className="relative z-20 bg-white/70 backdrop-blur-md border-b border-white/40 px-4 md:px-8 py-3 flex justify-between items-center h-14 md:h-16 shrink-0 shadow-sm">
        <div className="flex items-center space-x-2 md:space-x-3 text-slate-800">
          <Presentation className="w-5 h-5 md:w-6 md:h-6 text-blue-700" />
          <span className="font-bold text-sm md:text-lg uppercase tracking-wide truncate max-w-[200px] md:max-w-none">
            {slides[currentSlide].title}
          </span>
        </div>
        <div className="text-slate-600 text-xs md:text-sm font-bold bg-white/60 px-3 py-1 rounded-full border border-slate-200">
          {currentSlide + 1} / {slides.length}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      {/* 
        flex-1 ensures it takes all remaining height.
        The content inside renderSlideContent handles its own scrolling.
      */}
      <main className="flex-1 relative z-10 w-full flex flex-col overflow-hidden">
        {renderSlideContent()}
      </main>

      {/* FOOTER CONTROLS */}
      <footer className="relative z-20 bg-white/70 backdrop-blur-md border-t border-white/40 px-4 md:px-8 h-16 md:h-20 shrink-0 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         {/* Progress Indicators */}
         <div className="flex space-x-1.5 md:space-x-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-300 shadow-sm ${
                  idx === currentSlide 
                    ? 'bg-blue-600 w-8 md:w-12 h-2 md:h-3' 
                    : 'bg-slate-300 hover:bg-slate-400 w-2 md:w-3 h-2 md:h-3'
                }`}
                aria-label={`Ir a diapositiva ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex space-x-4 md:space-x-6">
            <button 
              onClick={prevSlide}
              className="p-3 md:p-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-md transition-transform active:scale-95"
              title="Anterior"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 md:p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-transform active:scale-95"
              title="Siguiente"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
      </footer>

    </div>
  );
};

export default App;