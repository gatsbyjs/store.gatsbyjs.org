import React from 'react';
import axios from 'axios';
import { getAccessToken } from '../utils/auth';

let contributions = {};
export const checkContributions = async username => {
  if (!contributions[username]) {
    const api = 'https://api.github.com';
    const endpoint = '/search/issues';
    const org = 'gatsbyjs';
    const query = `q=org:${org}+author:${username}+type:pr+is:merged`;

    const { data: { items = [], total_count } = {} } = await axios.get(
      `${api}${endpoint}?${query}`
    );

    contributions[username] = {
      count: total_count,
      issues: items
    };
  }

  return contributions[username];
};

export const getDiscountCode = async ({
  username,
  email,
  first_name,
  subscribe
}) => {
  const token = getAccessToken();
  const api = process.env.GATSBY_API;

  return await axios.post(
    `${api}/store/discount-code`,
    { username, email, first_name, subscribe },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const defaultUserContext = {
  loading: true,
  contributions: {
    count: 0,
    issues: []
  },
  discount: false,
  profile: {},
  isProfileOpen: false,
  handleGetDiscountCode: () => {},
  handleLogout: () => {},
  toggleProfile: () => {}
};

export default React.createContext(defaultUserContext);
