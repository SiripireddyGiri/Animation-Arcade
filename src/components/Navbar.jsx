import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import { ROUTES } from '../utils/constants';

const Navbar = ({ onLoginClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleAuthClick = () => {
        if (user) {
            if (logout()) {
                navigate(ROUTES.HOME);
            }
        } else {
            onLoginClick?.();
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo">
                    <Link to={ROUTES.HOME} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className="logo-text">Animation Arcade</span>
                    </Link>
                </div>
                <div className="nav-actions">
                    {user && (
                        <span className="nav-welcome-message">Welcome, {user.name}!</span>
                    )}
                    <button id="loginBtn" className="login-btn" onClick={handleAuthClick}>
                        {user ? `Logout (${user.name})` : 'Login'}
                    </button>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
