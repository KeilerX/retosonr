import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  const guestLinks = (
    <div className="links">
      <Link to="/login">Iniciar Sesión</Link>
      <Link to="/signup">Registrarse</Link>
    </div>
  );

  const loggedLinks = (
    <div className="links">
      <Link to="/users">Usuarios</Link>
      <Link to="/vehicles">Vehículos</Link>
      <Link to="/observations">Observaciones</Link>
      <Link to="" style={{ border: "1px solid", borderColor: "black", borderRadius: "8px" }} onClick={(e) => signout(e)}>Cerrar Sesión</Link>
    </div>
  );

  return (
    <nav className="navbar">
      <Link to="/">Página principal</Link>
      {isAuthenticated ? loggedLinks : guestLinks}
    </nav>
  );
}

export default Navbar;