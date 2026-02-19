import React, { useState, useEffect } from 'react';
import { useReservations } from '../../context/ReservationContext';

const EditTableModal = ({ isOpen, onClose, tableToEdit }) => {
  const { updateTable } = useReservations();
  const [formData, setFormData] = useState({ numero: '', ubicacion: 'Interior', capacidad: '' });

  useEffect(() => {
    if (tableToEdit) {
      setFormData({
        numero: tableToEdit.id,
        ubicacion: tableToEdit.ubicacion,
        capacidad: tableToEdit.capacidad
      });
    }
  }, [tableToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTable(tableToEdit.id, formData); //
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-12 border border-gray-100">
        <h3 className="text-2xl font-black text-gray-800 text-center mb-8 uppercase tracking-tight">Editar Mesa</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Capacidad</label>
            <input 
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-700"
              type="number"
              value={formData.capacidad}
              onChange={(e) => setFormData({...formData, capacidad: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Ubicación</label>
            <select 
              className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white cursor-pointer"
              value={formData.ubicacion}
              onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
            >
              <option value="Interior">Interior</option>
              <option value="Terraza">Terraza</option>
              <option value="Ventana">Ventana</option>
              <option value="VIP">VIP</option>
              <option value="Bar">Bar</option>
              <option value="Patio">Patio</option>
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

export default EditTableModal;