import React, { useState, useMemo } from 'react';
import { FaPlus, FaTrash, FaEdit, FaCircle } from 'react-icons/fa';
import { useReservations } from '../../context/ReservationContext';
import CreateTableModal from '../../components/dashboard/CreateTableModal';
import EditTableModal from '../../components/dashboard/EditTableModal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';

const DashboardMesas = () => {
    const { tables, deleteTable } = useReservations(); 
    
    // Estados para Modales
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // Estados para selección
    const [tableToEdit, setTableToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    // === MANEJADORES DE ACCIÓN ===

    // Borrado con confirmación
    const handleDeleteRequest = (id) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteTable(idToDelete);
        setIsDeleteModalOpen(false);
        setIdToDelete(null);
    };

    // Edición
    const handleEditRequest = (mesa) => {
        setTableToEdit(mesa);
        setIsEditModalOpen(true);
    };

    // === CÁLCULOS DINÁMICOS PARA ESTADÍSTICAS ===
    const stats = useMemo(() => {
        const total = tables.length;
        const activas = tables.filter(t => t.status === 'disponible').length;
        const inactivas = total - activas;
        const capacidad = tables.reduce((acc, t) => acc + (parseInt(t.capacidad) || 4), 0);

        return [
            { label: 'Total de Mesas', value: total, color: 'text-gray-800' },
            { label: 'Activas', value: activas, color: 'text-green-500' },
            { label: 'Inactivas', value: inactivas, color: 'text-red-600' },
            { label: 'Capacidad Total', value: `${capacidad} personas`, color: 'text-gray-800' },
        ];
    }, [tables]);

    // === CÁLCULO DINÁMICO DE UBICACIONES ===
    const locations = useMemo(() => {
        const counts = { Interior: 0, Terraza: 0, Ventana: 0, VIP: 0, Bar: 0, Patio: 0 };
        tables.forEach(t => {
            if (counts.hasOwnProperty(t.ubicacion)) {
                counts[t.ubicacion]++;
            }
        });
        return Object.entries(counts).map(([label, count]) => ({ label, count }));
    }, [tables]);

    return (
        <div className="w-full">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">Gestión de Mesas</h2>

                {/* === TARJETAS DE ESTADÍSTICAS DINÁMICAS === */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white border border-gray-100 rounded-[1.5rem] p-8 shadow-md shadow-gray-100/50 transition-all hover:shadow-lg">
                            <p className="text-gray-500 font-bold text-xs mb-4 uppercase tracking-widest">{stat.label}</p>
                            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* === DISTRIBUCIÓN POR UBICACIÓN === */}
                <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-md shadow-gray-100/50 mb-8">
                    <p className="text-gray-700 font-black mb-6 uppercase tracking-wider text-sm">Distribución por ubicación</p>
                    <div className="flex flex-wrap gap-4">
                        {locations.map((loc, index) => (
                            <div key={index} className="flex items-center border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                                <span className="px-6 py-3 text-gray-500 text-xs font-black uppercase border-r border-gray-100 bg-gray-50/30">
                                    {loc.label}
                                </span>
                                <span className="px-6 py-3 text-gray-800 font-black text-lg">
                                    {loc.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* === BOTÓN: CREAR NUEVA MESA === */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer flex items-center gap-3 bg-[#b93a30] hover:bg-[#a02f27] text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-red-900/20 transition-all mb-10 group uppercase tracking-widest text-sm active:scale-95"
                >
                    <FaPlus className=""/>
                    Crear Nueva Mesa
                </button>

                {/* === TABLA DE MESAS DINÁMICA === */}
                <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-inner shadow-gray-50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Mesa</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Capacidad</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Ubicación</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Estado</th>
                                    <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {tables.length > 0 ? (
                                    tables.map((mesa) => (
                                        <tr key={mesa.id} className="hover:bg-gray-50/30 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-700 font-black">
                                                        {mesa.id}
                                                    </div>
                                                    <span className="font-black text-gray-800 uppercase text-sm">Mesa {mesa.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-tighter">
                                                    {mesa.capacidad || '4'} Personas
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-gray-500 font-bold text-sm">{mesa.ubicacion || 'Interior'}</span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                    mesa.status === 'disponible' 
                                                    ? 'bg-green-50 text-green-600 border-green-100' 
                                                    : 'bg-red-50 text-red-600 border-red-100'
                                                }`}>
                                                    <FaCircle className="text-[6px]" />
                                                    {mesa.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {/* Botón Editar con cursor-pointer y feedback activo */}
                                                    <button 
                                                        onClick={() => handleEditRequest(mesa)}
                                                        className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer active:scale-90"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    {/* Botón Eliminar con confirmación */}
                                                    <button 
                                                        onClick={() => handleDeleteRequest(mesa.id)}
                                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer active:scale-90"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="h-64">
                                        <td colSpan="5" className="text-center text-gray-300 italic font-bold uppercase tracking-widest text-xs">
                                            No hay mesas registradas actualmente.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* --- MODALES --- */}

            <CreateTableModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
            />

            <EditTableModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                tableToEdit={tableToEdit} 
            />

            <DeleteConfirmationModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Mesa"
                message={`¿Estás seguro de que deseas eliminar la Mesa ${tables.find(t => t.id === idToDelete)?.id}? Esta acción liberará cualquier reserva asociada.`}
            />
        </div>
    );
};
export default DashboardMesas;