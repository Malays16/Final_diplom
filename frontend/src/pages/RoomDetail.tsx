import React, { useEffect, useState } from 'react';
import RoomDetailInfo from '@components/RoomDetailInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { HotelRoom, HotelRoomId } from '@/types/hotel-room';
import { getHotelRoom } from '@/services/hotels/roomService';
import { createReservation } from '@/services/reservations/reservationsService';

const RoomDetail: React.FC = () => {
  const [room, setRoom] = useState<HotelRoom>({} as HotelRoom);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: HotelRoomId }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) loadRoomDetail(id);
  }, [id]);

  if (!id) {
    return <div className="error-page">Ошибка: такой номер не найден</div>;
  }

  const loadRoomDetail = async (roomId: HotelRoomId) => {
    const data = await getHotelRoom(roomId);
    setRoom(data);
    setLoading(false);
  };

  const roomReservation = async () => {
    try {
      await createReservation({
        hotelRoom: id,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      });

      navigate('/rooms');
    } catch (error) {
      console.error('Error creating reservation: ', error);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="page">
      <RoomDetailInfo room={room} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} handleReservation={roomReservation} />
    </div>
  );
};

export default RoomDetail;