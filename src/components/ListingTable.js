import React from 'react';
import PropTypes from 'utils/propTypes';

import { Table, Button } from 'reactstrap';

import Avatar from 'components/Avatar';

import withBadge from 'hocs/withBadge';

const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'danger',
})(Avatar);

const ListingTable = ({ headers, RequestData, ...restProps }) => {
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
        {RequestData.map(({ avatar, car, jop, make, DateCreate }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <AvatarWithBadge src={avatar} />
            </td>
            <td className="align-middle text-center">{car}</td>
            <td className="align-middle text-center">{make}</td>
            <td className="align-middle text-center">{jop}</td>
            <td className="align-middle text-center">{DateCreate}</td>
            <td className="align-middle text-center">
              <Button color="primary"> Show Details </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
/* const ListingTable = ({ headers, RequestData, ...restProps }) => {
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {RequestData.map(({ avatar, car, make, jop, expectedOfferPrice }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <AvatarWithBadge src={avatar} />
            </td>
            <td className="align-middle text-center">{car}</td>
            <td className="align-middle text-center">{make}</td>
            <td className="align-middle text-center">{jop}</td>
            <td className="align-middle text-center">{expectedOfferPrice}</td>
            <td className="align-middle text-center"><Button color="primary">Details</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}; */

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
};

ListingTable.defaultProps = {
  headers: [],
  RequestData: [],
};

export default ListingTable;
