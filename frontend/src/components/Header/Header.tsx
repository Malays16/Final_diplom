import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        Logo
      </div>
      <div className="header-auth">
        <Link to="/login" className="login">
          Войти
        </Link>
        <div className="header-avatar">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;