import React from 'react';
import { Link } from 'gatsby';
import { withRouter } from 'react-router-dom';
import Auth from '../../../utils/auth';

const auth = new Auth();

export default withRouter(({ history }) => {
  let details;
  if (!auth.isAuthenticated()) {
    details = (
      <p>
        To get the full app experience, you’ll need to{' '}
        <Link to="/login">log in</Link>.
      </p>
    );
  } else {
    details = (
      <p>
        Logged in! TODO: add profile info{' '}
        <a
          href="/"
          onClick={event => {
            event.preventDefault();
            auth.logout(() => history.push('/'));
          }}
        >
          log out
        </a>
      </p>
    );
  }

  return <div>{details}</div>;
});
