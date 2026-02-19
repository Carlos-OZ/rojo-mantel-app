import React from 'react';

const SelectField = ({ label, icon: Icon, id, name, options, value, onChange }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="text-gray-700 font-medium mb-2 flex items-center gap-2"
      >
        {Icon && <Icon className="text-gray-500" />}
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all bg-white text-gray-700"
        >
          <option value="">Seleccionar...</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectField;