import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../../Components/Navbar/Navbar';
import './MapPage.scss';
import { getTakenCountries, saveKingdomToUser } from '../../actions/actions';
import Loading from '../../Components/Loading/Loading';

export class MapPage extends Component {
  componentDidMount() {
    this.props.getTakenCountries();
    console.log(this.takenCountries)
  }

   componentWillUpdate = (nextProps) => {
    if (nextProps.hasKingdom) {
      this.props.history.push('/kingdom/buildings');
    }
  } 

  handleClick = (geography) => {
    console.log(geography)
    const { currentKingdom } = this.props;
    const choosedKingdom = geography.properties.ISO_A3;
    this.props.saveKingdomToUser(currentKingdom, choosedKingdom);
  }

  render = () => (
    !this.props.takenCountries ?
      <div className="container">
        <Loading />
      </div> :
      <div className="map-container">
        <Navbar />
        <ComposableMap
          projectionConfig={{
            scale: 170,
            rotation: [-11, 0, 0],
          }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup center={[0, 0]} disablePanning>
            <Geographies geography="./world-50m.json">
              {(geographies, projection) => geographies.map(geography => ((this.props.takenCountries.includes(geography.properties.ISO_A3)) ? (
                <Geography
                  className="taken-country"
                  key={geography.properties.ISO_A3}
                  geography={geography}
                  projection={projection}
                />
               ) : (
                 <Geography
                   className="free-country"
                   key={geography.properties.ISO_A3}
                   onClick={this.handleClick}
                   geography={geography}
                   projection={projection}
                 />
            )))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
  )
}

MapPage.propTypes = {
  hasKingdom: PropTypes.bool.isRequired,
  currentKingdom: PropTypes.string,
  saveKingdomToUser: PropTypes.func.isRequired,
  getTakenCountries: PropTypes.func.isRequired,
  takenCountries: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

MapPage.defaultProps = {
  currentKingdom: '',
};

const mapStateToProps = store => ({
  takenCountries: store.user.takenCountries,
  isLoggedIn: store.user.isLoggedIn,
  currentKingdom: store.user.currentKingdom,
  hasKingdom: store.user.hasKingdom,
});

const mapDispatchToProps = {
  getTakenCountries,
  saveKingdomToUser,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapPage);
