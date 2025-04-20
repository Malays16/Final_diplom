import React from 'react';
import { Link } from 'react-router-dom';
import './RoomsList.scss';
import { STATIC_IMG } from '@/services/apiConfig';
import { HotelRoom } from '@/types/hotel-room';
import NoImage from '@/assets/images/no-image.jpg';

const RoomsList: React.FC<{ rooms: HotelRoom[] }> = ({ rooms }) => {
  const issetRooms = rooms && rooms.length > 0;
  return (
    <div className="room-list">
      {issetRooms &&
        rooms.map((room: HotelRoom) => (
          <div key={room.id} className="room-item">
            <div className="room-img">
              {room.images.length ? (
                <img src={`${STATIC_IMG}/hotel-rooms/${room.images[0]}`} alt={room.title} />
              ) : (
                <img src={NoImage} alt={room.title} />
              )}
            </div>
            <div className="room-info">
              <h2 className="room-title">{room.title}</h2>
              <p className="room-description">{room.description}</p>
              <Link to={`/rooms/${room.id}`} className="btn btn-primary">
                Подробнее
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RoomsList;