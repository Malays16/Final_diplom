import '@/styles/main.scss';
import { Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import AllHotels from '@/pages/AllHotels';
import Nav from '@/components/Nav';
import HotelDetail from '@/pages/HotelDetail';
import HotelEdit from '@/pages/HotelEdit';
import HotelRoomEdit from '@/pages/HotelRoomEdit';

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
          <Route path="/hotels/add" Component={HotelEdit} />
          <Route path="/hotels/:id/edit" Component={HotelEdit} />
          <Route path="/hotels/:hotelId/add-room" Component={HotelRoomEdit} />
          <Route path="/hotels/:hotelId/edit-room/:roomId" Component={HotelRoomEdit} />
        </Routes>
      </main>
    </div>
  );
}

export default App;