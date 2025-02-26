import { forwardRef, useState } from 'react';
import './AuthModal.scss';
import AuthForm from '@components/Auth/AuthForm';
import { AuthUser, ModalType, User } from '@/types/user';

interface AuthModalProps {
  ref: HTMLDivElement;
  isAuth: boolean;
  logout: () => void;
  onAuthSuccess: (user: AuthUser) => void;
  onRegSuccess: (user: User) => void;
}

const AuthModal = forwardRef<HTMLDivElement, AuthModalProps>(
  ({ isAuth, logout, onAuthSuccess, onRegSuccess }, ref) => {
    const [type, setType] = useState<ModalType>(ModalType.LOGIN);

    const changeType = (event: React.MouseEvent<HTMLButtonElement>, newType: ModalType) => {
      event.preventDefault();
      setType(newType);
    };

    return (
      <div className="modal" ref={ref}>
        <div className="modal-content">
          {isAuth && (
            <span className="logout" onClick={logout}>
              Выйти
            </span>
          )}
          {!isAuth && (
            <div className="modal-not-auth">
              <div className="modal-header">
                <button type="button" onClick={event => changeType(event, ModalType.LOGIN)}>
                  Войти
                </button>
                <span>или</span>
                <button type="button" onClick={event => changeType(event, ModalType.REGISTER)}>
                  Зарегистрироваться
                </button>
              </div>
              <AuthForm type={type} onAuthSuccess={onAuthSuccess} onRegSuccess={onRegSuccess} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default AuthModal;