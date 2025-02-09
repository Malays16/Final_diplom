import { getHotels } from '@/services/hotels/hotelService';
import React, { useState, useEffect } from 'react';
import HotelsList from '@components/HotelsList';
import './HotelsSearch.scss';
import { Hotel } from '@/types/hotel';

const HotelsSearch: React.FC = () => {
  const [hotelName, setHotelName] = useState<string>('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const hotelsPerPage: number = 5;

  const getTotalCount = async () => {
    const data = await getHotels(hotelName, 0, 0);
    setTotalPages(Math.ceil(data.length / hotelsPerPage));
  };

  useEffect(() => {
    loadHotels(hotelName, page);
    getTotalCount();
  }, [page]);

  const loadHotels = async (title: string = '', page: number = 1) => {
    const offset = (page - 1) * hotelsPerPage;
    const data = await getHotels(title, hotelsPerPage, offset);
    setHotels(data);
  };

  const handleSearch = () => {
    setPage(1);
    getTotalCount();
    loadHotels(hotelName);
  };

  return (
    <div className="hotels-search">
      <div className="hotels-search-form">
        <h2 className="page-title">Поиск гостиницы</h2>
        <input
          type="text"
          className="hotels-search-input"
          placeholder="Введите название гостиницы (необязательно)"
          value={hotelName}
          onChange={e => setHotelName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Искать
        </button>
      </div>
      <HotelsList hotels={hotels} />
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => setPage(index + 1)} disabled={page === index + 1}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HotelsSearch;