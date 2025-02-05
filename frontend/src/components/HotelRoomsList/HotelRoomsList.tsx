import React, { useCallback, useEffect, useState } from 'react';
import './HotelRoomsList.scss';
import { getHotelRooms } from '@/services/hotels/hotelService';
import { HotelId } from '@/types/hotel';
import { HotelRoom } from '@/types/hotel-room';

interface HotelRoomsListProps {
  hotelId: HotelId;
}

const HotelRoomsList: React.FC<HotelRoomsListProps> = ({ hotelId }) => {
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkIn] = useState<string>('2026-08-01');
  const [checkOut] = useState<string>('2026-08-08');
  const limit = 5;

  const loadHotelRooms = useCallback(
    async (page: number = 1) => {
      const offset = (page - 1) * limit;
      const data = await getHotelRooms(limit, offset, hotelId, checkIn, checkOut);
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
            <div className="hotel-room-img">
              <img
                src="https://avatars.mds.yandex.net/get-altay/2408158/2a000001705ec5a44567a6f55326dde2ee68/XXL"
                alt={room.title}
              />
            </div>
            <div className="hotel-room-img">
              <img
                src="https://www.treartex.ru/upload/medialibrary/9c5/9c55b52b527c4f74821329d3c4dd9531.jpg"
                alt={room.title}
              />
            </div>
            <div className="hotel-room-img">
              <img
                src="https://image-tc.galaxy.tf/wijpeg-9slm60mc1imwyhj1arb3ze3hm/general-view-1-1.jpg"
                alt={room.title}
              />
            </div>
          </div>
          <h3 className="hotel-room-title">Hotel room {room.id}</h3>
          <div className="hotel-room-description">
            {room.description}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia explicabo sed eaque quod vero provident similique facere aliquam reprehenderit dolores tempore aspernatur placeat ex, libero quis voluptatem mollitia voluptas quia!
          </div>
          <a href={`/hotels/${hotelId}/edit-hotel-room/${room.id}`} className="btn btn-change">
            Редактировать
          </a>
        </div>
      ))}
    </div>
  );
};

export default HotelRoomsList;