import React from 'react';

const CurrentMonthDisplay: React.FC = () => {
  // Get current month and year with TypeScript types
  const currentDate: Date = new Date();
  const month: string = currentDate.toLocaleString('default', { month: 'long' });
  const year: number = currentDate.getFullYear();

  return (
    <div className="flex items-center">
      <svg 
        className="w-5 h-5 mr-2 text-white" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
        />
      </svg>
      <span className="font-medium">{month} {year}</span>
    </div>
  );
};

export default CurrentMonthDisplay;