import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import { Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

import StarRatings from 'react-star-ratings';

import Avatar from '../Avatar';

const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  date,
  ratingValue,
  backGround,
  children,
  className,
  ...restProps
}) => {
  let classes = '';
  const isbackGround = backGround => {
    if (backGround) {
      return classNames('bg-gradient-theme', className);
    } else {
      return '';
    }
  };

  classes = isbackGround(backGround);
  console.log(classes);
  return (
    <Card className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
        <Avatar src={avatar} size={avatarSize} className="mb-2" />
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText>
          <small>Joined at {date}</small>
          <br />
          {ratingValue && (
            <StarRatings
              rating={ratingValue}
              starRatedColor="yellow"
              starEmptyColor="rgb(79, 62, 120)"
              numberOfStars={5}
              name="rating"
              starDimension="25px"
              starSpacing="0px"
            />
          )}
        </CardText>
      </CardBody>
      {children}
    </Card>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

UserCard.defaultProps = {
  avatarSize: 80,
};

export default UserCard;
