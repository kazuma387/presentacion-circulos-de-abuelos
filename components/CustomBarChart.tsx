import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { LocationData } from '../types';

interface Props {
  data: LocationData[];
}

const CustomBarChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl flex flex-col h-full w-full border border-white/50 shadow-sm">
      <div className="flex-grow w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" strokeOpacity={0.5} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 14, fill: '#475569' }} 
              interval={0}
              angle={0}
              dy={10}
            />
            <YAxis tick={{ fontSize: 12, fill: '#475569' }} label={{ value: 'Participantes', angle: -90, position: 'insideLeft', fill: '#475569' }} />
            <Tooltip 
              cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="value" name="Participantes" radius={[4, 4, 0, 0]}>
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