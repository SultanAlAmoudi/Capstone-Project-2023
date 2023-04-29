import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import Typography from 'components/Typography';
import { connect } from 'react-redux';
import { loginUser, signupUser } from '../redux/actions/userActions';
import { withRouter } from 'react-router';

class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {},
    };
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmitLogin = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleSubmitSignup = event => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history.push);
  };
  render() {
    const {
      children,
      showLogo,
      onLogoClick,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <Form>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Insert your email!"
            type="email"
            invalid={errors.email ? true : false}
            onChange={this.handleChange}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Insert your password!"
            type="password"
            invalid={errors.password ? true : false}
            onChange={this.handleChange}
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Insert your Password again!"
              type="password"
              invalid={errors.confirmPassword ? true : false}
              onChange={this.handleChange}
            />
            <FormFeedback>{errors.confirmPassword}</FormFeedback>
          </FormGroup>
        )}
        {this.isSignup && (
          <FormGroup>
            <Label for="handle">Username</Label>
            <Input
              id="handle"
              name="handle"
              placeholder="Insert your Username!"
              type="handle"
              invalid={errors.handle ? true : false}
              onChange={this.handleChange}
            />
            <FormFeedback>{errors.handle}</FormFeedback>
          </FormGroup>
        )}
        {/*         <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup> */}
        <hr />
        {errors.general && (
          <Typography className="text-danger">{errors.general}</Typography>
        )}
        {this.isSignup && (
          <Button
            size="lg"
            className="bg-gradient-theme-left border-0"
            block
            onClick={this.handleSubmitSignup}
            disabled={loading}
          >
            {loading && <Spinner color="primary" />}
            {this.renderButtonText()}
          </Button>
        )}
        {this.isLogin && (
          <Button
            size="lg"
            className="bg-gradient-theme-left border-0"
            block
            onClick={this.handleSubmitLogin}
            disabled={loading}
          >
            {loading && <Spinner color="primary" />}
            {this.renderButtonText()}
          </Button>
        )}
        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  onLogoClick: PropTypes.func,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  onLogoClick: () => {},
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
  signupUser,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(AuthForm),
);
