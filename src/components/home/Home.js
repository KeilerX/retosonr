import { useState } from 'react';
import ObservationsTable from './ObservationsTable';

const Home = () => {
  const [obsEmpleado, setObsEmpleado] = useState([
    { id: 1, empleado: 'Felipe', registradas: 1, aceptadas: 2, rechazadas: 3 },
    { id: 2, empleado: 'Ricardo', registradas: 2, aceptadas: 3, rechazadas: 1 },
    { id: 3, empleado: 'Pablo', registradas: 1, aceptadas: 3, rechazadas: 2 },
    { id: 4, empleado: 'Giacomo', registradas: 3, aceptadas: 1, rechazadas: 2 },
    { id: 5, empleado: 'Carla', registradas: 2, aceptadas: 1, rechazadas: 3 },
  ])

  return (
    <div className="home">
      <h2 className="title-observations-per-employee">Observaciones por empleado</h2>
      <ObservationsTable obsEmpleado={obsEmpleado} />
    </div>
  );
}

export default Home;