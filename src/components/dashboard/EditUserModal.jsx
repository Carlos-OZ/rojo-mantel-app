import React, { useState, useEffect } from 'react';
import { useReservations } from '../../context/ReservationContext';

const EditUserModal = ({ isOpen, onClose, userToEdit }) => {
  const { updateUser } = useReservations();
  const [formData, setFormData] = useState({ nombre: '', usuario: '', perfil: '' });

  // Cargamos los datos del usuario cuando se abre el modal
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        nombre: userToEdit.nombre,
        usuario: userToEdit.usuario,
        perfil: userToEdit.perfil
      });
    }
  }, [userToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userToEdit.id, formData); //
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-12 border border-gray-100">
        <h3 className="text-2xl font-black text-gray-800 text-center mb-8 uppercase tracking-tight">Editar Usuario</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nombre Completo</label>
            <input 
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-700"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Perfil</label>
            <select 
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white cursor-pointer"
              value={formData.perfil}
              onChange={(e) => setFormData({...formData, perfil: e.target.value})}
            >
              <option value="Administrador">Administrador</option>
              <option value="Mozo">Mozo</option>
            </select>
          </div>
          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 bg-red-700 text-white font-black py-4 rounded-xl cursor-pointer hover:bg-red-800 transition-all">Guardar Cambios</button>
            <button type="button" onClick={onClose} className="flex-1 bg-white hover:bg-gray-50 border border-gray-400 text-gray-500 font-bold py-4 rounded-xl cursor-pointer transition-all">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;