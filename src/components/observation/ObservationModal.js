import { useState, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editObservation, updateStatusObservation, deleteObservation } from '../../store/actions/observationActions';

const ObservationModal = ({ showModal, setShowModal, type, id, detalleObs }) => {
  const actualizada_por = useSelector((state) => state.auth.user.userId);
  const dispatch = useDispatch();
  const [detalle, setDetalle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "Aceptar" || type === "Rechazar") {
      const idestado = type === "Aceptar" ? 2 : 3;
      const observation = { idestado, actualizada_por };
      dispatch(updateStatusObservation(observation, id));
      window.location.reload();
    } else if (type === "Editar") {
      const observation = { detalle, actualizada_por };
      dispatch(editObservation(observation, id));
      window.location.reload();
    } else if (type === "Eliminar") {
      dispatch(deleteObservation(id));
    }
    setShowModal(false);
  }
  return (
    <>
      {showModal &&
        (type === "Aceptar" ? (
          <div className="backdrop">
            <div className="modal">
              <p>Aceptación de observación {id}</p>
              <p>¿Estas seguro que deseas aceptar esta observación?</p>
              <form className="form" onSubmit={handleSubmit}>
                <button>Confirmar</button>
                <button onClick={() => setShowModal(false)}>Cancelar</button>
              </form>
            </div>
          </div>
        ) :
          (type === "Rechazar" ?
            (
              <div className="backdrop">
                <div className="modal">
                  <p>Rechazo de observación {id}</p>
                  <p>¿Estas seguro que deseas rechazar esta observación?</p>
                  <form className="form" onSubmit={handleSubmit}>
                    <button>Confirmar</button>
                    <button onClick={() => setShowModal(false)}>Cancelar</button>
                  </form>
                </div>
              </div>
            ) :
            (type === "Editar" ?
              (
                <div className="backdrop">
                  <div className="modal">
                    <p>Editar</p>
                    <form className="form" onSubmit={handleSubmit}>
                      <label>Observación {id}</label>
                      <input
                        type="text"
                        name="detalle"
                        required
                        value={detalle || detalleObs}
                        onChange={(e) => setDetalle(e.target.value)}
                      />
                      <button>Guardar</button>
                      <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </form>
                  </div>
                </div>
              ) :
              (
                <div className="backdrop">
                  <div className="modal">
                    <p>Eliminación observación {id}</p>
                    <p>¿Estas seguro que deseas eliminar esta observación?</p>
                    <form className="form" onSubmit={handleSubmit}>
                      <button>Confirmar</button>
                      <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </form>
                  </div>
                </div>
              )
            )
          )
        )
      }
    </>
  )
}

export default ObservationModal;