import React from 'react';
/* import PropTypes from 'utils/propTypes'; */
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Container,
  Label,
  Card,
  CardBody,
  CardText,
  /*   CardTitle, */
  CardHeader,
  Form,
  FormGroup,
  Input,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CurrencyInput from 'react-currency-input-field';

import Avatar from 'components/Avatar';
import OffersUi from '../utils/OffersUi';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { makeOffer } from '../redux/actions/dataActions';
import Typography from './Typography';

class MyOffersTable extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  render() {
    const {
      headers,
      RequestData,
      loggedInHanndle,
      UI: { loading },
      staticContext,
      makeOffer,
      history,
      ...restProps
    } = this.props;

    dayjs.extend(relativeTime);
    return (
      <Table responsive hover {...restProps}>
        <thead>
          <tr className="text-capitalize align-middle text-center">
            {headers.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RequestData.map(
            (
              { offerDescription, offerAmount, offerAccepted, createdAt },
              index,
            ) => (
              <tr key={index}>
                <td className="align-middle text-center">{offerDescription}</td>
                <td className="align-middle text-center">{offerAmount}</td>
                <td className="align-middle text-center">
                  {offerAccepted && (
                    <Typography className="text-money">
                      Offer has been accepted
                    </Typography>
                  )}
                  {!offerAccepted && (
                    <Typography className="text-secondary">
                      Waiting for response
                    </Typography>
                  )}
                </td>
                <td className="align-middle text-center">
                  {dayjs(createdAt).fromNow(true)}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    );
  }
}
/* 
ListingTable.propTypes = {
  headers: PropTypes.node,
  RequestData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      car: PropTypes.string,
      DateCreate: PropTypes.number,
      make: PropTypes.string,
    }),
  ),
}; */

MyOffersTable.defaultProps = {
  headers: [],
  RequestData: [],
};

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI,
});

export default withRouter(connect(mapStateToProps)(MyOffersTable));
