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
import ProtectedRoute from './services/auth/ProtectedRoute';
import { UserRole } from './types/user';

function App() {
  return (
    <div className="site-container">
      <Header />
      <main className="main">
        <Nav />
        <Routes>
          <Route path="/hotels" Component={AllHotels} />
          <Route path="/hotels/:id" Component={HotelDetail} />
          <Route path="/" Component={AllHotels} />
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
          <Route
            path="/users"
            element={
              <ProtectedRoute userRole={UserRole.ADMIN}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations/user/:userId"
            element={
              <ProtectedRoute userRole={UserRole.ADMIN}>
                <UserReservations />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;