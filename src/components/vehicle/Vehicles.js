import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VehiclesTable from './VehiclesTable';
import CreateVehicleModal from './CreateVehicleModal';
import { Redirect } from 'react-router-dom';
import { getVehicles } from '../../store/actions/vehicleActions';

const Vehicles = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <div className="items-centered">
        <CreateVehicleModal showModal={showModal} setShowModal={setShowModal} />
        <p>Vehículos registrados</p>
        <button onClick={() => setShowModal(true)}>+Nuevo</button>
      </div>
      <div><VehiclesTable /></div>
    </div >
  );
}

export default Vehicles;