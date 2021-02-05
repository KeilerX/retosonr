import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersTable from './UsersTable';
import CreateUserModal from './CreateUserModal';
import { Redirect } from 'react-router-dom';
import { getUsers } from '../../store/actions/userActions';

const Users = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <div className="items-centered">
        <CreateUserModal showModal={showModal} setShowModal={setShowModal} />
        <p>Usuarios registrados</p>
        <button onClick={() => setShowModal(true)}>+Nuevo</button>
      </div>
      <div><UsersTable /></div>
    </div >
  );
}

export default Users;