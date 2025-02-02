import React from 'react';
import { Link } from 'react-router-dom';
import './HotelsList.scss';

const HotelsList: React.FC<{ hotels: any[] }> = ({ hotels }) => {
  const issetHotels = hotels && hotels.length > 0;
  return (
    <div className="hotel-list">
      {issetHotels &&
        hotels.map((hotel: any) => (
          <div key={hotel.id} className="hotel-item">
            <div className="hotel-img">
              <img
                src="https://yastatic.net/naydex/yandex-search/9pWNX5z16/95a196BGxrnj/YSKLrlMsDwZEuMyr9iac5RGMuI4xZV8zaWW5w8zmYA8Oa4JX2DryDZ1pZJE-qIKXW-b25fb0WThK4NhxgnPt1uVmT9pC6doCNW2MK8Z2vTDFvalLkSCOl0ylTYY8JiB_Xf0wUO9pVWvK3pMmmh0CUlviRwFCx5qA"
                alt={hotel.title}
              />
            </div>
            <div className="hotel-info">
              <h2 className="hotel-title">{hotel.title}</h2>
              <p className="hotel-description">{hotel.description}</p>
              <Link to={`/hotels/${hotel.id}`} className="hotel-detail-btn">
                Подробнее
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HotelsList;