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
  Container,
} from 'reactstrap';
import { UserCard } from 'components/Card';
import dayjs from 'dayjs';
import StarRatings from 'react-star-ratings';

import Avatar from '../components/Avatar';

class ProfileSkeleton extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg="4">
            <Row>
              <Col>
                <UserCard
                  title="▓▓▓▓"
                  subtitle="████"
                  date={dayjs().format('YYYY/MM/DD')}
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
                        <CardText className="text-muted">██████</CardText>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <CardText>Skills</CardText>
                      </Col>
                      <Col sm="9">
                        <CardText className="text-muted">██████</CardText>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <CardText>Location</CardText>
                      </Col>
                      <Col sm="9">
                        <CardText className="text-muted">
                          ██████, █████
                        </CardText>
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
                    <CardTitle tag="h2">This user dose not exist</CardTitle>
                    ████████████
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileSkeleton;
