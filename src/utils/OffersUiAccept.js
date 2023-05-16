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
  Button,
  Label,
} from 'reactstrap';
import dayjs from 'dayjs';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { acceptOffer, getOffers } from '../redux/actions/dataActions';
import Avatar from '../components/Avatar';
import Typography from '../components/Typography';

class OffersUiAccept extends React.Component {
  state = {
    modal: false,
    offerModal: false,
    modalData: {},
    errors: {},
    FilteredItem: {},
    accepted: false,
  };
  componentWillMount() {
    this.props.getOffers(this.props.requestId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }

    let FilteredList = nextProps.data.offers.filter(
      offers => offers.offerAccepted === true,
    );
    if (FilteredList.length != 0)
      this.setState({
        accepted: true,
        FilteredItem: FilteredList[0],
      });
  }

  handleSubmit = (event, offerId) => {
    event.preventDefault();
    this.props.acceptOffer(this.props.requestId, offerId);
  };
  render() {
    const {
      data: { offers, dataloading },
      requestId,
      hasAccepted,
      UI: { errors, loading },
    } = this.props;
    return (
      <>
        {' '}
        {this.state.accepted ? (
          <ListGroup flush>
            {this.props.data.dataloading ? (
              <Spinner></Spinner>
            ) : this.props.data.offers.length === 0 ? (
              <>This request has no offers</>
            ) : (
              <ListGroupItem>
                <Media className="m-2">
                  <Media left className="mr-2 ">
                    <Avatar src={this.state.FilteredItem.userImage} />
                  </Media>
                  <Media left className="offerData">
                    <Media heading tag="h6" className="m-0">
                      {this.state.FilteredItem.userHandle}
                    </Media>
                    <p className="text-muted m-0">
                      <small>
                        {dayjs(this.state.FilteredItem.createdAt).fromNow(true)}
                      </small>
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
                      <Col>{this.state.FilteredItem.offerDescription}</Col>
                    </Row>
                  </Media>
                  <Media right className="align-self-center">
                    <Row>
                      <Col>
                        Offer Amount :
                        {
                          <Typography tag="h5" className="text-money">
                            {' '}
                            {this.state.FilteredItem.offerAmount}{' '}
                          </Typography>
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography tag="h5" className="text-money">
                          Offer Accepted
                        </Typography>
                      </Col>
                    </Row>
                  </Media>
                </Media>
              </ListGroupItem>
            )}
          </ListGroup>
        ) : (
          <ListGroup flush>
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
                            Offer Amount :
                            {
                              <Typography tag="h5" className="text-money">
                                {' '}
                                {offerAmount}{' '}
                              </Typography>
                            }
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button
                              onClick={e => {
                                this.handleSubmit(
                                  e,
                                  this.props.data.offers[index].offerId,
                                );
                              }}
                              color="success"
                            >
                              {this.props.UI.loading && (
                                <Spinner color="primary"></Spinner>
                              )}
                              {!this.props.UI.loading && <>Accept Offer</>}
                            </Button>
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                  </ListGroupItem>
                ),
              )
            )}
          </ListGroup>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {
  acceptOffer,
  getOffers,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(OffersUiAccept),
);
