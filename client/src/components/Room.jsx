import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button, Modal, ModalBody, ModalFooter, ModalHeader, Badge } from 'reactstrap';

const propTypes = {
  setGroupFavorite: PropTypes.func.isRequired,
  openGroupAddDlg: PropTypes.func.isRequired,
  closeGroupAddDlg: PropTypes.func.isRequired,
  addNewGroup: PropTypes.func.isRequired,
  loadMessages: PropTypes.func.isRequired,
  currentGroupId: PropTypes.string,
  favoriteGroups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  normalGroups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isGroupAddDlgOpen: PropTypes.bool.isRequired
};

class Room extends Component {
  constructor() {
    super();
    this.onOpenGroupAddDlg = this.onOpenGroupAddDlg.bind(this);
    this.onCloseGroupAddDlg = this.onCloseGroupAddDlg.bind(this);
    this.onAddGroup = this.onAddGroup.bind(this);
    this.onGroupFavorite = this.onGroupFavorite.bind(this);
    this.onGroupUnfavorite = this.onGroupUnfavorite.bind(this);
    this.onLoadMessage = this.onLoadMessage.bind(this);
    this.onDashboard = this.onDashboard.bind(this);
  }

  onDashboard(e) {

  }

  onOpenGroupAddDlg(e) {
    const { openGroupAddDlg } = this.props;

    openGroupAddDlg();
  }

  onCloseGroupAddDlg(e) {
    const { closeGroupAddDlg } = this.props;

    closeGroupAddDlg();
  }

  onAddGroup(e) {
    const { addNewGroup } = this.props;
    let title = document.querySelector("#input-title").value;

    addNewGroup(title);
  }

  onGroupFavorite(group) {
    const { setGroupFavorite } = this.props;

    setGroupFavorite(1, group.Id);
  }

  onGroupUnfavorite(group) {
    const { setGroupFavorite } = this.props;

    setGroupFavorite(0, group.Id);
  }

  onLoadMessage(group) {
    const { loadMessages } = this.props;

    loadMessages(group.Id);
  }

  render() {
    const { favoriteGroups, normalGroups, currentGroupId } = this.props;

    let favoriteGroupJSX = favoriteGroups.map(group => {
      const badge = group.unread > 0 ? <Badge color="danger">{group.unread}</Badge> : '';
      return (
        <li className="nav-item" key={group.Id + '-' + group.unread}>
          <a className={'nav-link' + (group.Id == currentGroupId ? ' active' : '')} href="javascript:;" onClick={this.onLoadMessage.bind(this, group)}>
            <i className={'nav-icon' + (group.Id == currentGroupId ? ' icon-pencil' : ' fa fa-comments-o')}></i>
            {group.title}
            <div className="icon-panel float-right text-right">
              {badge}
              <i className="nav-icon fa fa-heart highlighted" onClick={this.onGroupUnfavorite.bind(this, group)}></i>
            </div>
          </a>
        </li>
      );
    });

    let normalGroupJSX = normalGroups.map(group => {
      const badge = group.unread > 0 ? <Badge color="danger">{group.unread}</Badge> : '';
      return (
        <li className="nav-item" key={group.Id + '-' + group.unread}>
          <a className={'nav-link' + (group.Id == currentGroupId ? ' active' : '')} href="javascript:;" onClick={this.onLoadMessage.bind(this, group)}>
            <i className={'nav-icon' + (group.Id == currentGroupId ? ' icon-pencil' : ' fa fa-comments-o')}></i>
            {group.title}
            <div className="icon-panel float-right text-right">
              {badge}
              <i className="nav-icon fa fa-heart highlightable" onClick={this.onGroupFavorite.bind(this, group)}></i>
            </div>
          </a>
        </li >
      );
    });

    return (
      <div className="scrollbar-container sidebar-nav ps ps-container ps--active-y" >
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="javascript:;" onClick={this.onDashboard}>
              <i className="nav-icon icon-speedometer"></i>
              Dashboard
            </a>
          </li>
          <li className="nav-title">Favorite</li>
          {favoriteGroupJSX}
          <li className="nav-title">Normal</li>
          {normalGroupJSX}
          <li className="mt-auto nav-item">
            <a href="javascript:;" rel="noopener" className="nav-link nav-link-danger" onClick={this.onOpenGroupAddDlg}>
              <i className="nav-icon icon-plus"></i>
              New group
            </a>
          </li>
        </ul>
        <Modal isOpen={this.props.isGroupAddDlgOpen} toggle={this.onCloseGroupAddDlg} className='modal-danger'>
          <ModalHeader>New group</ModalHeader>
          <ModalBody>
            <InputGroup className="mb-12">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="cui-people icons"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input id="input-title" ref="inputTitle" type="text" placeholder="Group name" required />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.onAddGroup}>Add</Button>
            <Button color="secondary" onClick={this.onCloseGroupAddDlg}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Room.propTypes = propTypes;

export default Room;