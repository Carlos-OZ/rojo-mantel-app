import React, { useState } from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaTrash, FaEdit } from 'react-icons/fa';
import { useReservations } from '../../context/ReservationContext';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal'; //
import EditReservationModal from '../../components/dashboard/EditReservationModal';

const DashboardTodasReservas = () => {
    const { reservations, deleteReservation } = useReservations();

    // Estados para Modales
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Estados para selección
    const [idToDelete, setIdToDelete] = useState(null);
    const [reservationToEdit, setReservationToEdit] = useState(null);

    // === MANEJADORES DE ACCIÓN ===

    const handleDeleteRequest = (id) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteReservation(idToDelete); //
        setIsDeleteModalOpen(false);
        setIdToDelete(null);
    };

    const handleEditRequest = (res) => {
        setReservationToEdit(res);
        setIsEditModalOpen(true);
    };

    // Cálculos dinámicos
    const stats = [
        { label: 'Total', count: reservations.length },
        { label: 'Confirmadas', count: reservations.filter(r => r.estado === 'Confirmado').length },
        { label: 'Pendientes', count: reservations.filter(r => r.estado === 'Pendiente').length },
        { label: 'Canceladas', count: reservations.filter(r => r.estado === 'Cancelado').length },
    ];

    const statusStyles = {
        Confirmado: "bg-green-100 text-green-700",
        Pendiente: "bg-yellow-100 text-yellow-700",
        Cancelado: "bg-red-100 text-red-700",
    };

    return (
        <div className="w-full space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-10">
                <h2 className="text-2xl font-bold text-[#1e293b] mb-10">Gestión de Reservas</h2>

                {/* === TARJETAS DE ESTADÍSTICAS === */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white border border-gray-100 rounded-[1.8rem] p-10 shadow-lg shadow-gray-100/40 text-center">
                            <p className="text-gray-500 font-semibold text-lg mb-4">{stat.label}</p>
                            <p className="text-5xl font-black text-[#1e293b]">{stat.count}</p>
                        </div>
                    ))}
                </div>

                {/* === TABLA DE REGISTROS === */}
                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-inner shadow-gray-50">
                    {reservations.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                                        <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Fecha / Hora</th>
                                        <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {reservations.map((res) => (
                                        <tr key={res.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-gray-800">{res.cliente}</p>
                                                <p className="text-xs text-gray-400">{res.email}</p>
                                            </td>
                                            <td className="px-8 py-6 text-gray-600 font-medium">
                                                {res.fecha} <span className="text-gray-300 mx-1">|</span> {res.hora}
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        onClick={() => handleEditRequest(res)}
                                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer active:scale-90"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteRequest(res.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer active:scale-90"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="h-80 flex flex-col items-center justify-center text-center p-10">
                            <FaCalendarAlt className="text-6xl text-gray-100 mb-4" />
                            <p className="text-gray-400 italic font-medium text-lg">No hay registros de reservas actualmente.</p>
                            <p className="text-gray-300 text-sm">Crea una nueva reserva para verla aquí.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODALES --- */}

            <EditReservationModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                reservationToEdit={reservationToEdit}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Reservación"
                message="¿Estás seguro de cancelar esta reserva? La mesa asignada volverá a estar disponible de inmediato."
            />
        </div>
    );
};

export default DashboardTodasReservas;