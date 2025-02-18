import React from 'react';
import './UsersList.scss';
import { UsersListProps } from '@/types/user';

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <div className="users-list">
      <table className="users-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => (
              <tr className="users-list-item" key={user.id}>
                <td>
                  <a href={`/reservations/user/${user.id}`}>{user.id}</a>
                </td>
                <td>{user.name}</td>
                <td>{user.contactPhone}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;