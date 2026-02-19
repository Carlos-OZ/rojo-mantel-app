import React from 'react';

const InputField = ({ label, icon: Icon, type = 'text', placeholder, id, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <label 
        htmlFor={id} 
        className="text-gray-700 font-medium mb-2 flex items-center gap-2"
      >
        {Icon && <Icon className="text-gray-800" />}
        {label}
      </label>
      
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
      />
    </div>
  );
};

export default InputField;