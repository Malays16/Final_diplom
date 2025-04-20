import React from 'react';
import { Link } from 'react-router-dom';
import './HotelsList.scss';
import { Hotel } from '@/types/hotel';
import { STATIC_IMG } from '@/services/apiConfig';
import NoImage from '@/assets/images/no-image.jpg';

const HotelsList: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => {
  const issetHotels = hotels && hotels.length > 0;
  return (
    <div className="hotel-list">
      {issetHotels &&
        hotels.map((hotel: Hotel) => (
          <div key={hotel.id} className="hotel-item">
            <div className="hotel-img">
              {hotel?.images.length ? (
                <img src={`${STATIC_IMG}/hotels/${hotel.images[0]}`} alt={hotel.title} />
              ) : (
                <img src={NoImage} alt={hotel.title} />
              )}
            </div>
            <div className="hotel-info">
              <h2 className="hotel-title">{hotel.title}</h2>
              <p className="hotel-description">{hotel.description}</p>
              <Link to={`/hotels/${hotel.id}`} className="btn btn-primary">
                Подробнее
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HotelsList;
