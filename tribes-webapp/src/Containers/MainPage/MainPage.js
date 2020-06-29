import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Menu from '../../Components/Menu/Menu';
import Resource from '../../Components/Resources/resource';
import Buildings from '../../Components/Buildings/Buildings';
import Constructions from '../../Components/ConstructionLog/Constructions';
import Troops from '../Troops/Troops';
import BuildingDetailsContainer from '../BuildingDetails/BuildingDetailsContainer';
import Battlemap from '../Battle/Battle';
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import './MainPage.scss';

const MainPage = () => (
  <div className="loggedinhome">
    <Navbar />
    <div className="main-wrapper">
      <div className="homepage-container">
        <div className="upper">
          <Menu />
          <Resource />
        </div>
        <div className="bottom">
          <Route exact path="/kingdom/buildings" component={Buildings} />
          <Route path="/kingdom/troops" component={Troops} />
          <Route path="/kingdom/battle" component={Battlemap} />
          <Route path="/kingdom/leaderboard" component={LeaderBoard} />
          <Route path="/kingdom/buildings/:buildingId" component={BuildingDetailsContainer} />
        </div>
      </div>
      <div className="asideCon">
        <Constructions />
      </div>
    </div>
  </div>
);

export default MainPage;
