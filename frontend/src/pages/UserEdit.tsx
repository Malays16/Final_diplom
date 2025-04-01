import { createUser, getUserById, updateUser } from '@/services/users/usersService';
import { FormErrors, UserFormData, UserRole } from '@/types/user';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit: React.FC = () => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    name: '',
    contactPhone: '',
    role: UserRole.CLIENT
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const user = await getUserById(id);
          setFormData({
            email: user.email,
            password: '',
            name: user.name,
            contactPhone: user.contactPhone,
            role: user.role
          });
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
    setPageTitle(id ? 'Редактирование пользователя' : 'Добавление пользователя');
  }, [id]);

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {};

      if (!formData.email) {
        newErrors.email = 'Email обязателен!';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Неверный формат email!';
      }

      if (!formData.password) {
        newErrors.password = 'Пароль обязателен!';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Пароль должен быть не менее 6 символов!';
      }

      setErrors(newErrors);
      setIsDisabledBtn(Object.keys(newErrors).length > 0);
    }

    validateForm();
  }, [formData.email, formData.password]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('user-', '')]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await updateUser(id, formData);
      } else {
        await createUser(formData);
      }
      navigate('/users');
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="page">
      <form className="edit-form" onSubmit={handleSubmit}>
        <h2 className="page-title">{pageTitle}</h2>
        <div className="form-input">
          <label htmlFor="user-email">Email пользователя *</label>
          <input
            type="email"
            id="user-email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-input">
          <label htmlFor="user-password">Пароль *</label>
          <input
            type="password"
            id="user-password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-input">
          <label htmlFor="user-name">Имя пользователя</label>
          <input
            type="text"
            id="user-name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-input">
          <label htmlFor="user-contactPhone">Телефон пользователя</label>
          <input
            type="text"
            id="user-contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-input">
          <label htmlFor="user-role">Роль пользователя</label>
          <select id="user-role" value={formData.role} onChange={handleInputChange}>
            <option value={UserRole.ADMIN}>Админ</option>
            <option value={UserRole.MANAGER}>Менеджер</option>
            <option value={UserRole.CLIENT}>Клиент</option>
          </select>
        </div>

        <div className="ctrl-btns">
          <button type="submit" className="btn btn-success" disabled={isDisabledBtn || isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/users')} disabled={isLoading}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;