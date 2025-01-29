import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bill } from '../types/bill';

interface BillChartProps {
  bills: Bill[];
}

const BillChart: React.FC<BillChartProps> = ({ bills }) => {
  // Normalize date string to MM-DD-YYYY format
  const normalizeDate = (dateStr: string) => {
    // Check if date is in YYYY-MM-DD format
    const isYearFirst = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    
    if (isYearFirst) {
      // Convert from YYYY-MM-DD to MM-DD-YYYY
      const [year, month, day] = dateStr.split('-');
      return `${month}-${day}-${year}`;
    }
    
    // Already in MM-DD-YYYY format
    return dateStr;
  };

  // Parse date string and return a Date object
  const parseDate = (dateStr: string) => {
    const normalizedDate = normalizeDate(dateStr);
    const [month, day, year] = normalizedDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md">
          <p className="text-sm">{normalizeDate(label)}</p>
          <p className="text-sm text-blue-600">
            Amount: ₹{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const sortedBills = [...bills].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const data = sortedBills.map(bill => ({
    date: bill.date,
    amount: parseFloat(bill.amount)
  }));

  return (
    <div className="h-[300px] sm:h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            tick={{ fontSize: 12 }}
            tickFormatter={normalizeDate}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Amount (₹)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BillChart;