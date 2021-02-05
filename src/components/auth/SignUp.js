import { useState, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createUser } from '../../store/actions/userActions';
import { useHistory } from "react-router-dom";


const SignUp = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { nombre_usuario: nombreUsuario, password: password };
    dispatch(createUser(user));
    history.push('/login');
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h2 className="welcome">¡Bienvenido!</h2>
      <div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <p>Registrarse</p>
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
          <Link to="/login"><button>Iniciar Sesión</button></Link>
          <button>Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;