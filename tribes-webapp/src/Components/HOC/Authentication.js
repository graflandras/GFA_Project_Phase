import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { authUser } from '../../actions/actions';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      checkAndRedirect: PropTypes.func,
      authWrong: PropTypes.bool.isRequired,
      authUser: PropTypes.func,
    };

    static defaultProps = {
      checkAndRedirect: () => { },
      authUser: () => { },
    };

    componentWillMount() {
      this.checkAndRedirect();
    }
    componentWillUpdate(nextProps) {
      if (nextProps.authWrong) {
        this.props.history.push('/login');
      }
    }
    checkAndRedirect() {
      if (!this.props.isAuthenticated) {
        const token = localStorage.getItem('TOKEN');
        const { location } = this.props;
        const next = location.pathname + location.search;
        if (token) {
          this.props.authUser();
        } else {
          this.props.history.push(`/login?redirect=${next}`);
        }
      }
    }
    render() {
      return (
        <div>
          {this.props.isAuthenticated
            ? <Component {...this.props} />
            : null
          }
        </div>
      );
    }
  }

  requireAuthentication.propTypes = {
    Component: PropTypes.element,
  };

  const mapStateToProps = store => ({
    isAuthenticated: store.user.isAuthenticated,
    authWrong: store.user.authWrong,
  });

  const mapDispatchToProps = {
    authUser,
  };

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
}
