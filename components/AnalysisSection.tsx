import React from 'react';
import { LocationData } from '../types';

interface AnalysisProps {
  data: LocationData[];
  total: number;
}

const AnalysisSection: React.FC<AnalysisProps> = ({ data, total }) => {
  // Find max value
  const maxLocation = data.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  
  // Find min value dynamically
  const minLocation = data.reduce((prev, current) => (prev.value < current.value) ? prev : current);
  
  const percentage = ((maxLocation.value / total) * 100).toFixed(1);

  // Filter out the max location to sum the others
  const othersSum = total - maxLocation.value;

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center">
      <div className="bg-white/70 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/50 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">
          Resumen Ejecutivo
        </h2>
        <div className="prose prose-slate max-w-none text-base md:text-2xl leading-relaxed text-slate-700">
          <p className="mb-6">
            El análisis de los datos recolectados sobre los <strong>Círculos de Abuelos</strong> muestra una distribución altamente desigual entre las diferentes ubicaciones.
          </p>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong style={{ color: maxLocation.color }}>{maxLocation.name}</strong> es, con diferencia, la ubicación con mayor participación, acumulando un total de <strong>{maxLocation.value}</strong> participantes. Esto representa aproximadamente el <strong>{percentage}%</strong> del total general.
            </li>
            <li>
              Las otras ubicaciones suman en conjunto <strong>{othersSum}</strong> participantes, lo que sugiere que la actividad está fuertemente centralizada en {maxLocation.name}.
            </li>
            <li>
              La ubicación con menor participación es <strong style={{ color: minLocation.color }}>{minLocation.name}</strong> con <strong>{minLocation.value}</strong> integrantes registrados.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;