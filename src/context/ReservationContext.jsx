import { createContext, useContext } from 'react';

export const ReservationContext = createContext(null);

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservations debe usarse dentro de un ReservationProvider");
  }
  return context;
};