import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import FeatureCard from '../components/common/FeatureCard';

import homeBgImg from '../assets/home-bg.png';

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center relative px-4"
      style={{ backgroundImage: `url('${homeBgImg}')` }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">
        
        <div className="mt-48 md:mt-60 mb-20"></div>

        {/* Sección de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full">
          <FeatureCard
            icon={FaCalendarAlt}
            title="Calendario Interactivo"
            description="Visualiza todas las reservas en un calendario fácil de usar."
          />
          <FeatureCard
            icon={FaClock}
            title="Gestión en Tiempo Real"
            description="Control instantáneo de disponibilidad de mesas."
          />
          <FeatureCard
            icon={FaCheckCircle}
            title="Sin Duplicaciones"
            description="Sistema inteligente que previene conflictos de horarios."
          />
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto pb-10">
          {/* Botón Reservar Mesa */}
          <Link 
            to="/reservar" 
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all text-center flex items-center justify-center gap-2 text-lg"
          >
            <FaCalendarAlt /> Reservar Mesa
          </Link>

          {/* Botón Ingresar al Sistema */}
          <Link 
            to="/login" 
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-4 px-10 rounded-2xl shadow-lg transition-all border-1 text-center flex items-center justify-center gap-2 text-lg"
          >
             <FiLogIn /> Ingresar al Sistema
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePage;