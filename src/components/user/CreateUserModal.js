import { useState, React } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/actions/userActions';

const CreateUserModel = ({ showModal, setShowModal }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const clear = () => {
    setNombreUsuario('');
    setPassword('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { nombre_usuario: nombreUsuario, password: password };
    dispatch(createUser(user));
    setShowModal(false);
    clear();
  }

  return (
    <>
      {showModal && (
        <div className="backdrop">
          <div className="modal">
            <p>Creación</p>
            <form className="form" onSubmit={handleSubmit}>
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
              <button>Guardar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateUserModel;