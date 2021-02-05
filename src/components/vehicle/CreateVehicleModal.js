import { useState, React } from 'react';
import { useDispatch } from 'react-redux';
import { createVehicle } from '../../store/actions/vehicleActions';

const CreateVehicleModal = ({ showModal, setShowModal }) => {
  const [vim, setVim] = useState('');
  const dispatch = useDispatch();

  const clear = () => {
    setVim('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vehicle = { vim };
    dispatch(createVehicle(vehicle));
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
              <label>VIM</label>
              <input
                type="text"
                name="vim"
                required
                value={vim}
                onChange={(e) => setVim(e.target.value)}
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

export default CreateVehicleModal;