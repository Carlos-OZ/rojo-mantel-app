import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, 
  FaClock, FaUsers, FaChair, FaIdCard, FaSpinner 
} from 'react-icons/fa';
import { useReservations } from '../context/ReservationContext';
import { fetchDniData } from '../services/dniService';
import InputField from '../components/common/InputField';
import SelectField from '../components/common/SelectField';
import Modal from '../components/common/Modal';

const ReservarPage = () => {
  const navigate = useNavigate();
  const { addReservation } = useReservations();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // === ESTADO DEL FORMULARIO COMPLETO ===
  const [formData, setFormData] = useState({
    dni: '',
    cliente: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: '',
    mesa: ''
  });

  // === LÓGICA DE BÚSQUEDA DNI===
  const searchDni = async (dniValue) => {
    if (dniValue.length === 8) {
      setIsSearching(true);
      try {
        const data = await fetchDniData(dniValue);
        if (data) {
          setFormData(prev => ({
            ...prev,
            cliente: `${data.names} ${data.paternalLastName} ${data.maternalLastName}`.trim()
          }));
        }
      } catch (error) {
        console.error("Error al consultar DNI en página pública");
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'dni') {
      const onlyNums = value.replace(/[^0-9]/g, '').slice(0, 8);
      setFormData(prev => ({ ...prev, dni: onlyNums }));
      if (onlyNums.length === 8) searchDni(onlyNums);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Guardar en la base de datos simulada y mostrar modal de confirmación
  const handleConfirmReservation = (e) => {
    e.preventDefault();
    addReservation(formData); // Persistencia de datos en el Context
    setIsModalOpen(true);
  };

  const handleAcceptAndRedirect = () => {
    setIsModalOpen(false);
    navigate('/'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center animate-in fade-in duration-700">

      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-gray-900">Rojo Mantel</h2>
        <p className="mt-2 text-gray-500 font-bold max-w-md">
          Reserva rápido y sin registro. 
          <span className="text-red-700"> Reserva rápido y aseguraremos tu mesa.</span>
        </p>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 p-12 w-full max-w-4xl border border-gray-100">
        <form onSubmit={handleConfirmReservation}>

          <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
            <h3 className="text-2xl font-black text-gray-800">
              Información del Cliente
            </h3>
            {isSearching && (
                <div className="flex items-center gap-2 text-red-700 text-[20px] font-black animate-pulse">
                    <FaSpinner className="animate-spin" /> Validando DNI...
                </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField 
                label="Número de DNI" name="dni" value={formData.dni}
                onChange={handleChange} icon={FaIdCard} 
                placeholder="*********" type="text" 
            />
            <div className="md:col-span-2">
                <InputField 
                    label="Nombres y Apellidos" name="cliente"
                    value={formData.cliente} onChange={handleChange}
                    icon={FaUser} placeholder="Nombre completo" 
                />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputField label="Correo Electrónico" name="email" value={formData.email} onChange={handleChange} icon={FaEnvelope} type="email" placeholder="correo@ejemplo.com" />
            <InputField label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} icon={FaPhone} type="tel" placeholder="+51 900 000 000" />
          </div>

          <h3 className="text-2xl font-black text-gray-800 pb-2 mb-6 mt-12 border-b border-gray-50">
            Detalles de tu Mesa
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputField label="Fecha" name="fecha" value={formData.fecha} onChange={handleChange} icon={FaCalendarAlt} type="date" />
            <SelectField label="Horario" name="hora" value={formData.hora} onChange={handleChange} icon={FaClock} options={["12:00", "13:00", "19:00", "20:00"]} />
            <SelectField label="Número de Personas" name="personas" value={formData.personas} onChange={handleChange} icon={FaUsers} options={["2", "3", "4", "5+"]} />
            <SelectField label="Elegir Mesa" name="mesa" value={formData.mesa} onChange={handleChange} icon={FaChair} options={["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5", "Aleatoria"]} />
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-red-700 hover:bg-red-800 text-white font-black py-5 px-8 rounded-[1.5rem] shadow-xl shadow-red-900/20 transition-all uppercase tracking-widest text-sm active:scale-95 cursor-pointer"
            >
              Confirmar Reserva
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 w-full max-w-4xl bg-orange-50 border border-orange-100 text-orange-800 p-8 rounded-[2rem] shadow-sm text-center">
        <p className="text-sm font-bold flex items-center justify-center gap-2">
            Recibirás una confirmación inmediata por correo electrónico. Tu reserva será revisada por nuestro personal y respondida en breve.
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleAcceptAndRedirect}
        type="success"
        title="¡Reservación creada!"
        message={`Tu reserva ha sido procesada. Te hemos enviado los detalles a ${formData.email}.`}
      />

    </div>
  );
};

export default ReservarPage;