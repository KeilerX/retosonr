import { useState, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createObservation } from '../../store/actions/observationActions';
import { getObservations } from '../../store/actions/observationActions';

const CreateObservationModal = ({ showModal, setShowModal, idvehiculo }) => {

  const [detalle, setDetalle] = useState('');
  const creado_por = useSelector((state) => state.auth.user.userId);
  const dispatch = useDispatch();

  const clear = () => {
    setDetalle('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let idestado = 1;
    const observation = { detalle, creado_por, idvehiculo, idestado };
    dispatch(createObservation(observation));
    dispatch(getObservations());
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
              <label>Observación</label>
              <input
                type="text"
                name="detalle"
                required
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
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

export default CreateObservationModal;