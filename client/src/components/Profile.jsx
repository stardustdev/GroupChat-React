import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { INDEX_PATH } from '../constants/RouterConstants';
import Link from '../components/Link';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  makeToast: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
};

class Profile extends Component {
  constructor() {
    super();
    this.avatar = 'no_avatar.gif';
    this.onSave = this.onSave.bind(this);
    this.onAvatar = this.onAvatar.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
  }

  componentDidMount() {
    this.form = document.querySelector('#frm-profile');
    this.form.username.focus();
  }

  onSave(e) {
    e.preventDefault();
    let { updateProfile } = this.props;
    updateProfile(new FormData(this.form));
  }

  onAvatar(e) {
    this.form.fileAvatar.click();
  }

  onChangeAvatar(e) {
    const { makeToast } = this.props;
    var reader = new FileReader();

    reader.onload = e => {
      this.form.imgAvatar.src = e.target.result;
    }

    let chosenFile = e.target.files[0];
    if (!chosenFile.type.startsWith("image")) {
      e.target.value = '';
      makeToast({ message: 'Please choose image.' });
      return;
    }
    reader.readAsDataURL(chosenFile);

    this.form.username.focus();
  }

  render() {
    const { username, email, avatarName } = this.props.profile;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form id="frm-profile" encType="multipart/form-data">
                    <h1>Profile</h1>
                    <p className="text-muted">Please change your profile.</p>
                    <div className="text-center">
                      <img id="imgAvatar" src={'../../assets/img/avatars/' + avatarName} className="img-avatar-big" onClick={this.onAvatar} />
                      <input id="fileAvatar" name="avatar" type="file" accept=".png,.jpg,.gif" hidden onChange={this.onChangeAvatar} />
                    </div>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="username" name="username" type="text" defaultValue={username} placeholder="Username" required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input id="email" name="email" type="text" defaultValue={email} placeholder="Email" required />
                    </InputGroup>
                    <Row className="justify-content-center">
                      <Col md="6" lg="6" xl="6">
                        <Button type="submit" color="success" block onClick={this.onSave}>Save</Button>
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

Profile.propTypes = propTypes;

export default Profile;
