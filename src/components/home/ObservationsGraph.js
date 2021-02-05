import { useEffect } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Label, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';

const ObservationsGraph = () => {
  const data = useSelector((state) => state.details.observationDetails);

  useEffect(() => {
  }, [data]);

  return (
    <div>
      {data && (
        <div>
          <p>Observaciones totales</p>
          <BarChart width={450} height={280} data={data} margin={{
            top: 5, right: 20, left: 70, bottom: 5,
          }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="cantidad" allowDecimals={false} >
              <Label value="Cantidad" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis type="category" dataKey="nombre" label={{ value: 'Estados', angle: -90, position: 'left', offset: 60 }} />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </div>
      )}
    </div>
  );
}

export default ObservationsGraph;