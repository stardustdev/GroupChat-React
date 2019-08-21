import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { LOGIN_PATH } from '../constants/RouterConstants';
import Link from '../components/Link';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const defaultProps = {

};

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  makeToast: PropTypes.func.isRequired,
};

class Signup extends Component {
  constructor() {
    super();
    this.onSignup = this.onSignup.bind(this);
    this.onAvatar = this.onAvatar.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
  }

  componentDidMount() {
    this.form = document.querySelector('#frm-signup');
    this.form.username.focus();
  }

  onSignup(e) {
    e.preventDefault();
    let { signup, makeToast } = this.props;
    if (this.form.password.value != this.form.confirm.value) makeToast({ message: 'Password does not confirm.' });
    signup(new FormData(this.form));
  }

  onAvatar(e) {
    this.form.fileAvatar.click();
  }

  onChangeAvatar(e) {
    var reader = new FileReader();

    reader.onload = e => {
      this.form.imgAvatar.src = e.target.result;
    }

    let chosenFile = e.target.files[0];
    if (!chosenFile.type.startsWith("image")) {
      e.target.value = '';
      makeToast({ message: 'Please choose image file.' });
      return;
    }
    reader.readAsDataURL(chosenFile);

    this.form.username.focus();
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form id="frm-signup" encType="multipart/form-data">
                    <h1>Register account</h1>
                    <p className="text-muted">Please create new account.</p>
                    <div className="text-center">
                      <img id="imgAvatar" src="../../assets/img/avatars/no_avatar.gif" className="img-avatar-big" onClick={this.onAvatar} />
                      <input id="fileAvatar" name="avatar" type="file" accept=".png,.jpg,.gif" hidden onChange={this.onChangeAvatar} />
                    </div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="username" name="username" type="text" placeholder="Username" required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input id="email" name="email" type="text" placeholder="Email" required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="password" name="password" type="password" placeholder="Password" required />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="confirm" type="password" placeholder="Confirm password" required />
                    </InputGroup>
                    <Row className="justify-content-center">
                      <Col md="6" lg="6" xl="6">
                        <Button type="submit" color="success" block onClick={this.onSignup}>Okay</Button>
                      </Col>
                      <Col md="6" lg="6" xl="6">
                        <Link navigateTo={this.props.navigateTo} path={LOGIN_PATH}>
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

Signup.defaultProps = defaultProps;
Signup.propTypes = propTypes;

export default Signup;
