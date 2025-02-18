import { NavLink } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
  const navItems = [
    { label: 'Все гостиницы', link: '/hotels' },
    { label: 'Поиск номера', link: '/' },
    { label: 'Добавить гостиницу', link: '/hotels/add' },
    { label: 'Пользователи', link: '/users' }
  ];

  return (
    <nav className="nav">
      <ul className="nav__items">
        {navItems.map(({ label, link }) => (
          <li key={label} className="nav__item">
            <NavLink to={link}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;