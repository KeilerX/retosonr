import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import Vehicles from './components/vehicle/Vehicles';
import Users from './components/user/Users';
import Observations from './components/observation/Observations';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/vehicles"><Vehicles /></Route>
            <Route path="/users"><Users /></Route>
            <Route path="/observations"><Observations /></Route>
            <Route path="/login"><SignIn /></Route>
            <Route path="/signup"><SignUp /></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
