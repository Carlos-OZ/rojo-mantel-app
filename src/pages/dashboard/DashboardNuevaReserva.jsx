import React, { useState, useMemo } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, 
  FaClock, FaUsers, FaChair, FaIdCard, FaSpinner 
} from 'react-icons/fa';
import { useReservations } from '../../context/ReservationContext';
import { fetchDniData } from '../../services/dniService'; 
import InputField from '../../components/common/InputField';
import SelectField from '../../components/common/SelectField';
import TableStatus from '../../components/dashboard/TableStatus';
import ProgressBar from '../../components/common/ProgressBar';
import Modal from '../../components/common/Modal';

const DashboardNuevaReserva = () => {
  const { tables, reservations, addReservation } = useReservations();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // Estado para el feedback de carga

  // === ESTADO DEL FORMULARIO ACTUALIZADO ===
  const [formData, setFormData] = useState({
    dni: '', // Nuevo campo para validación de identidad
    cliente: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: '',
    mesa: ''
  });

  const [queryDate, setQueryDate] = useState('');
  const [queryTime, setQueryTime] = useState('');

  // === LÓGICA DE BÚSQUEDA AUTOMÁTICA (RENIEC) ===
  const searchDni = async (dniValue) => {
    if (dniValue.length === 8) {
      setIsSearching(true);
      try {
        const data = await fetchDniData(dniValue); // Llamada al servicio externo

        if (data) {
          setFormData(prev => ({
            ...prev,
            cliente: `${data.names} ${data.paternalLastName} ${data.maternalLastName}`.trim()
          }));
        }
      } catch (error) {
        console.error("Error al consultar el servicio de identidad");
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Lógica específica para el DNI
    if (name === 'dni') {
      const onlyNums = value.replace(/[^0-9]/g, '').slice(0, 8);
      setFormData(prev => ({ ...prev, dni: onlyNums }));
      if (onlyNums.length === 8) searchDni(onlyNums);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    addReservation(formData);

    // Reseteo completo del formulario post-reserva
    setFormData({
      dni: '', cliente: '', email: '', telefono: '',
      fecha: '', hora: '', personas: '', mesa: ''
    });

    setIsModalOpen(true);
  };

  // === FILTRADO DE DISPONIBILIDAD (CONSULTA) ===
  const filteredTables = useMemo(() => {
    return tables.map(table => {
      const isReserved = reservations.some(res =>
        res.fecha === queryDate &&
        res.hora === queryTime &&
        res.mesa === `Mesa ${table.id}`
      );

      return {
        ...table,
        status: (queryDate && queryTime) ? (isReserved ? 'ocupado' : 'disponible') : table.status
      };
    });
  }, [tables, reservations, queryDate, queryTime]);

  const occupiedCount = filteredTables.filter(t => t.status === 'ocupado').length;
  const availableCount = filteredTables.length - occupiedCount;
  const occupancyPercentage = (occupiedCount / filteredTables.length) * 100;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start w-full animate-in fade-in duration-500">
      
      {/* === SECCIÓN A: REGISTRO DE CLIENTE === */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
        <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Nueva Reserva</h2>
            {isSearching && (
                <div className="flex items-center gap-2 text-red-700 text-[10px] font-black animate-pulse uppercase tracking-widest">
                    <FaSpinner className="animate-spin" /> Validando DNI...
                </div>
            )}
        </div>
          
        <form onSubmit={handleConfirmReservation} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <InputField 
                    label="DNI" name="dni" value={formData.dni}
                    onChange={handleChange} icon={FaIdCard} 
                    placeholder="********" type="text" 
                />
              </div>
              <div className="md:col-span-2">
                <InputField 
                    label="Nombre del Cliente" name="cliente"
                    value={formData.cliente} onChange={handleChange}
                    icon={FaUser} placeholder="Nombre completo" 
                />
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                label="Correo" name="email" value={formData.email}
                onChange={handleChange} icon={FaEnvelope} 
                type="email" placeholder="ejemplo@correo.com" 
              />
              <InputField 
                label="Teléfono" name="telefono" value={formData.telefono}
                onChange={handleChange} icon={FaPhone} 
                type="tel" placeholder="+51 900 000 000" 
              />
          </div>

          <h3 className="font-bold text-gray-700 text-[22px] mt-8">Detalles del Servicio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
             <InputField label="Fecha" name="fecha" value={formData.fecha} onChange={handleChange} icon={FaCalendarAlt} type="date" />
             <SelectField label="Horario" name="hora" value={formData.hora} onChange={handleChange} icon={FaClock} options={["12:00", "13:00", "19:00", "20:00"]} />
             <SelectField label="Personas" name="personas" value={formData.personas} onChange={handleChange} icon={FaUsers} options={["2", "3", "4", "5+"]} />
             <SelectField label="Asignar Mesa" name="mesa" value={formData.mesa} onChange={handleChange} icon={FaChair} options={["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", "Mesa 5", "Aleatoria"]} />
          </div>

          <button type="submit" className="cursor-pointer w-full mt-8 bg-red-700 hover:bg-red-800 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-900/20 transition-all uppercase tracking-widest text-xs active:scale-95">
            Confirmar Reserva
          </button>
        </form>
      </div>

      {/* === SECCIÓN B: CONSULTA DE DISPONIBILIDAD === */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Disponibilidad</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
             <InputField label="Fecha consulta" icon={FaCalendarAlt} type="date" value={queryDate} onChange={(e) => setQueryDate(e.target.value)} />
             <SelectField label="Horario consulta" icon={FaClock} value={queryTime} onChange={(e) => setQueryTime(e.target.value)} options={["12:00", "13:00", "19:00", "20:00"]} />
        </div>

        <div className="mb-10 bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
            <div className="flex justify-between text-[10px] font-black text-gray-400 mb-4 uppercase tracking-widest">
                <span>Disponibles: {availableCount} Mesas</span>
                <span className="text-red-700">Ocupadas: {occupiedCount}</span>
            </div>
            <ProgressBar percentage={100 - occupancyPercentage} label={`Ocupación: ${occupancyPercentage.toFixed(0)}%`} />
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-gray-600 text-center text-[22px]">Mapa Interactivo</h3>
          <div className="grid grid-cols-5 gap-6 justify-items-center p-8 rounded-[2.5rem] border border-dashed border-gray-200 bg-gray-50/30">
              {filteredTables.map(table => (
                  <TableStatus key={table.id} number={table.id} status={table.status} />
              ))}
          </div>
        </div>

        <div className="flex gap-8 justify-center mt-10">
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-200"></div> Libre
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-red-600 shadow-sm shadow-red-200"></div> Ocupado
            </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        type="success" title="¡Reserva Confirmada!"
        message="La identidad ha sido validada y el registro guardado exitosamente."
      />
    </div>
  );
};

export default DashboardNuevaReserva;