import React, { useState } from 'react';
import { ReservationContext } from './ReservationContext';

export const ReservationProvider = ({ children }) => {

    const [tables, setTables] = useState([
        { id: 1, status: 'disponible', ubicacion: 'Interior', capacidad: 4 },
        { id: 2, status: 'disponible', ubicacion: 'Interior', capacidad: 4 },
        { id: 3, status: 'disponible', ubicacion: 'Terraza', capacidad: 2 },
        { id: 4, status: 'disponible', ubicacion: 'Ventana', capacidad: 2 },
        { id: 5, status: 'disponible', ubicacion: 'VIP', capacidad: 6 },
        { id: 6, status: 'disponible', ubicacion: 'Interior', capacidad: 4 },
        { id: 7, status: 'disponible', ubicacion: 'Terraza', capacidad: 4 },
        { id: 8, status: 'disponible', ubicacion: 'Interior', capacidad: 2 },
        { id: 9, status: 'disponible', ubicacion: 'Interior', capacidad: 4 },
        { id: 10, status: 'disponible', ubicacion: 'Ventana', capacidad: 4 },
    ]);

    const [reservations, setReservations] = useState([]);

    const [users, setUsers] = useState([
        { id: 1, nombre: 'Erick Cardenas', usuario: 'admin', perfil: 'Administrador', fecha: '2026-01-15' },
        { id: 2, nombre: 'Luis Llatas', usuario: 'Lllatas', perfil: 'Mozo', fecha: '2026-01-20' },
        { id: 3, nombre: 'Carlos Ocampo', usuario: 'Cocampo', perfil: 'Mozo', fecha: '2026-01-25' },
    ]);

    // --- FUNCIONES DE CREACIÓN (CRUD: Create) ---

    const addTable = (newTable) => {
        setTables(prev => [...prev, {
            id: parseInt(newTable.numero),
            status: 'disponible',
            ubicacion: newTable.ubicacion,
            capacidad: parseInt(newTable.capacidad),
            descripcion: newTable.descripcion || 'Sin descripción'
        }]);
    };

    const addReservation = (newRes) => {
        setReservations(prev => [...prev, {
            ...newRes,
            id: Date.now(),
            estado: 'Confirmado'
        }]);

        if (newRes.mesa && newRes.mesa !== 'Aleatoria') {
            const mesaNum = parseInt(newRes.mesa.replace('Mesa ', ''));
            setTables(prev => prev.map(t =>
                t.id === mesaNum ? { ...t, status: 'ocupado' } : t
            ));
        }
    };

    const addUser = (newUser) => {
        setUsers(prev => [...prev, {
            ...newUser,
            id: Date.now(),
            fecha: new Date().toISOString().split('T')[0]
        }]);
    };

    // --- FUNCIONES DE ELIMINACIÓN (CRUD: Delete) ---

    const deleteReservation = (id) => {
        const resToCancel = reservations.find(r => r.id === id);
        if (resToCancel && resToCancel.mesa && resToCancel.mesa !== 'Aleatoria') {
            const mesaNum = parseInt(resToCancel.mesa.replace('Mesa ', ''));
            setTables(prev => prev.map(t => t.id === mesaNum ? { ...t, status: 'disponible' } : t));
        }
        setReservations(prev => prev.filter(res => res.id !== id));
    };

    const deleteTable = (id) => {
        setTables(prev => prev.filter(table => table.id !== id));
    };

    const deleteUser = (id) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    // --- FUNCIONES DE EDICIÓN (CRUD: Update) ---

    const updateReservation = (id, updatedData) => {
        setReservations(prev => prev.map(res => res.id === id ? { ...res, ...updatedData } : res));
    };

    const updateUser = (id, updatedData) => {
        setUsers(prev => prev.map(user => 
            user.id === id ? { ...user, ...updatedData } : user
        ));
    };

    const updateTable = (id, updatedData) => {
        setTables(prev => prev.map(table => 
            table.id === id ? { ...table, ...updatedData } : table
        ));
    };

    return (
        <ReservationContext.Provider value={{
            tables,
            reservations,
            users,
            addReservation,
            addTable,
            addUser,
            deleteReservation,
            deleteTable,
            deleteUser,
            updateReservation,
            updateUser,
            updateTable
        }}>
            {children}
        </ReservationContext.Provider>
    );
};