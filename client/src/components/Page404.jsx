import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { INDEX_PATH } from '../constants/RouterConstants';
import Link from './Link';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
};

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Not found!</h4>
                <p className="text-muted float-left">Page does not exist.</p>
              </div>
              <Link navigateTo={this.props.navigateTo} path={INDEX_PATH}>
                <Button color="cancel" block>Back</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Page404.propTypes = propTypes;

export default Page404;
