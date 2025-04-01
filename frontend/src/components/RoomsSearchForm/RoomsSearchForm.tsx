import React from 'react';
import './RoomsSearchForm.scss';

interface RoomsSearchFormProps {
  hotelId: string;
  dateStart: string;
  dateEnd: string;
  setHotelId: (name: string) => void;
  setDateStart: (date: string) => void;
  setDateEnd: (date: string) => void;
  handleSearch: (event: React.FormEvent) => void;
}

const RoomsSearchForm: React.FC<RoomsSearchFormProps> = (formProps) => {
  const { hotelId, dateStart, dateEnd, setHotelId, setDateStart, setDateEnd, handleSearch } = formProps;

  return (
    <div className="rooms-search-form">
      <h2 className="page-title">Поиск номера</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="rooms-search-input"
          placeholder="Введите id отеля (необязательно)"
          value={hotelId}
          onChange={e => setHotelId(e.target.value)}
        />
        <div className="rooms-search-dates">
          <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} /> -
          <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">
          Искать
        </button>
      </form>
    </div>
  );
};

export default RoomsSearchForm;