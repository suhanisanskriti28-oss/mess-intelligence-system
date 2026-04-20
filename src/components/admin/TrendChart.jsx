import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#FDFBF7] border border-[#E8E8D5] rounded-xl px-4 py-2 shadow-xl shadow-primary/10">
        <p className="text-xs text-[#4A3728]/60 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-primary font-extrabold text-lg">{payload[0].value} <span className="text-xs font-normal text-gray-500">complaints</span></p>
      </div>
    );
  }
  return null;
};

const TrendChart = ({ data }) => {
  return (
    <div className="w-full h-80 bg-[#FDF5E6] rounded-xl border border-[#E8E8D5] shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 p-6">
      <h3 className="text-lg font-extrabold text-primary mb-1">Complaint Trend</h3>
      <p className="text-xs text-[#4A3728]/60 font-medium mb-5 uppercase tracking-wider">Last 7 days</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#800000" />
                <stop offset="100%" stopColor="#8B4513" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E8D5" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4A3728', fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#4A3728', fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="complaints"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ r: 5, fill: '#800000', strokeWidth: 2, stroke: '#FDF5E6' }}
              activeDot={{ r: 7, fill: '#800000', stroke: '#FDF5E6', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
