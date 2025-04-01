import React, { useCallback, useEffect, useState } from 'react';
import './HotelRoomsList.scss';
import { getHotelRooms } from '@/services/hotels/hotelService';
import { HotelId } from '@/types/hotel';
import { HotelRoom } from '@/types/hotel-room';
import { STATIC_IMG } from '@/services/apiConfig';
import { AuthUser, UserRole } from '@/types/user';

interface HotelRoomsListProps {
  hotelId: HotelId;
  user: AuthUser;
}

const HotelRoomsList: React.FC<HotelRoomsListProps> = ({ hotelId, user }) => {
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkIn] = useState<string>('2026-08-01');
  const [checkOut] = useState<string>('2026-08-08');
  const limit = 5;
  const isAdmin = user?.role === UserRole.ADMIN;

  const loadHotelRooms = useCallback(
    async (page: number = 1) => {
      const offset = (page - 1) * limit;
      const data = await getHotelRooms({ limit, offset, hotel: hotelId, checkIn, checkOut });
      setHotelRooms(data);
      setLoading(false);
    },
    [hotelId, checkIn, checkOut]
  );

  useEffect(() => {
    loadHotelRooms(page);
  }, [page, loadHotelRooms]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hotel-rooms-list">
      {hotelRooms.map((room: HotelRoom) => (
        <div key={room.id} className="hotel-room">
          <div className="hotel-room-images">
            {room.images.length &&
              room.images.map((image, index) => (
                <div className="hotel-room-img" key={index}>
                  <img src={`${STATIC_IMG}/hotel-rooms/${image}`} alt={room.title} />
                </div>
              ))}
          </div>
          <h3 className="hotel-room-title">{room.title}</h3>
          <div className="hotel-room-description">{room.description}</div>
          {isAdmin &&
            <a href={`/hotels/${hotelId}/edit-room/${room.id}`} className="btn btn-change">
              Редактировать
            </a>
          }
        </div>
      ))}
    </div>
  );
};

export default HotelRoomsList;