import React from 'react';

const TableStatus = ({ number, status }) => {
  const isOccupied = status === 'ocupado';
  return (
    <div className={`
      w-24 h-24 rounded-lg flex items-center justify-center text-xl font-bold text-white shadow-sm transition-transform hover:scale-105 cursor-pointer
      ${isOccupied ? 'bg-red-600' : 'bg-green-500'}
    `}>
      {number}
    </div>
  );
};

export default TableStatus;