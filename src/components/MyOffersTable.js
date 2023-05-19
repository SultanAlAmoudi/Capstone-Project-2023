import React from 'react';
/* import PropTypes from 'utils/propTypes'; */
import { Table } from 'reactstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
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
      dispatch,
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
                    <h7 className="text-money">Offer has been accepted</h7>
                  )}
                  {!offerAccepted && (
                    <h7 className="text-secondary">Waiting for response</h7>
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
