import React, { useEffect, useState } from 'react';
import { getReservations } from '@/services/reservations/reservationsService';
import { useParams } from 'react-router-dom';
import { getUserById } from '@/services/users/usersService';
import { User } from '@/types/user';
import UserReservationsForm from '@/components/UserReservationsForm';
import type { Reservation } from '@/types/reservation';

const UserReservations: React.FC = () => {
  const [user, setUser] = useState<User>({} as User);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    if (!userId) {
      return;
    }
    const userData = await getUserById(userId);
    const reservations = await getReservations(userId);
    setUser(userData);
    setReservations(reservations);
  };

  return (
    <div className="page">
      <div className="reservations-page">
        <h2 className="page-title">{user.name}</h2>
        <UserReservationsForm reservations={reservations} />
      </div>
    </div>
  );
};

export default UserReservations;