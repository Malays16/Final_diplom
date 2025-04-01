import React, { useRef, useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { Nullable } from '@/types/common';
import { AuthUser, User } from '@/types/user';
import AuthModal from '@components/Auth/AuthModal';
import NotAuthLogo from '@/assets/images/cat-svgrepo-com.svg';
import Logo from '@/assets/images/hotel-logo.svg';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<Nullable<AuthUser>>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkUser = localStorage.getItem('user');
    if (checkUser) {
      const parsedUser: AuthUser = JSON.parse(checkUser);
      setIsAuth(true);
      setUser(parsedUser);
    }
  }, []);

  const toggleModal = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleAuthSuccess = (user: AuthUser) => {
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuth(true);
    setUser(user);
    setIsModalOpen(false);
  };

  const handleRegSuccess = (user: User) => {
    console.log(user);
    setIsModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuth(false);
    setUser(null);
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={Logo} className="logo-img" alt="Hotel Logo" />
        <span>Hotel Booking</span>
      </div>
      <div className="header-auth">
        {isAuth ? (
          <>
            <div className={`profile ${isModalOpen ? 'active' : ''}`} onClick={toggleModal}>
              {user?.name} (<span>{user?.role.toUpperCase()}</span>)
            </div>
            <div className="header-avatar">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" />
            </div>
          </>
        ) : (
          <>
            <span className={`login ${isModalOpen ? 'active' : ''}`} onClick={toggleModal}>
              Войти
            </span>
            <div className="header-avatar">
              <img src={NotAuthLogo} alt="avatar" />
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <AuthModal
          ref={modalRef}
          isAuth={isAuth}
          logout={logout}
          onAuthSuccess={handleAuthSuccess}
          onRegSuccess={handleRegSuccess}
        />
      )}
    </header>
  );
};

export default Header;