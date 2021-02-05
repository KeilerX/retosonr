import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ObservationModal from './ObservationModal';

const UsersTable = () => {
  const observations = useSelector((state) => state.observations);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [detalle, setDetalle] = useState('');
  const [type, setType] = useState('');

  const tableHeader = () => {
    let header = ['id', 'descripción', 'vim', 'estado', 'registrada por', 'actualizada por', 'acciones'];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const checkOption = (e) => {
    if (e.target.value === "Editar" || e.target.value === "Aceptar" || e.target.value === "Rechazar" || e.target.value === "Eliminar") {
      setType(e.target.value);
      setShowModal(true);
    }
  }

  useEffect(() => {
  }, [observations]);

  return (
    <div className="table-overflow">
      <table className="table-style table-centered" style={{ width: "900px" }}>
        <tbody>
          <tr>{tableHeader()}</tr>
          {observations && observations.map((observation) => (
            <tr key={observation.id}>
              <td>{observation.id}</td>
              <td>{observation.detalle}</td>
              <td>{observation.vim}</td>
              <td>{observation.estado}</td>
              <td>{observation.creado_por}</td>
              <td>{observation.actualizada_por}</td>
              <td>
                <select onChange={e => { setId(observation.id); setDetalle(observation.detalle); checkOption(e); }} >
                  <option value="Sin acciones" defaultValue="Sin acciones">Sin acciones</option>
                  <option value="Editar">Editar</option>
                  <option value="Aceptar">Aceptar</option>
                  <option value="Rechazar">Rechazar</option>
                  <option value="Eliminar">Eliminar</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ObservationModal showModal={showModal} setShowModal={setShowModal} type={type} id={id} detalleObs={detalle} />
      </div>
    </div>

  );

}

export default UsersTable;