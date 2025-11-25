import React from 'react';
import { Users } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50 flex items-center space-x-4 transition-all hover:bg-white/80">
      <div className="p-3 bg-blue-50/80 rounded-full">
        <Users className="w-8 h-8 text-blue-600" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</h3>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;