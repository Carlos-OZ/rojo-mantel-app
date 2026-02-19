import React, { useState, useEffect } from 'react';
import { useReservations } from '../../context/ReservationContext';

const EditReservationModal = ({ isOpen, onClose, reservationToEdit }) => {
  const { updateReservation, tables } = useReservations();
  const [formData, setFormData] = useState({ cliente: '', fecha: '', hora: '', estado: '', mesa: '' });

  useEffect(() => {
    if (reservationToEdit) setFormData({ ...reservationToEdit });
  }, [reservationToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReservation(reservationToEdit.id, formData); //
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-12 border border-gray-100">
        <h3 className="text-2xl font-black text-gray-800 text-center mb-8 uppercase tracking-tight">Editar Reservación</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2 text-xs uppercase">Estado de Reserva</label>
            <select 
              value={formData.estado} 
              onChange={(e) => setFormData({...formData, estado: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white cursor-pointer"
            >
              <option value="Confirmado">Confirmado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 bg-red-700 text-white font-black py-4 rounded-xl cursor-pointer hover:bg-red-800 active:scale-95">Guardar Cambios</button>
            <button type="button" onClick={onClose} className="cursor-pointer flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl border border-gray-200 shadow-sm transition-all active:scale-95 text-xm">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReservationModal;