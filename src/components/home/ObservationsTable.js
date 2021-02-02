const ObservationsTable = ({ obsEmpleado }) => {

  const renderTableHeader = () => {
    let header = Object.keys(obsEmpleado[0]);
    const index = header.indexOf("id");
    header.splice(index, 1);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  return (
    <table className="table-observations-per-employee">
      <tbody>
        <tr>{renderTableHeader()}</tr>
        {obsEmpleado.map((obs) => (
          <tr key={obs.id}>
            <td>{obs.empleado}</td>
            <td>{obs.registradas}</td>
            <td>{obs.aceptadas}</td>
            <td>{obs.rechazadas}</td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}

export default ObservationsTable;