import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import './popper.scss';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

const SimplePopover = ({ open, anchorEl, onClose, textContent, canAttack, handleAttack, attackEnemyResult }) => {
  return (
    <div>
      <Popover
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className="popper">
          <h4>Country name: {`${textContent.name}`}</h4>
          <h4>Country population: {`${textContent.population}`}</h4>
        </Typography>
        {canAttack ? <div className="popoverBtnContainer">
          <div>
            <button className="btn btn-danger btn-sm" onClick={handleAttack}>
              ATTACK
          </button>
          </div>
          {attackEnemyResult ? <div><h2>{attackEnemyResult}</h2></div> : null}
        </div> : null
        }
      </Popover>
    </div>
  );
}

export default withStyles(styles)(SimplePopover);