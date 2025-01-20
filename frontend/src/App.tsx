import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="site-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" Component={HomePage} />
        </Routes>
      </main>
    </div>
  );
}

export default App;