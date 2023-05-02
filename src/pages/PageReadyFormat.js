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
    } = this.props;
    return (
      <Page>
        <Container fluid>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <UserCard
                    title={handle}
                    subtitle={email}
                    date={dayjs(createdAt).format('YYYY/MM/DD')}
                    className="border-light"
                    avatar={imageUrl}
                  />
                </Col>
                <Col></Col>
              </Row>
            </CardBody>
          </Card>
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

export default connect(mapStateToProps, mapActionsToProps)(UserPage);
