import React, { useCallback, useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const perPage: number = 10;

  const getTotalCount = useCallback(
    async (query: string) => {
      try {
        const totalUsers = await getUsers(0, 0, query);
        setTotalPages(Math.ceil(totalUsers.length / perPage));
      } catch (error) {
        console.error('Error fetching total count: ', error);
      }
    },
    [perPage]
  );

  const loadUsers = useCallback(
    async (query: string, page: number) => {
      try {
        setIsLoading(true);
        const offset = (page - 1) * perPage;
        const data = await getUsers(perPage, offset, query);
        setUsers(data);
      } catch (error) {
        console.error('Error loading users: ', error);
      } finally {
        setIsLoading(false);
      }
    },
    [perPage]
  );

  useEffect(() => {
    getTotalCount(searchQuery);
    loadUsers(searchQuery, page);
  }, [page, searchQuery, getTotalCount, loadUsers]);

  const handleUsersSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <div className="page">
      <div className="users-page">
        <UsersSearchForm onSearch={handleUsersSearch} />
        {isLoading ? <div className="loading">Загрузка...</div> : <UsersList users={users} />}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
};

export default UsersPage;