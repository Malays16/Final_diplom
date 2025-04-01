import React from 'react';
import './UsersList.scss';
import { UsersListProps } from '@/types/user';
import { Link } from 'react-router-dom';

const UsersList: React.FC<UsersListProps> = ({ users, deleteUser }) => {
  return (
    <div className="users-list">
      <table className="users-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Изменить</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => (
              <tr className="users-list-item" key={user.id}>
                <td>
                  <Link to={`/reservations/user/${user.id}`} title="Просмотр бронирований пользователя">{user.id}</Link>
                </td>
                <td>{user.name}</td>
                <td>{user.contactPhone}</td>
                <td>{user.email}</td>
                <td>
                  <Link className="users-item-edit" to={`/users/edit/${user.id}`} title="Редактировать пользователя">&#9998;</Link>
                </td>
                <td>
                  <div className="users-item-delete" title="Удалить пользователя" onClick={() => deleteUser(user.id)}>&#215;</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;