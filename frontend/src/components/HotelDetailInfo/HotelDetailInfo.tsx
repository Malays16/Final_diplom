import React from 'react';
import './HotelDetailInfo.scss';
import { Hotel } from '@/types/hotel';

interface HotelDetailInfoProps {
  hotel: Hotel;
}

const HotelDetailInfo: React.FC<HotelDetailInfoProps> = ({ hotel }) => {
  return (
    <div className="hotel-detail-info">
      <div className="hotel-images">
        <div className="hotel-img">
          <img
            src="https://www.softtour.by/pichotels/India/lazy-lagoon-sarovar-partico-suites-4/img/bg_3.jpg"
            alt={hotel.title}
          />
        </div>
        <div className="hotel-img">
          <img
            src="https://woodmart.xtemos.com/wp-content/uploads/2018/07/travel-product-img-6.jpg"
            alt={hotel.title}
          />
        </div>
      </div>
      <h2 className="hotel-title">{hotel.title}</h2>
      <div className="hotel-description">{hotel.description}</div>
      <div className="hotel-ctrl-bnts">
        <a href={`/hotels/${hotel.id}/edit-hotel`} className="btn btn-change">
          Редактировать
        </a>
        <a href={`/hotels/${hotel.id}/add-hotel-room`} className="btn btn-primary">
          Добавить номер
        </a>
      </div>
    </div>
  );
};

export default HotelDetailInfo;