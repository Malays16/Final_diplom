import { HotelRoom } from '@/types/hotel-room';
import { getRooms } from '../services/hotels/roomService';
import React, { useState, useEffect, useCallback } from 'react';
import RoomsSearchForm from '@/components/RoomsSearchForm';
import Pagination from '@components/Pagination';
import RoomsList from '@/components/RoomsList';

interface SearchParams {
  hotelId?: string;
  dateStart?: string;
  dateEnd?: string;
}

const RoomsSearchPage: React.FC = () => {
  const [hotelId, setHotelId] = useState<string>('');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [rooms, setRooms] = useState<HotelRoom[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const roomsPerPage: number = 5;

  const getTotalCount = useCallback(
    async (filters: SearchParams) => {
      const data = await getRooms(0, 0, filters.hotelId ?? '', filters.dateStart ?? '', filters.dateEnd ?? '');
      setTotalPages(Math.ceil(data.length / roomsPerPage));
    },
    [roomsPerPage]
  );

  const loadRooms = useCallback(
    async (filters: SearchParams, page: number) => {
      try {
        setIsLoading(true);
        const offset = (page - 1) * roomsPerPage;
        const data = await getRooms(roomsPerPage, offset, filters.hotelId ?? '', filters.dateStart ?? '', filters.dateEnd ?? '');
        setRooms(data);
      } catch (error) {
        console.error('Error loading rooms: ', error);
      } finally {
        setIsLoading(false);
      }
    },
    [roomsPerPage]
  );

  useEffect(() => {
    getTotalCount(searchParams);
    loadRooms(searchParams, page);
  }, [searchParams, page, getTotalCount, loadRooms]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchParams({ hotelId: hotelId || '', dateStart: dateStart || '', dateEnd: dateEnd || '' });
    setPage(1);
  };

  return (
    <div className="page">
      <RoomsSearchForm
        hotelId={hotelId}
        dateStart={dateStart}
        dateEnd={dateEnd}
        setHotelId={setHotelId}
        setDateStart={setDateStart}
        setDateEnd={setDateEnd}
        handleSearch={handleSearch}
      />
      {isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <>
          <RoomsList rooms={rooms} />
          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </>
      )}
    </div>
  );
};

export default RoomsSearchPage;