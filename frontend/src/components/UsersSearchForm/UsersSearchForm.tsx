import React, { useState } from 'react';
import './UsersSearchForm.scss';
import { useNavigate } from 'react-router-dom';

type SearchFormProps = {
  onSearch: (query: string) => void;
};

const UsersSearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => onSearch(searchQuery);

  const createUser = () => navigate('/users/create');

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
        <div className="ctrl-btns">
          <button className="btn btn-primary" onClick={handleSearch}>
            Искать
          </button>
          <button className="btn btn-change" onClick={createUser}>
            Создать нового пользователя
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersSearchForm;