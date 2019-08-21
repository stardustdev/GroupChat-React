import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from '../components/Link';
import { SIGNUP_PATH } from '../constants/RouterConstants';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const defaultProps = {

};

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

class Login extends Component {
  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onLogin(e) {
    const { login } = this.props;
    const username = document.querySelector('#input-username').value;
    const password = document.querySelector('#input-password').value;
    login(username, password);
  }

  onKeyUp(e) {
    if (e.keyCode == 13) this.onLogin(e);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Please login to the system.</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="input-username" ref="inputUsername" type="text" placeholder="Username" required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input id="input-password" ref="inputPassword" type="password" placeholder="Password" required onKeyUp={this.onKeyUp} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.onLogin}>Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Register account</h2>
                      <p>This system supports group chat.<br />Please click on Register button to create an account.</p>
                      <Link navigateTo={this.props.navigateTo} path={SIGNUP_PATH}>
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.defaultProps = defaultProps;
Login.propTypes = propTypes;

export default Login;
