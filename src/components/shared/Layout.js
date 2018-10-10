import React from 'react';
import styled from 'react-emotion';
import { push } from 'gatsby';
import CTA from '../CTA/CTA';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import SiteMetadata from './SiteMetadata';
import StoreContext, { defaultStoreContext } from '../../context/StoreContext';
import UserContext, {
  checkContributions,
  defaultUserContext,
  getDiscountCode
} from '../../context/UserContext';
import { logout, getUserInfo } from '../../utils/auth';
import { spacing } from '../../utils/styles';

// Import Futura PT typeface
import '../../fonts/futura-pt/Webfonts/futurapt_demi_macroman/stylesheet.css';

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
      handleGetDiscountCode: userData => {
        return async event => {
          try {
            event.preventDefault();
            this.setState(state => ({
              user: {
                ...state.user,
                isDiscountRequestActive: true
              }
            }));

            const results = await getDiscountCode(userData);

            this.setState(state => ({
              user: {
                ...state.user,
                isDiscountRequestActive: false,
                discount: results.data
              }
            }));
          } catch (err) {
            this.setState(state => ({
              user: {
                ...state.user,
                isDiscountRequestActive: false,
                discount: {
                  error: err.message,
                  discount_code: ''
                }
              }
            }));
          }
        };
      },
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
        client.checkout.removeLineItems(checkoutID, [lineItemID]).then(res => {
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

  componentDidMount() {
    getUserInfo().then(profile => {
      checkContributions(profile.nickname).then(contributions => {
        this.setState(state => ({
          user: { ...state.user, contributions, profile, loading: false }
        }));
      });
    });

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
      fetchCheckout(existingCheckoutID).then(checkout => {
        // Make sure this cart hasn’t already been purchased.
        if (!checkout.completedAt) {
          setCheckoutInState(checkout);
          return;
        }

        createNewCheckout().then(setCheckoutInState);
      });
    } else {
      createNewCheckout().then(setCheckoutInState);
    }
  }

  render() {
    return (
      <>
        <SiteMetadata />
        <UserContext.Provider value={this.state.user}>
          <StoreContext.Provider value={this.state.store}>
            <Header />
            {!this.state.user.profile.name && <CTA />}
            <Main>{this.props.children}</Main>
            <Footer
              displayAbout={
                this.props.location.pathname === '/' ||
                this.props.location.pathname === '/product-details'
              }
            />
          </StoreContext.Provider>
        </UserContext.Provider>
      </>
    );
  }
}
