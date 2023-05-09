import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import {
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  Button,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/userActions';
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
  withButton,
  className,
  uploadImage,
  history,
  staticContext,
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

  const handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    console.log(formData.get('image'));
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  const handleNav = () => {
    history.push(`/Profile/${title}`);
  };

  classes = isbackGround(backGround);
  return (
    <Card className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
        {withButton ? (
          <>
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <Button
              title="Change profile Pic"
              color="link"
              className="mb-2"
              onClick={handleEditPicture}
            >
              <Avatar
                src={avatar}
                size={avatarSize}
                className="mb-2 userPageImg"
              />
            </Button>
          </>
        ) : (
          <Button
            title="Change profile Pic"
            color="link"
            className="mb-2"
            onClick={handleNav}
          >
            <Avatar
              src={avatar}
              size={avatarSize}
              className="mb-2 userPageImg"
            />
          </Button>
        )}
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

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionsToProps = {
  uploadImage,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(UserCard),
);
