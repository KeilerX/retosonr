import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateObservationModal from './CreateObservationModal';

const VehiclesTable = () => {
  const vehicles = useSelector((state) => state.vehicles);
  const [showModal, setShowModal] = useState(false);
  const [idvehiculo, setIdVehiculo] = useState(null);

  const tableHeader = () => {
    let header = ['id', 'vim', 'observaciones'];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  return (
    <table className="table-style table-centered">
      <tbody>
        <tr>{tableHeader()}</tr>
        {vehicles && vehicles.map((vehicle) => (
          <tr key={vehicle.id}>
            <td>{vehicle.id}</td>
            <td>{vehicle.vim}</td>
            <td><button onClick={() => { setShowModal(true); setIdVehiculo(vehicle.id); }} >+Agregar</button></td>
            <td style={{ display: "table-row", padding: "0" }}><CreateObservationModal showModal={showModal} setShowModal={setShowModal} idvehiculo={idvehiculo} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VehiclesTable;