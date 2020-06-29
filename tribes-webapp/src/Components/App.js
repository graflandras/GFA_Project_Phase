import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../Containers/LoginPage/LoginPage';
import MainPage from '../Containers/MainPage/MainPage';
import Register from '../Containers/RegisterPage/RegisterPage';
import SettingsPage from '../Containers/SettingsPage/SettingsPage';
import NotImplementedYet from '../Containers/NotImplementedYetPage/NotImplementedYetPage';
import requireAuthentication from '../Components/HOC/Authentication';
import MapPage from '../Containers/Map/MapPage';

const App = () => (
  <Switch>
    <Route exact path={['/', '/login']} component={LoginPage} />
    <Route path="/map" component={MapPage} />
    <Route path="/kingdom" component={requireAuthentication(MainPage)} />
    <Route path="/register" component={Register} />
    <Route path="/settings" component={requireAuthentication(SettingsPage)} />
    <Route component={NotImplementedYet} />
  </Switch>
);

export default App;
