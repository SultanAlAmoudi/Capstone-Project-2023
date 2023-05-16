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
  Spinner,
  Label,
} from 'reactstrap';
import dayjs from 'dayjs';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getOffers } from '../redux/actions/dataActions';
import Avatar from '../components/Avatar';
import Typography from '../components/Typography';

class OffersUi extends React.Component {
  state = {
    modal: false,
    offerModal: false,
    modalData: {},
  };
  componentWillMount() {
    this.props.getOffers(this.props.requestId);
  }

  componentWillUnmount() {
    this.props.getOffers('ID');
  }
  render() {
    const {
      data: { offers, dataloading },
      requestId,
    } = this.props;
    return (
      <ListGroup flush>
        {console.log(this.props.data.dataloading)}
        {this.props.data.dataloading ? (
          <Spinner></Spinner>
        ) : this.props.data.offers.length === 0 ? (
          <>This request has no offers</>
        ) : (
          this.props.data.offers.map(
            (
              {
                userHandle,
                userImage,
                offerDescription,
                offerAmount,
                createdAt,
              },
              index,
            ) => (
              <ListGroupItem key={index}>
                <Media className="m-2">
                  <Media left className="mr-2 ">
                    <Avatar src={userImage} />
                  </Media>
                  <Media left className="offerData">
                    <Media heading tag="h6" className="m-0">
                      {userHandle}
                    </Media>
                    <p className="text-muted m-0">
                      <small>{dayjs(createdAt).fromNow(true)}</small>
                    </p>
                  </Media>
                  <Media body>
                    {' '}
                    <Row>
                      <Col>
                        <Label>Offer Description :</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>{offerDescription}</Col>
                    </Row>
                  </Media>
                  <Media right className="align-self-center">
                    <Row>
                      <Col>
                        {
                          <Typography tag="h5" className="text-money">
                            {' '}
                            {offerAmount}{' '}
                          </Typography>
                        }
                      </Col>
                    </Row>
                  </Media>
                </Media>
              </ListGroupItem>
            ),
          )
        )}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {
  getOffers,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(OffersUi),
);
