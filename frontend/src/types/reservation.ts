export interface Reservation {
  userId: string;
  startDate: Date;
  endDate: Date;
  hotel: {
    title: string;
    description: string;
  };
}