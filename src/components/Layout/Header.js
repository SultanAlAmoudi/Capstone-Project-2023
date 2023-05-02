import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
/* import Notifications from 'components/Notifications'; */
import SearchInput from 'components/SearchInput';
/* import { notificationsData } from 'demos/header'; */
import PropTypes from 'prop-types';
/* import withBadge from 'hocs/withBadge'; */
import React from 'react';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdPersonPin,
  MdBeenhere,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  Spinner,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUser } from '../../redux/actions/userActions';
import dayjs from 'dayjs';

const bem = bn.create('header');

/* const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive); */

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  goLogin = () => {
    this.props.history.push('./login');
  };

  goSignup = () => {
    this.props.history.push('./signup');
  };

  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push('./login');
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    const {
      user: {
        credentials: { handle, email, imageUrl, createdAt },
        authenticated,
        loading,
      },
    } = this.props;
    /*    const { isNotificationConfirmed } = this.state; */

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          {/* <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
                  onClick={this.toggleNotificationPopover}
                />
              )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem> */}

          {!loading ? (
            authenticated ? (
              <NavItem>
                <NavLink id="Popover2">
                  <Avatar
                    onClick={this.toggleUserCardPopover}
                    className="can-click"
                    src={imageUrl}
                  />
                </NavLink>
                <Popover
                  placement="bottom-end"
                  isOpen={this.state.isOpenUserCardPopover}
                  toggle={this.toggleUserCardPopover}
                  target="Popover2"
                  className="p-0 border-0"
                  style={{ minWidth: 250 }}
                >
                  <PopoverBody className="p-0 border-light">
                    <UserCard
                      title={handle}
                      subtitle={email}
                      date={dayjs(createdAt).format('YYYY/MM/DD')}
                      className="border-light"
                      avatar={imageUrl}
                      avatarSize={100}
                      backGround={true}
                      inverse
                    >
                      <ListGroup flush>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <MdPersonPin /> Profile
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <MdBeenhere /> View my job listings
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <MdHelp /> Help
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                          onClick={this.handleLogout}
                        >
                          <MdExitToApp /> Signout
                        </ListGroupItem>
                      </ListGroup>
                    </UserCard>
                  </PopoverBody>
                </Popover>
              </NavItem>
            ) : (
              <NavItem>
                <Button
                  color="secondary"
                  onClick={this.goLogin}
                  className="cr-header-button"
                >
                  Log In
                </Button>

                <Button
                  size="lg"
                  onClick={this.goSignup}
                  className="bg-gradient-theme-left "
                >
                  Sign Up
                </Button>
              </NavItem>
            )
          ) : (
            <NavItem>
              <Spinner
                size="lg"
                className="cr-header-spinner"
                color="primary"
              />
            </NavItem>
          )}
          {/* <NavItem>
            <NavLink id="Popover2">
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title="Jane"
                  subtitle="jane@jane.com"
                  text="Welcome back jane"
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin /> Profile
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdBeenhere /> View my job listings
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdHelp /> Help
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdExitToApp /> Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem> */}
        </Nav>
      </Navbar>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  logoutUser,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Header));
