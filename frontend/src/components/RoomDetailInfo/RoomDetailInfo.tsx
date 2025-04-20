import React from 'react';
import './RoomDetailInfo.scss';
import { STATIC_IMG } from '@/services/apiConfig';
import { HotelRoom } from '@/types/hotel-room';
import NoImage from '@/assets/images/no-image.jpg';

interface RoomDetailInfoProps {
  room: HotelRoom;
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleReservation: () => void
}

const RoomDetailInfo: React.FC<RoomDetailInfoProps> = (formProps) => {
  const { room, startDate, endDate, setStartDate, setEndDate, handleReservation } = formProps;

  return (
    <div className="room-detail-info">
      <div className="room-detail-images">
        {room.images.length ? (
          room.images.map((image, index) => (
            <div className="room-detail-img" key={index}>
              <img src={`${STATIC_IMG}/hotel-rooms/${image}`} alt={room.title} />
            </div>
          ))
        ) : (
          <div className="room-detail-img">
            <img src={NoImage} alt={room.title} />
          </div>
        )}
      </div>
      <h2 className="room-detail-title">{room.title}</h2>
      <div className="room-detail-description">{room.description}</div>
      <div className="room-detail-dates">
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /> -
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleReservation}>Забронировать</button>
    </div>
  );
};

export default RoomDetailInfo;