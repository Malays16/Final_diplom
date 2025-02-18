import React, { useState } from 'react';
import './UsersSearchForm.scss';

type SearchFormProps = {
  onSearch: (query: string) => void;
};

const UsersSearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => onSearch(searchQuery);

  return (
    <div className="users-search">
      <div className="users-search-form">
        <h2 className="page-title">Пользователи</h2>
        <input
          type="text"
          className="users-search-input"
          placeholder="Введите имя пользователя, телефон или почту"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Искать
        </button>
      </div>
    </div>
  );
};

export default UsersSearchForm;