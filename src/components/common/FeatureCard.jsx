import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg flex flex-col items-center text-center max-w-sm mx-auto transition-transform hover:scale-105">
      <div className="text-4xl text-red-700 mb-4">
        {Icon && <Icon />}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;