import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, type = 'success', title, message, onConfirm, confirmLabel = "Aceptar", cancelLabel = "Cancelar" }) => {
    if (!isOpen) return null;

    // Configuración de estilos por tipo
    const configs = {
        success: { icon: FaCheckCircle, color: 'text-green-500', btn: 'bg-red-700' },
        confirm: { icon: FaExclamationTriangle, color: 'text-amber-500', btn: 'bg-red-700' },
        info: { icon: FaInfoCircle, color: 'text-blue-500', btn: 'bg-red-700' }
    };

    const { icon: Icon, color, btn } = configs[type];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">

            {/* Contenedor del Modal */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden transform animate-in zoom-in-95 duration-300">

                {/* Encabezado Decorativo */}
                <div className="h-1 bg-gradient-to-r from-red-700 to-red-500" />

                <div className="p-10 text-center">

                    {/* Texto */}
                    <h3 className="text-2xl font-black text-gray-800 mb-4 tracking-tight">
                        {title}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed mb-8">
                        {message}
                    </p>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onConfirm || onClose}
                            className={`${btn} text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 transition-all hover:bg-red-800 cursor-pointer`}
                        >
                            {confirmLabel}
                        </button>
                        {type === 'confirm' && (
                            <button
                                onClick={onClose}
                                className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-500 font-bold hover:bg-gray-50 transition-all hover:bg-gray-100 cursor-pointer"
                            >
                                {cancelLabel}
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;