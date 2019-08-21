import PropTypes from 'prop-types';
import React, { Component, Suspense } from 'react';
import { Container } from 'reactstrap';
import * as CommonConstants from '../constants/CommonConstants';

import {
  AppHeader,
  AppSidebar,
  AppSidebarHeader,
  AppFooter,
} from '@coreui/react';

import {
  HeaderContainer,
  RoomContainer,
  ContentContainer,
  FooterContainer,
} from '../containers';

const propTypes = {
  initAuth: PropTypes.func.isRequired,
  initSignaling: PropTypes.func.isRequired,
};

class Home extends Component {
  componentWillMount() {
    const { initAuth, initSignaling } = this.props;
    initAuth();
    initSignaling(CommonConstants.SIGNALING_SERVER);
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense>
            <HeaderContainer />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <Suspense>
              <RoomContainer />
            </Suspense>
          </AppSidebar>
          <div className="main">
            <Container fluid className="container-full">
              <Suspense>
                <ContentContainer />
              </Suspense>
            </Container>
          </div>
        </div>
        <AppFooter>
          <Suspense>
            <FooterContainer />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
