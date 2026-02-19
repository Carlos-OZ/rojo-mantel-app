<<<<<<< HEAD
import { createContext, useContext } from 'react';

export const ReservationContext = createContext(null);

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservations debe usarse dentro de un ReservationProvider");
  }
  return context;
=======
import { createContext, useContext } from 'react';

export const ReservationContext = createContext(null);

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservations debe usarse dentro de un ReservationProvider");
  }
  return context;
>>>>>>> 307a0a2e9fd3469e551256cbab00fb844d0892eb
};