import { Link } from 'react-router-dom';
import './header.scss';

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">Logo</Link>
      <Link to="/login" className="login">Login</Link>
    </header>
  );
};