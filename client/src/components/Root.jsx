import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Page404Container from '../containers/Page404Container';
import { Alert } from 'reactstrap';

const propTypes = {
  initRouter: PropTypes.func.isRequired,
  dismissToast: PropTypes.func.isRequired,
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
  router: PropTypes.shape({
    keys: PropTypes.shape({}),
    options: PropTypes.shape({}),
    path: PropTypes.string,
  }).isRequired,
  routes: PropTypes.shape({}).isRequired,
  toasts: PropTypes.arrayOf(PropTypes.shape({})),
};


class Root extends Component {
  constructor() {
    super();
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentWillMount() {
    const { initRouter, paths } = this.props;
    initRouter(paths);
  }

  onDismiss(item) {
    const { dismissToast } = this.props;

    dismissToast(item);
  }

  render() {
    const { router, routes, toasts } = this.props;

    if (router.route.path in routes) {
      const Component = routes[router.route.path];
      const toastDOM = toasts.map(item => (
        <Alert color="info" isOpen={true} toggle={this.onDismiss.bind(item)} className="toast-balloon" key={item.message}>
          {item.message}
        </Alert>
      ));
      return (
        <div>
          <Component />
          {toastDOM}
        </div>
      );
    }

    return <Page404Container />;
  }
}

Root.propTypes = propTypes;

export default Root;