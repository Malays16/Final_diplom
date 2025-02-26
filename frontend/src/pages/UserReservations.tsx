import React, { useCallback, useEffect, useState } from 'react';
import { getReservations } from '@/services/reservations/reservationsService';
import { useParams } from 'react-router-dom';
import { getUserById } from '@/services/users/usersService';
import { User } from '@/types/user';
import UserReservationsForm from '@/components/UserReservationsForm';
import type { Reservation } from '@/types/reservation';

const UserReservations: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useParams<{ userId: string }>();

  const loadReservations = useCallback(async () => {
    if (!userId) {
      return;
    }
    setIsLoading(true);

    try {
      const [userData, reservations] = await Promise.all([
        getUserById(userId),
        getReservations(userId)
      ]);
      setUser(userData);
      setReservations(reservations);
    } catch (error) {
      console.error('Failed to load data: ', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  if (!userId) {
    return <div>User not found</div>;
  }

  return (
    <div className="page">
      <div className="reservations-page">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <h2 className="page-title">{user?.name}</h2>
            <UserReservationsForm reservations={reservations} />
          </>
        )}
      </div>
    </div>
  );
};

export default UserReservations;