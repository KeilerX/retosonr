import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ObservationsTable from './ObservationsTable';
import { Redirect } from 'react-router-dom';
import { getObservations } from '../../store/actions/observationActions';

const Observation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getObservations());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <div className="items-centered">
        <p>Observaciones registrados</p>
      </div>
      <div><ObservationsTable /></div>
    </div >
  );
}

export default Observation;