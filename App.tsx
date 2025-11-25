import React, { useMemo, useState, useEffect } from 'react';
import { GRANDPARENTS_DATA, APP_TITLE, APP_SUBTITLE } from './constants';
import CustomBarChart from './components/CustomBarChart';
import CustomPieChart from './components/CustomPieChart';
import StatCard from './components/StatCard';
import AnalysisSection from './components/AnalysisSection';
import { Activity, ChevronLeft, ChevronRight, Presentation } from 'lucide-react';

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
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            
            {/* Sección de 3 Imágenes Alineadas */}
            <div className="flex items-center justify-center gap-8 mb-4 relative z-10 w-full px-12">
              {COVER_IMAGES.map((imgUrl, index) => (
                <div key={index} className="h-48 w-48 bg-white/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 p-4 flex items-center justify-center overflow-hidden transition-transform hover:scale-105 duration-300 group">
                  <img 
                    src={imgUrl} 
                    alt={`Logo Institucional ${index + 1}`} 
                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-sm max-w-4xl w-full">
              <h1 className="text-5xl font-extrabold text-slate-900 mb-6 drop-shadow-sm">{APP_TITLE}</h1>
              <p className="text-2xl text-slate-600 font-medium">{APP_SUBTITLE}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 w-full max-w-2xl mt-4">
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
        );

      case "table":
        return (
          <div className="h-full flex flex-col justify-center">
            <div className="overflow-hidden bg-white/80 backdrop-blur-md shadow-sm rounded-xl border border-white/50">
              <table className="min-w-full divide-y divide-slate-200/60 text-lg">
                <thead className="bg-slate-50/80">
                  <tr>
                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Ubicación</th>
                    <th className="px-8 py-5 text-right text-sm font-bold text-slate-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-8 py-5 text-right text-sm font-bold text-slate-500 uppercase tracking-wider">% del Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60">
                  {GRANDPARENTS_DATA.map((item, index) => (
                    <tr key={item.name} className={index % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/40'}>
                      <td className="px-8 py-5 whitespace-nowrap font-medium text-slate-900 flex items-center">
                        <span className="w-4 h-4 rounded-full mr-4 shadow-sm" style={{ backgroundColor: item.color }}></span>
                        {item.name}
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-slate-700 text-right font-medium">
                        {item.value}
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-slate-700 text-right font-medium">
                        {((item.value / totalParticipants) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100/80 font-bold text-slate-900">
                  <tr>
                    <td className="px-8 py-5">Total General</td>
                    <td className="px-8 py-5 text-right">{totalParticipants}</td>
                    <td className="px-8 py-5 text-right">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        );

      case "bar":
        return <CustomBarChart data={GRANDPARENTS_DATA} />;

      case "pie":
        return <CustomPieChart data={GRANDPARENTS_DATA} />;

      case "analysis":
        return <AnalysisSection data={GRANDPARENTS_DATA} total={totalParticipants} />;

      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-900 flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans">
      
      {/* Slide Container (16:9 Aspect Ratio) */}
      <div className="w-full max-w-6xl aspect-video bg-white rounded-2xl shadow-2xl flex flex-col relative overflow-hidden group">
        
        {/* BACKGROUND IMAGE LAYER */}
        {/* 
           Ajustes aplicados: 
           - opacity-25: Aumentada la visibilidad del fondo (antes 15%).
           - grayscale: Un poco de blanco y negro para que los colores rojos no molesten.
        */}
        <div 
          className="absolute inset-0 z-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(40%) contrast(120%)' 
          }}
        />

        {/* MAIN CONTENT WRAPPER */}
        <div className="relative z-10 flex flex-col h-full">
          
          {/* Header Strip */}
          <div className="bg-white/60 backdrop-blur-sm border-b border-white/40 px-8 py-4 flex justify-between items-center h-16 shrink-0 transition-all">
            <div className="flex items-center space-x-3 text-slate-700">
              <Presentation className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-sm uppercase tracking-wide opacity-70">
                {slides[currentSlide].title}
              </span>
            </div>
            <div className="text-slate-500 text-sm font-mono bg-white/50 px-2 py-1 rounded">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow p-8 md:p-12 overflow-y-auto">
            {renderSlideContent()}
          </div>

          {/* Footer Controls */}
          <div className="bg-white/60 backdrop-blur-sm border-t border-white/40 px-8 py-4 h-16 flex justify-between items-center shrink-0">
            <div className="flex space-x-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'bg-blue-600 w-8' : 'bg-slate-400 hover:bg-slate-500'
                  }`}
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full hover:bg-white/80 text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
                title="Anterior (Flecha Izquierda)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
                title="Siguiente (Espacio o Flecha Derecha)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default App;