import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResourceItem from './ResourceItem';
import Mine from '../../img/assets/mine.svg';
import Factory from '../../img/assets/farm.svg';
import Food from '../../img/icons/food-01.svg';
import Diamond from '../../img/icons/diamond-01.svg';
import { getResource, resourceUpdater } from '../../actions/actions';
import './resource.scss';

class Resource extends Component {
  componentWillMount = () => {
    this.props.getResource();
  }

  componentDidMount = () => {
    this.interval; // eslint-disable-line
  }


  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  interval = setInterval(() => {
    const {
      foodAmount, diamondAmount,
    } = this.props.resources;
    this.props.resourceUpdater(foodAmount, diamondAmount);
  }, 1000);

render = () => {
  const {
    foodAmount, foodGeneration, diamondAmount, diamondGeneration,
  } = this.props.resources;
  return (
    <div className="resourceContainer">
      <ResourceItem iconsrc={Mine} allResource={foodAmount} resourceCounter={foodGeneration} imgResourceType={Food} textColor="orange" />
      <ResourceItem
        iconsrc={Factory}
        allResource={diamondAmount}
        resourceCounter={diamondGeneration}
        imgResourceType={Diamond}
        textColor="green"
      />
    </div>
  );
}
}

Resource.propTypes = {
  resources: PropTypes.shape({
    foodAmount: PropTypes.number.isRequired,
    foodGeneration: PropTypes.number.isRequired,
    diamondAmount: PropTypes.number.isRequired,
    diamondGeneration: PropTypes.number.isRequired,
  }).isRequired,
  resourceUpdater: PropTypes.func.isRequired,
  getResource: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  resources: {
    foodAmount: store.resource.foodAmount,
    foodGeneration: store.resource.foodGeneration,
    diamondAmount: store.resource.diamondAmount,
    diamondGeneration: store.resource.diamondGeneration,
  },
});

const mapDispatchToProps = {
  getResource,
  resourceUpdater,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resource);
