import React from 'react';
import PropTypes from 'utils/propTypes';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import { Button } from 'reactstrap';

const Avatar = ({
  rounded,
  circle,
  src,
  size,
  tag: Tag,
  className,
  style,
  history,
  userHandle,
  staticContext,
  ...restProps
}) => {
  const handleNav = () => {
    history.push(`/Profile/${userHandle}`);
  };
  const classes = classNames({ 'rounded-circle': circle, rounded }, className);
  return (
    <>
      {userHandle ? (
        <Button
          title={'Go to ' + userHandle + ' Profile page'}
          color="link"
          className="mb-2"
          onClick={handleNav}
        >
          <Tag
            src={src}
            style={{ width: size, height: size, ...style }}
            className={classes}
            {...restProps}
          />
        </Button>
      ) : (
        <Tag
          src={src}
          style={{ width: size, height: size, ...style }}
          className={classes}
          {...restProps}
        />
      )}
    </>
  );
};

Avatar.propTypes = {
  tag: PropTypes.component,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  style: PropTypes.object,
};

Avatar.defaultProps = {
  tag: 'img',
  rounded: false,
  circle: true,
  size: 40,
  src: 'https://firebasestorage.googleapis.com/v0/b/capstone-project-app-10682.appspot.com/o/no-img.png?alt=media',
  style: {},
};

export default withRouter(Avatar);
