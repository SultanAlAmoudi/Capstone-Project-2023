import React from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import Page from '../components/Page';
import ProfileSkeleton from '../utils/ProfileSkeleton';
import StaticProfile from '../utils/StaticProfile';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class User extends React.Component {
  state = {
    profile: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    
    return (
      <Page>
        {console.log(this.state.profile)}
        {this.state.profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={this.state.profile} />
        )}
      </Page>
    );
  }
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserData })(User);
