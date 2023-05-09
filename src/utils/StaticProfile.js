import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Media,
} from 'reactstrap';
import { UserCard } from 'components/Card';
import dayjs from 'dayjs';
import StarRatings from 'react-star-ratings';

import Avatar from '../components/Avatar';

class StaticProfile extends React.Component {
  render() {
    const {
      profile: {
        handle,
        email,
        createdAt,
        imageUrl,
        skills,
        mobile,
        location,
        pageDescription,
        pageTitle,
      },
    } = this.props;
    return (
      <Row>
        <Col lg="4">
          <Row>
            <Col>
              <UserCard
                title={handle}
                subtitle={email}
                date={dayjs(createdAt).format('YYYY/MM/DD')}
                avatar={imageUrl}
                avatarSize={150}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="mb-4">
                <CardBody>
                  <Row>
                    <Col sm="3">
                      <CardText>Mobile</CardText>
                    </Col>
                    <Col sm="9">
                      <CardText className="text-muted">{mobile}</CardText>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <CardText>Skills</CardText>
                    </Col>
                    <Col sm="9">
                      <CardText className="text-muted">{skills}</CardText>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <CardText>Location</CardText>
                    </Col>
                    <Col sm="9">
                      <CardText className="text-muted">{location}</CardText>
                    </Col>
                  </Row>
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
                  <CardTitle tag="h2">{pageTitle}</CardTitle>
                  {pageDescription}
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
                    <ListGroupItem></ListGroupItem>
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default StaticProfile;
