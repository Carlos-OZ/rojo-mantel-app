import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ReservarPage from './pages/ReservarPage';

import DashboardLayout from './components/layout/DashboardLayout';
import DashboardNuevaReserva from './pages/dashboard/DashboardNuevaReserva';
import DashboardTodasReservas from './pages/dashboard/DashboardTodasReservas';
import DashboardCalendario from './pages/dashboard/DashboardCalendario';
import DashboardMesas from './pages/dashboard/DashboardMesas';
import DashboardUsuarios from './pages/dashboard/DashboardUsuarios';    

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reservar" element={<ReservarPage />} />

      {/* Rutas Privadas del Dashboard (Anidadas) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* La ruta index es la que se carga en /dashboard */}
        <Route index element={<DashboardNuevaReserva />} />
        
        {/* Rutas secundarias del admin */}
        <Route path="calendario" element={<DashboardCalendario />} />
        <Route path="todas" element={<DashboardTodasReservas />} />
        <Route path="mesas" element={<DashboardMesas />} />
        <Route path="usuarios" element={<DashboardUsuarios />} />
      </Route>
    </Routes>
  );
}

export default App;