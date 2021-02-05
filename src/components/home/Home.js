import { useEffect } from 'react';
import ObservationsEmployeeTable from './ObservationsEmployeeTable';
import ObservationsGraph from './ObservationsGraph';
import { useDispatch, useSelector } from 'react-redux';
import { getObservationsPerEmployee } from '../../store/actions/detailActions';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getObservationsPerEmployee());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div >
      <div className="half-left">
        <ObservationsEmployeeTable />
      </div>
      <div className="half-right">
        <ObservationsGraph />
      </div>

    </div>
  );
}

export default Home;