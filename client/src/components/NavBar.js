import { Link } from 'react-router-dom';
import { logout } from '../lib/auth';

function NavBar({ user, onLogout }) {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  const loggedIn = Boolean(user);
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link className="navbar-item is-size-5" to="/">
          Jobssons 👩‍💻
        </Link>
      </div>
      {loggedIn ? (
        <div className="navbar-end">
          <span className="navbar-item is-transparent">
            {user.email}
          </span>
          <Link className="navbar-item is-transparent" to="/jobs/new">
            Create Job
          </Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="navbar-item is-transparent" onClick={handleLogout}>
            Log Out
          </a>
        </div>
      ) : (
        <div className="navbar-end">
          <Link className="navbar-item is-transparent" to="/login">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
