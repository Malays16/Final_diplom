import { getHotels } from '@/services/hotels/hotelService';
import React, { useState, useEffect, useCallback } from 'react';
import HotelsList from '@components/HotelsList';
import './HotelsSearch.scss';
import { Hotel } from '@/types/hotel';
import Pagination from '../Pagination';

const HotelsSearch: React.FC = () => {
  const [hotelName, setHotelName] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hotelsPerPage: number = 5;

  const getTotalCount = useCallback(
    async (searchName: string) => {
      const data = await getHotels(searchName, 0, 0);
      setTotalPages(Math.ceil(data.length / hotelsPerPage));
    },
    [hotelsPerPage]
  );

  const loadHotels = useCallback(
    async (title: string, page: number) => {
      try {
        setIsLoading(true);
        const offset = (page - 1) * hotelsPerPage;
        const data = await getHotels(title, hotelsPerPage, offset);
        setHotels(data);
      } catch (error) {
        console.error('Error loading hotels: ', error);
      } finally {
        setIsLoading(false);
      }
    },
    [hotelsPerPage]
  );

  useEffect(() => {
    getTotalCount(searchInput);
    loadHotels(hotelName, page);
  }, [page, searchInput, getTotalCount, loadHotels]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchInput(hotelName);
    setPage(1);
  };

  return (
    <div className="hotels-search">
      <div className="hotels-search-form">
        <h2 className="page-title">Поиск гостиницы</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="hotels-search-input"
            placeholder="Введите название гостиницы (необязательно)"
            value={hotelName}
            onChange={e => setHotelName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Искать
          </button>
        </form>
      </div>
      {isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <>
          <HotelsList hotels={hotels} />
          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}
    </div>
  );
};

export default HotelsSearch;