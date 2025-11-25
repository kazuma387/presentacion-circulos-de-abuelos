import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { LocationData } from '../types';

interface Props {
  data: LocationData[];
}

const CustomBarChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-lg flex-1 flex flex-col w-full h-full overflow-hidden">
      <div className="flex-grow w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" strokeOpacity={0.6} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#334155', fontWeight: 500 }} 
              interval={0}
              // Adjust angle based on screen size is hard in SVG, but the responsive container handles scaling
              textAnchor="end"
              angle={-15}
              height={60}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#334155' }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="value" name="Participantes" radius={[6, 6, 0, 0]} barSize={60}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;