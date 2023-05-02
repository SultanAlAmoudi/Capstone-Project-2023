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
} from 'reactstrap';
import { UserCard } from 'components/Card';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

class UserPage extends React.Component {
  render() {
    const {
      user: {
        credentials: { handle, email, imageUrl, createdAt },
      },
      loading,
    } = this.props;
    return (
      <Page>
        <Row>
          <Col lg="4">
            <Row>
              <Col>
                {!loading ? (
                  <UserCard
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
                            <CardText>Full Name</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              Johnatan Smith
                            </CardText>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col sm="3">
                            <CardText>Email</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              example@example.com
                            </CardText>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col sm="3">
                            <CardText>Phone</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              (097) 234-5678
                            </CardText>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col sm="3">
                            <CardText>Mobile</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              (098) 765-4321
                            </CardText>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col sm="3">
                            <CardText>Address</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              Bay Area, San Francisco, CA
                            </CardText>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <>
                        <Row>
                          <Col sm="3">
                            <CardText>Full Name</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              ██████████████████
                            </CardText>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col sm="3">
                            <CardText>Email</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              ██████████████████
                            </CardText>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col sm="3">
                            <CardText>Phone</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              ██████████████████
                            </CardText>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col sm="3">
                            <CardText>Mobile</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              ██████████████████
                            </CardText>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col sm="3">
                            <CardText>Address</CardText>
                          </Col>
                          <Col sm="9">
                            <CardText className="text-muted">
                              ██████████████████
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
          <Col lg="8"></Col>
        </Row>
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

export default connect(mapStateToProps)(UserPage);
