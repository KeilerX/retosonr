import { useSelector } from 'react-redux';

const UsersTable = () => {
  const users = useSelector((state) => state.users);

  const tableHeader = () => {
    let header = ['ID', 'Empleado'];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  return (
    <table className="table-style table-centered">
      <tbody>
        <tr>{tableHeader()}</tr>
        {users && users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nombre_usuario}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default UsersTable;