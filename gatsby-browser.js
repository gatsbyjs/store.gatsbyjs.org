import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './src/context/ApolloContext';
import { silentAuth } from './src/utils/auth';

class SessionCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  handleCheckSession = () => {
    this.setState({ loading: false });
  };

  componentDidMount() {
    silentAuth(this.handleCheckSession);
  }

  render() {
    return (
      this.state.loading === false && (
        <React.Fragment>{this.props.children}</React.Fragment>
      )
    );
  }
}

export const wrapRootElement = ({ element }) => (
  <SessionCheck>
    <ApolloProvider client={client}>{element}</ApolloProvider>
  </SessionCheck>
);
