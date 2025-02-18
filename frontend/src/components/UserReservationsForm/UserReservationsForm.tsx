import React from 'react';
import './UserReservationsForm.scss';
import { Reservation } from '@/types/reservation';
import { formatDate } from '@/utils/dateUtils';

interface ReservationsListProps {
  reservations: Reservation[];
}

const UsersList: React.FC<ReservationsListProps> = ({ reservations }) => {
  return (
    <div className="reservations-list">
      <table className="reservations-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Отель</th>
            <th>Дата заезда</th>
            <th>Дата выезда</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length &&
            reservations.map((reservation, index) => (
              <tr className="users-list-item" key={index + 1}>
                <td>{index + 1}</td>
                <td>{reservation.hotel.title}</td>
                <td>{formatDate(reservation.startDate)}</td>
                <td>{formatDate(reservation.endDate)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;