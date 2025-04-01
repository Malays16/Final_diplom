import { HotelRoom } from '@/types/hotel-room';
import { getRooms } from '../services/hotels/roomService';
import React, { useState, useEffect, useCallback } from 'react';
import RoomsSearchForm from '@/components/RoomsSearchForm';
import Pagination from '@components/Pagination';
import RoomsList from '@/components/RoomsList';

const RoomsSearchPage: React.FC = () => {
  const [hotelId, setHotelId] = useState<string>('');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [rooms, setRooms] = useState<HotelRoom[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const roomsPerPage: number = 5;

  const getTotalCount = useCallback(
    async () => {
      const data = await getRooms(0, 0, searchInput, dateStart, dateEnd);
      setTotalPages(Math.ceil(data.length / roomsPerPage));
    },
    [roomsPerPage]
  );

  const loadRooms = useCallback(
    async (hotelId: string, page: number) => {
      try {
        setIsLoading(true);
        const offset = (page - 1) * roomsPerPage;
        const data = await getRooms(roomsPerPage, offset, hotelId, dateStart, dateEnd);
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
    getTotalCount();
    loadRooms(hotelId, page);
  }, [page, searchInput, getTotalCount, loadRooms]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchInput(hotelId);
    setPage(1);
  };

  return (
    <div className="page">
      <RoomsSearchForm hotelId={hotelId} dateStart={dateStart} dateEnd={dateEnd} setHotelId={setHotelId} setDateStart={setDateStart} setDateEnd={setDateEnd} handleSearch={handleSearch} />
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