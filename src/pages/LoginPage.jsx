import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaKey } from 'react-icons/fa';
import InputField from '../components/common/InputField';
import Modal from '../components/common/Modal';
import logoImg from '../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate(); //

  // Estado para controlar la visibilidad del modal de éxito
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Manejador del formulario
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Validando credenciales...");
    setIsLoginModalOpen(true);
  };

  // Función para cerrar el modal y realizar la navegación final
  const handleAcceptLogin = () => {
    setIsLoginModalOpen(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-10 md:p-12 w-full max-w-md flex flex-col items-center border border-gray-100">

        <div className="mb-2 text-center">
          <img src={logoImg} alt="Logo Rojo Mantel" className="h-40 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Iniciar Sesión</h1>
        <p className="text-gray-500 mb-8 font-medium">Sistema de Gestión de Reservas</p>

        <form className="w-full" onSubmit={handleLogin}>
          <InputField
            label="Usuario"
            icon={FaUser}
            type="text"
            id="username"
            name="username"
            placeholder="Tu nombre de usuario"
          />

          <InputField
            label="Contraseña"
            icon={FaKey}
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
          />

          <div className="flex flex-col md:flex-row gap-4 mt-10">
            <button
              type="submit"
              className="flex-1 cursor-pointer bg-red-700 hover:bg-red-800 text-white font-black py-4 px-4 rounded-2xl shadow-lg transition-all text-sm"
            >
              Iniciar Sesión
            </button>

            <Link
              to="/"
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-6 rounded-2xl border border-gray-200 shadow-sm active:scale-95 transition-all text-center text-sm"
            >
              Cancelar
            </Link>
          </div>
        </form>

      </div>

      {/* === COMPONENTE MODAL DE INICIO DE SESIÓN EXITOSO === */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={handleAcceptLogin}
        onConfirm={handleAcceptLogin}
        type="success"
        title="¡Bienvenido!"
        message="Inicio de Sesión exitoso. Te estamos redirigiendo al panel de gestión de Rojo Mantel."
      />
    </div>
  );
};

export default LoginPage;