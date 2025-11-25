import React from 'react';
import { Users } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-white/50 flex items-center space-x-4 md:space-x-6 transition-all hover:bg-white/80 w-full hover:scale-[1.02] duration-300">
      <div className="p-3 md:p-5 bg-blue-100/80 rounded-full flex-shrink-0">
        <Users className="w-6 h-6 md:w-10 md:h-10 text-blue-700" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-xs md:text-lg font-bold text-slate-500 uppercase tracking-wide truncate">{title}</h3>
        <p className="text-2xl md:text-5xl font-extrabold text-slate-900 my-1">{value}</p>
        <p className="text-xs md:text-base text-slate-500 font-medium truncate">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;