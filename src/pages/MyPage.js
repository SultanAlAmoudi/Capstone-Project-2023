import React from 'react';
import Page from '../components/Page';
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Button,
  CardLink,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Spinner,
  Media,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { UserCard } from 'components/Card';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import Avatar from 'components/Avatar';
import withBadge from 'hocs/withBadge';
import { MdModeEdit } from 'react-icons/md';
import StarRatings from 'react-star-ratings';
import { editUserDetails } from '../redux/actions/userActions';

const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'danger',
})(Avatar);

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: 'No skills provided',
      mobile: 'No mobile number provided',
      location: 'No address provided',
      pageTitle: 'Page title',
      pageDescription: 'Page Description',
      editskills: false,
      editmobile: false,
      editlocation: false,
      editpageTitle: false,
      editpageDescription: false,
    };
  }

  handleEdit = (event, field) => {
    event.preventDefault();
    this.setState({
      ['edit' + field]: true,
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true,
      ['edit' + event.target.name]: false,
    });
    let tempname = event.target.name;
    let value = this.state[tempname];
    const UserData = {
      [event.target.name]: value,
    };
    this.props.editUserDetails(UserData);
  };

  render() {
    const {
      user: {
        credentials: {
          handle,
          email,
          imageUrl,
          createdAt,
          pageTitle,
          pageDescription,
          location,
          mobile,
          skills,
        },
      },
      loading,
    } = this.props;

    return (
      <Page>
        <Container>
          <Row>
            <Col lg="4">
              <Row>
                <Col>
                  {!loading ? (
                    <UserCard
                      withButton
                      title={handle}
                      subtitle={email}
                      date={dayjs(createdAt).format('YYYY/MM/DD')}
                      avatar={imageUrl}
                      avatarSize={150}
                    />
                  ) : (
                    <Spinner></Spinner>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className="mb-4">
                    <CardBody>
                      {!loading ? (
                        <>
                          <Row>
                            <Col sm="3">
                              <CardText>Mobile</CardText>
                            </Col>
                            <Col sm="9">
                              <InputGroup>
                                <Input
                                  name="mobile"
                                  id="mobile"
                                  placeholder={
                                    mobile ? mobile : this.state.mobile
                                  }
                                  plaintext={!this.state.editmobile}
                                  disabled={
                                    this.state.editmobile ? '' : 'disabled'
                                  }
                                  onChange={this.handleChange}
                                />
                                <InputGroupAddon addonType="append">
                                  <Button
                                    id="mobile"
                                    name="mobile"
                                    color={
                                      this.state.editmobile ? 'primary' : 'link'
                                    }
                                    onClick={
                                      !this.state.editmobile
                                        ? e => {
                                            this.handleEdit(e, 'mobile');
                                          }
                                        : e => {
                                            this.handleSubmit(e);
                                          }
                                    }
                                  >
                                    {!this.state.editmobile && (
                                      <MdModeEdit title="Edit mobile number" />
                                    )}
                                    {this.state.editmobile && <>Submit</>}
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col sm="3">
                              <CardText>Skills</CardText>
                            </Col>
                            <Col sm="9">
                              <InputGroup>
                                <Input
                                  name="skills"
                                  id="skills"
                                  placeholder={
                                    skills ? skills : this.state.skills
                                  }
                                  plaintext={!this.state.editskills}
                                  disabled={
                                    this.state.editskills ? '' : 'disabled'
                                  }
                                  onChange={this.handleChange}
                                />
                                <InputGroupAddon addonType="append">
                                  <Button
                                    id="skills"
                                    name="skills"
                                    color={
                                      this.state.editskills ? 'primary' : 'link'
                                    }
                                    onClick={
                                      !this.state.editskills
                                        ? e => {
                                            this.handleEdit(e, 'skills');
                                          }
                                        : e => {
                                            this.handleSubmit(e);
                                          }
                                    }
                                  >
                                    {!this.state.editskills && (
                                      <MdModeEdit title="Edit Skills" />
                                    )}
                                    {this.state.editskills && <>Submit</>}
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col sm="3">
                              <CardText>Location</CardText>
                            </Col>
                            <Col sm="9">
                              <InputGroup>
                                <Input
                                  name="location"
                                  id="location"
                                  placeholder={
                                    location ? location : this.state.location
                                  }
                                  plaintext={!this.state.editlocation}
                                  disabled={
                                    this.state.editlocation ? '' : 'disabled'
                                  }
                                  onChange={this.handleChange}
                                />

                                <InputGroupAddon addonType="append">
                                  <Button
                                    id="location"
                                    name="location"
                                    color={
                                      this.state.editlocation
                                        ? 'primary'
                                        : 'link'
                                    }
                                    onClick={
                                      !this.state.editlocation
                                        ? e => {
                                            this.handleEdit(e, 'location');
                                          }
                                        : e => {
                                            this.handleSubmit(e);
                                          }
                                    }
                                  >
                                    {!this.state.editlocation && (
                                      <MdModeEdit title="Edit this location" />
                                    )}
                                    {this.state.editlocation && <>Submit</>}
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <>
                          <Row>
                            <Col sm="3">
                              <CardText>Mobile</CardText>
                            </Col>
                            <Col sm="9">
                              <CardText className="text-muted">
                                {this.state.mobile}
                              </CardText>
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col sm="3">
                              <CardText>Skills</CardText>
                            </Col>
                            <Col sm="9">
                              <CardText className="text-muted">
                                {this.state.skills}
                              </CardText>
                            </Col>
                          </Row>
                          <hr />
                          <Row>
                            <Col sm="3">
                              <CardText>Location</CardText>
                            </Col>
                            <Col sm="9">
                              <CardText className="text-muted">
                                {this.state.location}
                              </CardText>
                            </Col>
                          </Row>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg="8">
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h2">
                        <InputGroup>
                          <Input
                            name="pageTitle"
                            id="pageTitle"
                            type="textarea"
                            placeholder={
                              pageTitle ? pageTitle : this.state.pageTitle
                            }
                            plaintext={!this.state.editpageTitle}
                            disabled={
                              this.state.editpageTitle ? '' : 'disabled'
                            }
                            onChange={this.handleChange}
                          />

                          <InputGroupAddon addonType="append">
                            <Button
                              id="pageTitle"
                              name="pageTitle"
                              color={
                                this.state.editpageTitle ? 'primary' : 'link'
                              }
                              onClick={
                                !this.state.editpageTitle
                                  ? e => {
                                      this.handleEdit(e, 'pageTitle');
                                    }
                                  : e => {
                                      this.handleSubmit(e);
                                    }
                              }
                            >
                              {!this.state.editpageTitle && (
                                <MdModeEdit title="Edit this page title" />
                              )}
                              {this.state.editpageTitle && <>Submit</>}
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </CardTitle>
                      {this.state.editpageDescription && (
                        <Input
                          type="textarea"
                          name="pageDescription"
                          id="pageDescription"
                          plaintext={!this.state.editpageDescription}
                          disabled={
                            this.state.editpageDescription ? '' : 'disabled'
                          }
                          onChange={this.handleChange}
                        />
                      )}

                      {!this.state.editpageDescription &&
                        (pageDescription ? (
                          <h7>{pageDescription}</h7>
                        ) : (
                          <h7>{this.state.pageDescription}</h7>
                        ))}
                      <Button
                        id="pageDescription"
                        name="pageDescription"
                        color={
                          this.state.editpageDescription ? 'primary' : 'link'
                        }
                        onClick={
                          !this.state.editpageDescription
                            ? e => {
                                this.handleEdit(e, 'pageDescription');
                              }
                            : e => {
                                this.handleSubmit(e);
                              }
                        }
                      >
                        {!this.state.editpageDescription && (
                          <MdModeEdit title="Edit this page description" />
                        )}
                        {this.state.editpageDescription && <>Submit</>}
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h2">Reviews</CardTitle>
                      <ListGroup flush>
                        <ListGroupItem>
                          <Media tag="h3" className="m-2">
                            Not implemented yet
                          </Media>
                        </ListGroupItem>
                      </ListGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

UserPage.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  editUserDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(UserPage);
