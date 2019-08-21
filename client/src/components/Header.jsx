import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../assets/img/brand/logo.svg';
import sygnet from '../assets/img/brand/sygnet.svg';
import { PROFILE_PATH, CHANGEPASSWORD_PATH } from '../constants/RouterConstants';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  uInfo: PropTypes.shape({}),
  onlineUsers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};


class Header extends Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
    this.onProfile = this.onProfile.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  componentWillMount() {
    this.setAvatar(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setAvatar(nextProps);
  }

  setAvatar(props) {
    this.avatar = 'no_avatar.gif';
    const { uInfo } = props;
    if (uInfo && uInfo.avatarName) this.avatar = uInfo.avatarName;
  }

  onProfile(e) {
    const { navigateTo } = this.props;
    navigateTo({
      keys: {},
      path: PROFILE_PATH,
      options: {},
    });
  }

  onChangePassword(e) {
    const { navigateTo } = this.props;
    navigateTo({
      keys: {},
      path: CHANGEPASSWORD_PATH,
      options: {},
    });
  }

  onLogout(e) {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { onlineUsers, uInfo } = this.props;
    const onlineUserDOM = onlineUsers.map(user => (
      <img id={user.Id} src={'../../assets/img/avatars/' + user.avatarName} className="img-avatar img-avatar-border" alt={user.username} title={user.username} key={user.username} />
    ));

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'GroupChat Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'GroupChat Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        {onlineUserDOM}
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              {uInfo ? uInfo.username : ''}
              <img src={'../../assets/img/avatars/' + this.avatar} className="img-avatar" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={this.onProfile}><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem onClick={this.onChangePassword}><i className="fa fa-key"></i> Change password</DropdownItem>
              <DropdownItem onClick={this.onLogout}><i className="fa fa-lock"></i> Sign out</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;

export default Header;