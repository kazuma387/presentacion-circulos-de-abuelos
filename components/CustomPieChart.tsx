import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LocationData } from '../types';

interface Props {
  data: LocationData[];
}

const CustomPieChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-lg flex-1 flex flex-col w-full h-full overflow-hidden">
      <div className="flex-grow w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                
                // Hide label if too small
                if (percent < 0.05) return null;
                
                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs md:text-lg font-bold drop-shadow-md" style={{ pointerEvents: 'none' }}>
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              outerRadius="80%" 
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip 
                 formatter={(value: number) => [value, 'Participantes']}
                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center" 
              wrapperStyle={{ fontSize: '14px', paddingTop: '10px', fontWeight: 500 }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomPieChart;