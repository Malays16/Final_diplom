import React, { useRef, useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import { Nullable } from '@/types/common';
import { AuthUser, User } from '@/types/user';
import AuthModal from '@components/Auth/AuthModal';

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
        Logo
      </div>
      <div className="header-auth">
        {isAuth ? (
          <>
            <span className={isModalOpen ? 'active' : ''} onClick={toggleModal}>
              {user?.name}
            </span>
            <div className="header-avatar">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" />
            </div>
          </>
        ) : (
          <>
            <span className={`login ${isModalOpen ? 'active' : ''}`} onClick={toggleModal}>
              Войти
            </span>
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