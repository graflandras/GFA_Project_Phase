import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuItem from './MenuItems';
import Building from '../../images/buildings.svg';
import Leaderboard from '../../images/leaderboard.svg';
import Troops from '../../images/troops.svg';
import Battle from '../../images/battle.svg';
import './menu.scss';

class Menu extends Component {
  handleClick = (event) => {
    const { dataset } = event.target;
    this.props.history.push(`/kingdom/${dataset.name}`);
  }

  render = () => (
    <div className="menuContainer" onClick={this.handleClick} role="presentation">
      <MenuItem label="Buildings" imgsrc={Building} dataname="buildings" />
      <MenuItem label="Troops" imgsrc={Troops} dataname="troops" />
      <MenuItem label="Battle" imgsrc={Leaderboard} dataname="battle" />
      <MenuItem label="Leaderboard" imgsrc={Battle} dataname="leaderboard" />
    </div>
  )
}

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Menu);
