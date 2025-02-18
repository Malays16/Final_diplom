import React, { useEffect, useState } from 'react';
import UsersSearchForm from '@/components/UsersSearchForm';
import UsersList from '@/components/UsersList';
import Pagination from '@/components/Pagination';
import { User } from '@/types/user';
import { getUsers } from '@/services/users/usersService';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const perPage: number = 10;

  const getTotalCount = async (query: string) => {
    const totalUsers = await getUsers(0, 0, query);
    setTotalPages(Math.ceil(totalUsers.length / perPage));
  };

  useEffect(() => {
    loadUsers(searchQuery, page);
    getTotalCount(searchQuery);
  }, [page, getTotalCount]);

  const loadUsers = async (searchQuery: string = '', page: number = 1) => {
    const offset = (page - 1) * perPage;
    const data = await getUsers(perPage, offset, searchQuery);
    setUsers(data);
  };

  const handleUsersSearch = (query: string) => {
    setPage(1);
    setSearchQuery(query);
    loadUsers(query, page);
  };

  return (
    <div className="page">
      <div className="users-page">
        <UsersSearchForm onSearch={handleUsersSearch} />
        <UsersList users={users} />
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
};

export default UsersPage;