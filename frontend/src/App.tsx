import '@/App.css';
import { Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import AllHotels from '@/pages/AllHotels';
import Nav from '@/components/Nav';

function App() {
  return (
    <div className="site-container">
      <Header />
      <main className="main">
        <Nav />
        <Routes>
          <Route path="/hotels" Component={AllHotels} />
          <Route path="/" Component={AllHotels} />
        </Routes>
      </main>
    </div>
  );
}

export default App;