import React, { useState } from 'react'; //
import { Outlet, NavLink, useNavigate } from 'react-router-dom'; //
import { FaUserShield, FaSignOutAlt } from 'react-icons/fa';
import logoImg from '../../assets/logo.png';
import Modal from '../common/Modal';

const DashboardLayout = () => {
  const navigate = useNavigate(); //
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); //

  const navLinkStyles = ({ isActive }) => {
    return `px-6 py-2 rounded-full font-medium shadow-sm transition-all ${isActive
        ? 'bg-red-700 text-white'
        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
      }`;
  };

  // Función para ejecutar el cierre de sesión real
  const handleConfirmLogout = () => {
    navigate('/'); // Redirige al inicio
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* === HEADER PRINCIPAL === */}
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-[1800px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <img src={logoImg} alt="Rojo Mantel" className="h-20 w-auto" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Sistema de Reservas</h1>
                <p className="text-gray-500 text-sm">Sistema de Gestión de Reservas</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-amber-200 text-amber-900 px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">
                <FaUserShield /> Admin
              </button>
              
              <button 
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
              >
                <FaSignOutAlt /> Cerrar Sesión
              </button>
            </div>
          </div>

          <nav className="flex flex-wrap gap-4 pb-2">
            <NavLink to="/dashboard" end className={navLinkStyles}>Nueva Reserva</NavLink>
            <NavLink to="/dashboard/calendario" className={navLinkStyles}>Calendario</NavLink>
            <NavLink to="/dashboard/todas" className={navLinkStyles}>Todas las reservas</NavLink>
            <NavLink to="/dashboard/mesas" className={navLinkStyles}>Mesas</NavLink>
            <NavLink to="/dashboard/usuarios" className={navLinkStyles}>Usuarios</NavLink>
          </nav>
        </div>
      </header>

      {/* === ÁREA DE CONTENIDO DINÁMICO === */}
      <main className="max-w-[1800px] mx-auto px-8 py-8">
        <Outlet />
      </main>

      {/* === MODAL DE CONFIRMACIÓN DE CIERRE DE SESIÓN === */}
      <Modal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)}
        type="confirm"
        title="¿Cerrar Sesión?"
        message="¿Estás seguro de que deseas salir del sistema de gestión de Rojo Mantel?"
        confirmLabel="Salir del sistema"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmLogout}
      />

    </div>
  );
};

export default DashboardLayout;