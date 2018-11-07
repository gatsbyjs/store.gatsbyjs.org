import React from 'react';
import styled from 'react-emotion';
import { push } from 'gatsby';
import { GitHubIssueFragment } from '../Dashboard/IssueList';
import CTA from '../CTA/CTA';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import SiteMetadata from './SiteMetadata';
import { client } from '../../context/ApolloContext';
import StoreContext, { defaultStoreContext } from '../../context/StoreContext';
import UserContext, { defaultUserContext } from '../../context/UserContext';
import { logout, getUserInfo } from '../../utils/auth';
import { spacing } from '../../utils/styles';

// Import Futura PT typeface
import '../../fonts/futura-pt/Webfonts/futurapt_demi_macroman/stylesheet.css';
import gql from 'graphql-tag';

const Main = styled('main')`
  display: block;
  margin: 0 auto;
  max-width: 600px;
  padding: ${spacing.xl}px ${spacing.sm}px ${spacing['3xl']}px;
  position: relative;
`;

export default class Layout extends React.Component {
  state = {
    user: {
      ...defaultUserContext,
      handleLogout: () => {
        this.setState({ user: defaultUserContext });
        logout(() => push('/'));
      },
      toggleProfile: () => {
        this.setState(state => ({
          user: { ...state.user, isProfileOpen: !state.user.isProfileOpen },
          store: { ...state.store, isCartOpen: false }
        }));
      },
      hideProfile: () => {
        this.setState(state => ({
          user: { ...state.user, isProfileOpen: false }
        }));
      }
    },
    store: {
      ...defaultStoreContext,
      addVariantToCart: (variantId, quantity) => {
        if (variantId === '' || !quantity) {
          console.error('Both a size and quantity are required.');
          return;
        }

        this.setState(state => ({
          store: { ...state.store, isCartOpen: true }
        }));

        const { checkout, client } = this.state.store;
        const checkoutId = checkout.id;
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) }
        ];

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then(checkout => {
            this.setState(state => ({ store: { ...state.store, checkout } }));
          });
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        return client.checkout
          .removeLineItems(checkoutID, [lineItemID])
          .then(res => {
            this.setState(state => ({
              store: { ...state.store, checkout: res }
            }));
          });
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        const lineItemsToUpdate = [
          { id: lineItemID, quantity: parseInt(quantity, 10) }
        ];

        return client.checkout
          .updateLineItems(checkoutID, lineItemsToUpdate)
          .then(res => {
            this.setState(state => ({
              store: { ...state.store, checkout: res }
            }));
          });
      },
      toggleCart: () => {
        this.setState(state => ({
          store: { ...state.store, isCartOpen: !state.store.isCartOpen },
          user: { ...state.user, isProfileOpen: false }
        }));
      }
    }
  };

  async initializeCheckout() {
    // Check for an existing cart.
    const isBrowser = typeof window !== 'undefined';
    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null;

    const setCheckoutInState = checkout => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', checkout.id);
      }

      this.setState(state => ({
        store: {
          ...state.store,
          checkout
        }
      }));
    };

    const createNewCheckout = () => this.state.store.client.checkout.create();
    const fetchCheckout = id => this.state.store.client.checkout.fetch(id);

    if (existingCheckoutID) {
      const checkout = await fetchCheckout(existingCheckoutID);

      // Make sure this cart hasn’t already been purchased.
      if (!checkout.completedAt) {
        setCheckoutInState(checkout);
        return;
      }
    }

    const newCheckout = await createNewCheckout();
    setCheckoutInState(newCheckout);
  }

  async loadContributions(nickname = false) {
    if (!nickname) {
      this.setState(state => ({
        user: {
          ...state.user,
          contributions: { count: 0, issues: [] }
        }
      }));
    }

    const { data } = await client.query({
      query: gql`
        query($user: String!) {
          contributorInformation(githubUsername: $user) {
            totalContributions
            pullRequests {
              ...GitHubIssueFragment
            }
          }
        }
        ${GitHubIssueFragment}
      `,
      variables: { user: nickname }
    });

    this.setState(state => ({
      user: {
        ...state.user,
        contributions: {
          count: data.contributorInformation.totalContributions,
          issues: data.contributorInformation.pullRequests
        },
        loading: false
      }
    }));
  }

  async componentDidMount() {
    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout();

    // Load the user info from Auth0.
    const profile = await getUserInfo();

    // If logged in, load the user’s contributions from GitHub.
    this.loadContributions(profile.nickname);

    this.setState(state => ({
      user: {
        ...state.user,
        profile
      }
    }));
  }

  render() {
    const { children, location } = this.props;
    return (
      <>
        <SiteMetadata />
        <UserContext.Provider value={this.state.user}>
          <StoreContext.Provider value={this.state.store}>
            <Header />
            {!this.state.user.profile.name && <CTA />}
            <Main>{children}</Main>
            <Footer
              displayAbout={
                location.pathname === '/' ||
                location.pathname === '/product-details'
              }
            />
          </StoreContext.Provider>
        </UserContext.Provider>
      </>
    );
  }
}
