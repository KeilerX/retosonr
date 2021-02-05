import { useState, useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/actions/authActions';

const SignIn = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { nombre_usuario: nombreUsuario, password: password };
    dispatch(login(user));
  }

  useEffect(() => {

  }, [error]);

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h2 className="welcome">¡Bienvenido!</h2>
      <div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <p>Iniciar sesión</p>
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="nombreUsuario"
            required
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/signup"><button>Registrarse</button></Link>
          <button>Iniciar Sesión</button>
          {error && <div style={{ padding: "10px", color: "red" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default SignIn;