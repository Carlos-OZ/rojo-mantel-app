<<<<<<< HEAD
import React from 'react';

const ProgressBar = ({ percentage, label }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-200 relative overflow-hidden border border-gray-300">
      <div 
        className="bg-red-600 h-4 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${percentage}%` }}
      ></div>
       <span className="absolute inset-0 flex items-center justify-end px-2 text-xs font-bold text-gray-700">{label}</span>
    </div>
  );
};

=======
import React from 'react';

const ProgressBar = ({ percentage, label }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-200 relative overflow-hidden border border-gray-300">
      <div 
        className="bg-red-600 h-4 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${percentage}%` }}
      ></div>
       <span className="absolute inset-0 flex items-center justify-end px-2 text-xs font-bold text-gray-700">{label}</span>
    </div>
  );
};

>>>>>>> 307a0a2e9fd3469e551256cbab00fb844d0892eb
export default ProgressBar;