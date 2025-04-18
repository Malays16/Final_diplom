import '@/styles/main.scss';
import { Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import AllHotels from '@/pages/AllHotels';
import Nav from '@/components/Nav';
import HotelDetail from '@/pages/HotelDetail';
import HotelEdit from '@/pages/HotelEdit';
import HotelRoomEdit from '@/pages/HotelRoomEdit';
import UsersPage from './pages/UsersPage';
import UserReservations from './pages/UserReservations';
import SupportChatPage from './pages/SupportChatPage';
import SupportRequestsPage from './pages/SupportRequestsPage';
import ProtectedRoute from './services/auth/ProtectedRoute';
import { UserRole, AuthUser } from './types/user';
import ClientChat from '@/components/Chat/ClientChat';
import { Nullable } from './types/common';
import RoomsSearchPage from './pages/RoomsSearchPage';
import RoomDetail from './pages/RoomDetail';
import UserEdit from './pages/UserEdit';
import { useEffect, useState } from 'react';

function App() {
  const [authUser, setAuthUser] = useState<Nullable<AuthUser>>(null);
  const [role, setRole] = useState<Nullable<UserRole>>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setAuthUser(parsedUser);
      setRole(parsedUser.role);
    }
  }, []);

  const isClientRole = authUser && role === UserRole.CLIENT;
  const isManagerRole = authUser && role === UserRole.MANAGER;
  const isAdminRole = authUser && role === UserRole.ADMIN;

  return (
    <div className="site-container">
      <Header />
      <main className="main">
        <Nav />
        <Routes>
          <Route path="/" element={<AllHotels />} />
          <Route path="/hotels" element={<AllHotels />} />
          <Route path="/hotels/:id" element={<HotelDetail user={authUser as AuthUser} />} />
          <Route
            path="/hotels/add"
            element={
              <ProtectedRoute userRole={UserRole.ADMIN}>
                <HotelEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotels/:id/edit"
            element={
              <ProtectedRoute userRole={UserRole.ADMIN}>
                <HotelEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotels/:hotelId/add-room"
            element={
              <ProtectedRoute userRole={UserRole.ADMIN}>
                <HotelRoomEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hotels/:hotelId/edit-room/:roomId"
            element={
              <ProtectedRoute userRole={UserRole.ADMIN}>
                <HotelRoomEdit />
              </ProtectedRoute>
            }
          />

          <Route path="/rooms" element={<RoomsSearchPage />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />

          <Route
            path="/users"
            element={
              <ProtectedRoute userRole={UserRole.MANAGER || UserRole.ADMIN}>
                {(isManagerRole || isAdminRole) && <UsersPage />}
              </ProtectedRoute>
            }
          />
          <Route path="/users/create" element={<UserEdit />} />
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute userRole={UserRole.MANAGER || UserRole.ADMIN}>
                {(isManagerRole || isAdminRole) && <UserEdit />}
              </ProtectedRoute>
            }
          />

          <Route path="/reservations/user/:userId" element={<UserReservations />} />

          <Route
            path="/support-requests"
            element={
              <ProtectedRoute userRole={UserRole.MANAGER}>
                {isManagerRole && <SupportRequestsPage />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/support-chat/:requestId"
            element={
              <ProtectedRoute userRole={UserRole.MANAGER}>
                {isManagerRole && <SupportChatPage user={authUser} />}
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {isClientRole && <ClientChat userId={authUser.id} />}
    </div>
  );
}

export default App;