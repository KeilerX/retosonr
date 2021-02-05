import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ObservationsEmployeeTable = () => {
  const employeesObservations = useSelector((state) => state.details.employeesObservations);

  const renderTableHeader = () => {
    let header = ['empleado', 'registradas', 'aceptadas', 'rechazadas'];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  useEffect(() => {
  }, [employeesObservations]);

  return (
    <div>
      {employeesObservations && (
        <div>
          <p>Observaciones por empleado</p>
          <table className="table-style" >

            <tbody>
              <tr>{renderTableHeader()}</tr>
              {employeesObservations && employeesObservations.map((empObs) => (
                <tr key={empObs.id}>
                  <td>{empObs.nombre_usuario}</td>
                  <td>{empObs.registradas}</td>
                  <td>{empObs.aceptadas}</td>
                  <td>{empObs.rechazadas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>)
      }
    </div>
  );
}

export default ObservationsEmployeeTable;