import React from 'react';
import { LocationData } from '../types';

interface AnalysisProps {
  data: LocationData[];
  total: number;
}

const AnalysisSection: React.FC<AnalysisProps> = ({ data, total }) => {
  // Find max value
  const maxLocation = data.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  const percentage = ((maxLocation.value / total) * 100).toFixed(1);

  return (
    <div className="bg-white/70 backdrop-blur-md p-8 rounded-xl h-full flex flex-col justify-center border border-white/50 shadow-sm">
      <div className="prose text-slate-600 max-w-none text-lg leading-relaxed">
        <p className="mb-6">
          El análisis de los datos recolectados sobre los <strong>Círculos de Abuelos</strong> muestra una distribución altamente desigual entre las diferentes ubicaciones.
        </p>
        <ul className="list-disc pl-8 space-y-4">
          <li>
            <strong className="text-blue-600">{maxLocation.name}</strong> es, con diferencia, la ubicación con mayor participación, acumulando un total de <strong>{maxLocation.value}</strong> participantes. Esto representa aproximadamente el <strong>{percentage}%</strong> del total general.
          </li>
          <li>
            Las otras tres ubicaciones (San José, Mariano Parra y José Ramón Yepes) suman en conjunto solo {total - maxLocation.value} participantes, lo que sugiere que la actividad está fuertemente centralizada en {maxLocation.name}.
          </li>
          <li>
            La ubicación con menor participación es <strong>José Ramón Yepes</strong> con solo 3 integrantes registrados.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AnalysisSection;