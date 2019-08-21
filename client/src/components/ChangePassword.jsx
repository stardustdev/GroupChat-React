import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { INDEX_PATH } from '../constants/RouterConstants';
import Link from '../components/Link';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  makeToast: PropTypes.func.isRequired,
};

class ChangePassword extends Component {
  constructor() {
    super();
    this.onSave = this.onSave.bind(this);
    this.onChangeTextShow = this.onChangeTextShow.bind(this);
  }

  componentDidMount() {
    this.form = document.querySelector('#frm-changepwd');
    this.form.oldPwd.focus();
  }

  onChangeTextShow(e) {
    if (e.target.checked) {
      document.querySelectorAll("input[type=password]").forEach(el => {
        el.type = "text";
      });
    } else {
      document.querySelectorAll("input[type=text]").forEach(el => {
        el.type = "password";
      });
    }
  }

  onSave(e) {
    e.preventDefault();
    let { changePassword, makeToast } = this.props;

    let oldPwd = this.form.oldPwd;
    let newPwd = this.form.newPwd;
    let confirmPwd = this.form.confirmPwd;
    if (newPwd.value != confirmPwd.value) {
      makeToast({ message: 'New password does not match.' });
      newPwd.focus();
      return;
    }

    changePassword(oldPwd.value, newPwd.value);
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form id="frm-changepwd">
                    <h1>Change password</h1>
                    <p className="text-muted">Please change your password.</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="oldPwd" type="password" placeholder="Old password" required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="newPwd" type="password" placeholder="New password" required />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="confirmPwd" type="password" placeholder="Confirm password" required />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      Show Password
                      <AppSwitch className={'mx-1'} color={'danger'} onChange={this.onChangeTextShow} />
                    </InputGroup>
                    <Row className="justify-content-center">
                      <Col md="6" lg="6" xl="6">
                        <Button type="submit" color="success" block onClick={this.onSave}>Okay</Button>
                      </Col>
                      <Col md="6" lg="6" xl="6">
                        <Link navigateTo={this.props.navigateTo} path={INDEX_PATH}>
                          <Button color="cancel" block>Cancel</Button>
                        </Link>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ChangePassword.propTypes = propTypes;

export default ChangePassword;
