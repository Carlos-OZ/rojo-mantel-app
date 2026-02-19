import React, { useState, useMemo } from 'react';
import { FaUserPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { useReservations } from '../../context/ReservationContext'; 
import CreateUserModal from '../../components/dashboard/CreateUserModal';
import EditUserModal from '../../components/dashboard/EditUserModal';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';  

const DashboardUsuarios = () => {
    const { users, deleteUser } = useReservations(); 
    
    // Estados para Modales
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // Estados para selección
    const [userToEdit, setUserToEdit] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    // === MANEJADORES DE ACCIÓN ===

    // Borrado con confirmación
    const handleDeleteRequest = (id) => {
        setIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteUser(idToDelete);
        setIsDeleteModalOpen(false);
        setIdToDelete(null);
    };

    // Edición
    const handleEditRequest = (user) => {
        setUserToEdit(user);
        setIsEditModalOpen(true);
    };

    // === CÁLCULOS DINÁMICOS DE ESTADÍSTICAS ===
    const stats = useMemo(() => [
        { label: 'Total de Usuarios', value: users.length },
        { label: 'Administradores', value: users.filter(u => u.perfil === 'Administrador').length },
        { label: 'Mozos', value: users.filter(u => u.perfil === 'Mozo').length },
    ], [users]);

    return (
        <div className="w-full">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-10">

                <h2 className="text-2xl font-bold text-gray-800 mb-10">Gestión de Usuarios</h2>

                {/* Tarjetas de Resumen Dinámicas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-100 rounded-[1.8rem] p-10 shadow-lg shadow-gray-100/40 text-center flex flex-col justify-center min-h-[160px]"
                        >
                            <p className="text-gray-500 font-bold text-sm mb-4 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-5xl font-black text-[#1e293b]">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 bg-[#b93a30] hover:bg-[#a02f27] text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-red-900/20 transition-all mb-10 group cursor-pointer uppercase tracking-widest text-xs active:scale-95"
                >
                    <FaUserPlus className="text-lg group-hover:scale-110 transition-transform" />
                    Crear Nuevo Usuario
                </button>

                {/* Tabla de Usuarios Dinámica */}
                <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-inner shadow-gray-50 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-100 bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Nombre Completo</th>
                                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Usuario</th>
                                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Perfil</th>
                                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Fecha de Creación</th>
                                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-700 font-black text-sm">
                                                    {user.nombre.charAt(0)}
                                                </div>
                                                <span className="font-bold text-gray-800">{user.nombre}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-gray-500 font-medium">@{user.usuario}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${user.perfil === 'Administrador'
                                                    ? 'bg-amber-50 text-amber-700 border-amber-100'
                                                    : 'bg-blue-50 text-blue-700 border-blue-100'
                                                }`}>
                                                {user.perfil}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-gray-500 font-bold text-sm">{user.fecha}</td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {/* Botón Editar funcional */}
                                                <button 
                                                    onClick={() => handleEditRequest(user)}
                                                    className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer active:scale-90"
                                                    title="Editar usuario"
                                                >
                                                    <FaEdit />
                                                </button>
                                                {/* Botón Eliminar con confirmación */}
                                                <button
                                                    onClick={() => handleDeleteRequest(user.id)} 
                                                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer active:scale-90"
                                                    title="Eliminar usuario"
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
                                        No hay usuarios registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MODALES --- */}
            
            <CreateUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <EditUserModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                userToEdit={userToEdit} 
            />

            <DeleteConfirmationModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Eliminar Usuario"
                message={`¿Estás seguro de que deseas eliminar a este usuario? Esta acción es irreversible.`}
            />
        </div>
    );
};

export default DashboardUsuarios;