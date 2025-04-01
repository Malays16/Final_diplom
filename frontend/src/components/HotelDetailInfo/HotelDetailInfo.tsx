import React from 'react';
import './HotelDetailInfo.scss';
import { Hotel } from '@/types/hotel';
import { STATIC_IMG } from '@/services/apiConfig';
import { AuthUser, UserRole } from '@/types/user';

interface HotelDetailInfoProps {
  hotel: Hotel;
  user: AuthUser;
}

const HotelDetailInfo: React.FC<HotelDetailInfoProps> = ({ hotel, user }) => {
  const isAdmin = user?.role === UserRole.ADMIN;

  console.log('auth user ', user);
  return (
    <div className="hotel-detail-info">
      <div className="hotel-detail-images">
        {hotel.images &&
          hotel.images.map((image, index) => (
            <div className="hotel-detail-img" key={index}>
              <img src={`${STATIC_IMG}/hotels/${image}`} alt={hotel.title} />
            </div>
          ))}
      </div>
      <h2 className="hotel-detail-title">{hotel.title}</h2>
      <div className="hotel-detail-description">{hotel.description}</div>
      {isAdmin &&
        <div className="hotel-ctrl-bnts">
          <a href={`/hotels/${hotel.id}/edit`} className="btn btn-change">
            Редактировать
          </a>
          <a href={`/hotels/${hotel.id}/add-room`} className="btn btn-primary">
            Добавить номер
          </a>
        </div>
      }
    </div>
  );
};

export default HotelDetailInfo;