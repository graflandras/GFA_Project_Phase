import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './construction.scss';
import ConstructionIcon from './ConstructionIcon';
import { addPercentage, changeLog, removeBackLog, clearBacklog } from '../../actions/actions';
import ConstructionLogger from './ConstructionLogger';
import ConstructionBackLogger from './ConstructionBackLogger';

class Constructions extends Component {
  componentDidMount() {
    this.interval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  interval = () => setInterval(() => {
    this.progressWidthCalc();
    this.checkLog();
    this.checkLength();
  }, 1000);


  progressWidthCalc = () => {
    const { logs, addPercentage } = this.props;
    logs.forEach((item) => {
      const date = Date.now();
      const first = (date - item.started_at);
      const second = (item.finished_at - item.started_at);
      const percentage = Math.round((first / second) * 100);
      addPercentage(item._id, percentage);
    });
  }

  checkLog = () => {
    const { logs, changeLog } = this.props;
    logs.forEach((item) => {
      if (item.percentage >= 100) {
        changeLog(item._id);
      }
    });
  };

  checkLength = () => {
    const {
      logs, backlogs, clearBacklog, removeBackLog,
    } = this.props;
    if (logs.length >= 6) {
      clearBacklog();
    } else if ((logs.length + backlogs.length) > 6) {
      backlogs.forEach((item, index) => {
        const date = Date.now();
        if ((item.finished_at <= date) && (index > 6)) {
          removeBackLog(item._id);
        }
      });
    }
  }

  returnTimefromDate = date => (new Date(date).toTimeString().slice(0, 5));

  render = () => {
    const { logs, backlogs } = this.props;
    return (
      <div>
        <div className="conHeader">
          <ConstructionIcon />
          <h2>
            Construction log:
          </h2>
        </div>
        {logs.map((item, index) => {
          if (index < 6) {
            return (
              <ConstructionLogger
                type={item.type}
                level={item.level}
                finished={this.returnTimefromDate(item.finished_at)}
                id={item._id}
                percentage={item.percentage}
              />
            );
          } return false;
        },
        )}
        {backlogs.map((item, index) => {
          if (index < 6) {
            return (
              <ConstructionBackLogger
                type={item.type}
                finished={this.returnTimefromDate(item.finished_at)}
                id={999 + item._id}
              />
            );
          } return false;
        },
        )}
      </div>
    );
  }
}

Constructions.defaultProps = {
  logs: [],
  backlogs: [],
};

Constructions.propTypes = {
  logs: PropTypes.instanceOf(Array),
  backlogs: PropTypes.instanceOf(Array),
  addPercentage: PropTypes.func.isRequired,
  changeLog: PropTypes.func.isRequired,
  removeBackLog: PropTypes.func.isRequired,
  clearBacklog: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  logs: store.building.logs,
  backlogs: store.building.backlogs,
});

const mapDispatchToProps = {
  addPercentage,
  changeLog,
  removeBackLog,
  clearBacklog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Constructions);
