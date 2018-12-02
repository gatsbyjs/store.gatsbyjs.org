import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends Component {
  constructor(props) {
    super(props);
    if (typeof document !== `undefined`) {
      this.modal = document.createElement('div');
    }
    this.state = {
      mounted: false
    };
  }

  componentDidMount() {
    document.body.appendChild(this.modal);

    this.setState({
      mounted: true
    });
  }
  componentWillUnmount() {
    if (this.modal) {
      document.body.removeChild(this.modal);
    }
  }

  render() {
    return this.modal ? (
      ReactDOM.createPortal(
        this.state.mounted ? this.props.children : null,
        this.modal
      )
    ) : (
      <div />
    );
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired
};

export default Portal;
