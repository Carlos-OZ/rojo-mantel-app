import React, { useState, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegCalendarCheck, FaClock, FaUser, FaUsers } from 'react-icons/fa';
import { useReservations } from '../../context/ReservationContext'; //

const DashboardCalendario = () => {
    const { reservations } = useReservations();

    // Estado para el día seleccionado
    const [selectedDay, setSelectedDay] = useState(1);

    // Estilos de estado compartidos con el resto del sistema
    const statusConfig = {
        Confirmado: { color: "bg-green-500", label: "Confirmado" },
        Pendiente: { color: "bg-yellow-400", label: "Pendiente" },
        Cancelado: { color: "bg-red-600", label: "Cancelado" },
    };

    // Filtrar las reservas del día seleccionado
  
    const dailyReservations = useMemo(() => {
        const formattedDate = `2026-02-${String(selectedDay).padStart(2, '0')}`;
        return reservations.filter(res => res.fecha === formattedDate);
    }, [reservations, selectedDay]);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[450px_1fr] gap-8 items-start w-full">

            {/* === CALENDARIO (IZQUIERDA) === */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Calendario de Reservas</h2>

                <div className="flex items-center justify-between mb-8 px-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400"><FaChevronLeft /></button>
                    <div className="flex gap-2 items-center">
                        <span className="font-bold text-red-700">Febrero</span>
                        <span className="font-bold text-gray-400">2026</span>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400"><FaChevronRight /></button>
                </div>

                <div className="grid grid-cols-7 gap-y-2 text-center">
                    {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(day => (
                        <div key={day} className="text-xs font-black text-gray-300 uppercase mb-4 tracking-tighter">{day}</div>
                    ))}

                    {[...Array(28)].map((_, i) => {
                        const day = i + 1;
                        const isSelected = selectedDay === day;

                        const hasReservations = reservations.some(r => r.fecha === `2026-02-${String(day).padStart(2, '0')}`);

                        return (
                            <div key={day} className="relative">
                                <button
                                    onClick={() => setSelectedDay(day)}
                                    className={`h-12 w-12 mx-auto flex items-center justify-center rounded-2xl text-sm transition-all relative z-10
                    ${isSelected
                                            ? 'bg-red-700 text-white font-black shadow-lg shadow-red-200 scale-110'
                                            : 'text-gray-600 hover:bg-gray-50 font-semibold'}
                  `}
                                >
                                    {day}
                                </button>
                                {/* Indicador de reserva si el día tiene registros */}
                                {hasReservations && !isSelected && (
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* === DETALLE DE RESERVAS === */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-10 h-full min-h-[600px]">
                <div className="mb-10 border-b border-gray-50 pb-6">
                    <h2 className="text-2xl font-black text-gray-800 mb-2">Reservas del Día</h2>
                    <div className="flex items-center gap-3 text-gray-500 font-bold bg-gray-50 w-fit px-6 py-2 rounded-2xl border border-gray-100">
                        <FaRegCalendarCheck className="text-red-700 text-lg" />
                        <span className="text-sm">Domingo, {selectedDay} de Febrero de 2026</span>
                    </div>
                </div>

                <div className="space-y-6">
                    {dailyReservations.length > 0 ? (
                        dailyReservations.map((res) => (
                            <div key={res.id} className="flex items-center justify-between border border-gray-100 bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-400 font-bold uppercase tracking-widest">
                                        <FaClock className="text-red-700" /> {res.hora || 'Sin hora'}
                                    </div>
                                    <div className="flex items-center gap-3 text-xl text-gray-800 font-black">
                                        <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                                            <FaUser className="text-red-700 text-xs" />
                                        </div>
                                        {res.cliente}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                                        <FaUsers className="text-gray-300" />
                                        <span>Mesa: <b className="text-gray-600">{res.mesa}</b></span>
                                        <span className="text-gray-200">|</span>
                                        <span>Pers: <b className="text-gray-600">{res.personas}</b></span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className={`${statusConfig[res.estado]?.color || 'bg-gray-400'} text-white px-8 py-2 rounded-full text-xs font-black shadow-md uppercase tracking-widest`}>
                                        {res.estado || 'Confirmado'}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                            <FaRegCalendarCheck className="text-6xl mb-4 text-gray-200" />
                            <p className="text-lg font-bold text-gray-400">No hay reservas para este día</p>
                            <p className="text-sm">Selecciona otro día en el calendario</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default DashboardCalendario;