import React from 'react';
import PropTypes from 'prop-types';

const ResourceItem = ({
  iconsrc, allResource, resourceCounter, imgResourceType, textColor,
}) => (
  <div className="resourceItem">
    <div className="iconBase">
      <img src={iconsrc} alt="" />
    </div>
    <div className="display">
      <div className="allResource">
        <h2>
          {allResource}
        </h2>
        <img src={imgResourceType} alt="" />
      </div>
      <p className={textColor}>
        {resourceCounter}/second
      </p>
    </div>
  </div>
);

ResourceItem.propTypes = {
  iconsrc: PropTypes.node.isRequired,
  allResource: PropTypes.node.isRequired,
  resourceCounter: PropTypes.node.isRequired,
  imgResourceType: PropTypes.node.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default ResourceItem;

