import React, { useState } from 'react';
import { useReservations } from '../../context/ReservationContext';

const CreateTableModal = ({ isOpen, onClose }) => {
    const { addTable } = useReservations();

    // Estado local para capturar los datos del formulario
    const [tableData, setTableData] = useState({
        numero: '',
        ubicacion: 'Interior', // Valor por defecto
        capacidad: ''
    });

    if (!isOpen) return null;

    // Manejador de cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTableData({ ...tableData, [name]: value });
    };

    // Función para procesar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validamos que los campos no estén vacíos
        if (!tableData.numero || !tableData.capacidad) return;

        // Guardamos la nueva mesa en el estado global
        addTable(tableData);

        setTableData({ numero: '', ubicacion: 'Interior', capacidad: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Contenedor del Modal */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-12 transform animate-in zoom-in-95 duration-200 border border-gray-100">

                <h3 className="text-2xl font-black text-gray-800 text-center mb-8 uppercase tracking-tight">
                    Crear Nueva Mesa
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* N° Mesa */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">N° Mesa</label>
                        <input
                            type="text"
                            name="numero"
                            value={tableData.numero}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all shadow-sm"
                            placeholder="Ej: 05"
                        />
                    </div>

                    {/* Ubicacion */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Ubicación</label>
                        <select
                            name="ubicacion"
                            value={tableData.ubicacion}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all shadow-sm"
                        >
                            <option value="Interior">Interior</option>
                            <option value="Terraza">Terraza</option>
                            <option value="Ventana">Ventana</option>
                            <option value="VIP">VIP</option>
                            <option value="Bar">Bar</option>
                            <option value="Patio">Patio</option>
                        </select>
                    </div>

                    {/* Capacidad */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Capacidad</label>
                        <input
                            type="number"
                            name="capacidad"
                            value={tableData.capacidad}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all shadow-sm"
                            placeholder="Número de personas"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 pt-6">
                        <button
                            type="submit"
                            className="cursor-pointer flex-1 bg-red-700 hover:bg-red-800 text-white font-black py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
                        >
                            Crear Mesa
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl border border-gray-200 shadow-sm transition-all active:scale-95 uppercase tracking-widest text-xs"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTableModal;