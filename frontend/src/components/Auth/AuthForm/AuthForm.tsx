import React, { useState } from 'react';
import './AuthForm.scss';
import { AuthUser, ModalType, User } from '@/types/user';
import { useNavigate } from 'react-router-dom';
import { login, register } from '@/services/auth/authService';

interface AuthFormProps {
  type: ModalType;
  onAuthSuccess: (user: AuthUser) => void;
  onRegSuccess: (user: User) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onAuthSuccess, onRegSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (type === ModalType.LOGIN) {
      try {
        const user = await login({ email, password });
        onAuthSuccess(user);
        navigate('/hotels');
      } catch (error) {
        console.error(error);
        throw new Error('Login failed');
      }
    } else {
      try {
        const user = await register({ email, password, name, contactPhone });
        onRegSuccess(user);
        navigate('/hotels');
      } catch (error) {
        console.error(error);
        throw new Error('Registration failed');
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {type === ModalType.LOGIN && (
        <div className="auth-form-content">
          <input
            type="email"
            placeholder="Введите email"
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Введите пароль"
            onChange={event => setPassword(event.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </div>
      )}
      {type === ModalType.REGISTER && (
        <div className="auth-form-content">
          <input
            type="email"
            placeholder="Введите email"
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Введите пароль"
            onChange={event => setPassword(event.target.value)}
          />
          <input
            type="text"
            placeholder="Введите имя"
            onChange={event => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Введите телефон"
            onChange={event => setContactPhone(event.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Зарегистрироваться
          </button>
        </div>
      )}
    </form>
  );
};

export default AuthForm;