import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Contenedor del Modal */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-10 transform animate-in zoom-in-95 duration-200 border border-gray-100 text-center">
        
        {/* Icono de Advertencia */}

        <h3 className="text-2xl font-black text-gray-800 mb-4 uppercase tracking-tight">
          {title || "¿Estás seguro?"}
        </h3>
        
        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
          {message || "Esta acción no se puede deshacer. El registro se eliminará permanentemente del sistema."}
        </p>

        {/* Botones de Acción*/}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="cursor-pointer w-full bg-red-700 hover:bg-red-800 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-900/20 transition-all active:scale-95 text-xm"
          >
            Sí, eliminar registro
          </button>
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl border border-gray-200 shadow-sm transition-all active:scale-95 text-xm"
          >
            No, mantenerlo
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;