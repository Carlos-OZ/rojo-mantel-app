<<<<<<< HEAD
import React, { useState } from 'react';
import { useReservations } from '../../context/ReservationContext';
import Modal from '../common/Modal';

const CreateUserModal = ({ isOpen, onClose }) => {
  const { addUser } = useReservations();
  
  // Estado para controlar el mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(false);

  // Estado local para capturar los datos del nuevo usuario
  const [userData, setUserData] = useState({
    nombre: '',
    usuario: '',
    perfil: ''
  });

  if (!isOpen && !showSuccess) return null;

  // Manejador de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Función para procesar el registro
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validamos que los campos tengan datos
    if (!userData.nombre || !userData.usuario || !userData.perfil) return;

    addUser(userData);
    
    setShowSuccess(true);
  };

  // Función para cerrar todo y limpiar el formulario
  const handleFinalize = () => {
    setUserData({ nombre: '', usuario: '', perfil: '' });
    setShowSuccess(false);
    onClose(); // Cerramos el modal principal de creación
  };

  return (
    <>
      {/* === MODAL DE FORMULARIO === */}
      {isOpen && !showSuccess && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-12 transform animate-in zoom-in-95 duration-200 border border-gray-100">
            
            <h3 className="text-2xl font-black text-gray-800 text-center mb-8 uppercase tracking-tight">
              Crear Nuevo Usuario
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre Completo */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
                <input 
                  name="nombre"
                  value={userData.nombre}
                  onChange={handleChange}
                  type="text" 
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all shadow-sm"
                  placeholder="Ej: Carlos Ocampo"
                />
              </div>

              {/* Usuario */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Usuario</label>
                <input 
                  name="usuario"
                  value={userData.usuario}
                  onChange={handleChange}
                  type="text" 
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all shadow-sm"
                  placeholder="Ej: cocampo"
                />
              </div>

              {/* Perfil */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Perfil</label>
                <select 
                  name="perfil"
                  value={userData.perfil}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all shadow-sm bg-white cursor-pointer"
                >
                  <option value="" disabled>Seleccionar perfil...</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Mozo">Mozo</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="submit"
                  className="cursor-pointer flex-1 bg-red-700 hover:bg-red-800 text-white font-black py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all active:scale-95 text-xm"
                >
                  Crear Usuario
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl border border-gray-200 shadow-sm transition-all active:scale-95 text-xm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL DE CONFIRMACIÓN === */}
      <Modal 
        isOpen={showSuccess} 
        onClose={handleFinalize}
        onConfirm={handleFinalize}
        type="success"
        title="¡Usuario Creado!"
        message="El nuevo colaborador ha sido registrado exitosamente en el sistema."
      />
    </>
  );
};

=======
import React, { useState } from 'react';
import { useReservations } from '../../context/ReservationContext';
import Modal from '../common/Modal';

const CreateUserModal = ({ isOpen, onClose }) => {
  const { addUser } = useReservations();
  
  // Estado para controlar el mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(false);

  // Estado local para capturar los datos del nuevo usuario
  const [userData, setUserData] = useState({
    nombre: '',
    usuario: '',
    perfil: ''
  });

  if (!isOpen && !showSuccess) return null;

  // Manejador de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Función para procesar el registro
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validamos que los campos tengan datos
    if (!userData.nombre || !userData.usuario || !userData.perfil) return;

    addUser(userData);
    
    setShowSuccess(true);
  };

  // Función para cerrar todo y limpiar el formulario
  const handleFinalize = () => {
    setUserData({ nombre: '', usuario: '', perfil: '' });
    setShowSuccess(false);
    onClose(); // Cerramos el modal principal de creación
  };

  return (
    <>
      {/* === MODAL DE FORMULARIO === */}
      {isOpen && !showSuccess && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-12 transform animate-in zoom-in-95 duration-200 border border-gray-100">
            
            <h3 className="text-2xl font-black text-gray-800 text-center mb-8 uppercase tracking-tight">
              Crear Nuevo Usuario
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre Completo */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
                <input 
                  name="nombre"
                  value={userData.nombre}
                  onChange={handleChange}
                  type="text" 
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all shadow-sm"
                  placeholder="Ej: Carlos Ocampo"
                />
              </div>

              {/* Usuario */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Usuario</label>
                <input 
                  name="usuario"
                  value={userData.usuario}
                  onChange={handleChange}
                  type="text" 
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all shadow-sm"
                  placeholder="Ej: cocampo"
                />
              </div>

              {/* Perfil */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Perfil</label>
                <select 
                  name="perfil"
                  value={userData.perfil}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all shadow-sm bg-white cursor-pointer"
                >
                  <option value="" disabled>Seleccionar perfil...</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Mozo">Mozo</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="submit"
                  className="cursor-pointer flex-1 bg-red-700 hover:bg-red-800 text-white font-black py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all active:scale-95 text-xm"
                >
                  Crear Usuario
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl border border-gray-200 shadow-sm transition-all active:scale-95 text-xm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL DE CONFIRMACIÓN === */}
      <Modal 
        isOpen={showSuccess} 
        onClose={handleFinalize}
        onConfirm={handleFinalize}
        type="success"
        title="¡Usuario Creado!"
        message="El nuevo colaborador ha sido registrado exitosamente en el sistema."
      />
    </>
  );
};

>>>>>>> 307a0a2e9fd3469e551256cbab00fb844d0892eb
export default CreateUserModal;