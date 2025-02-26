export interface Reservation {
  userId: string;
  startDate: Date;
  endDate: Date;
  hotel: {
    title: string;
    description: string;
  };
}

export interface ReservationsListProps {
  reservations: Reservation[];
}