import React from 'react';
import styled, { injectGlobal, css } from 'react-emotion';
import ReactModal from 'react-modal';
import MdClose from 'react-icons/lib/md/close';
import SizeChartTable from './SizeChartTable';
import { button, colors, fonts } from '../../utils/styles';

injectGlobal`
  .ReactModal__Overlay {
    background-color: ${colors.lightest};
    z-index: 10000;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    min-width: 100%;
    overflow-y: auto;

    @media (min-width: 600px) {
      background-color: ${colors.lightest}95;
    }
  }

  .ReactModal__Overlay--after-open {
    overflow-y: auto;
  }

  .ReactModal__Overlay--before-close {
    overflow-y: hidden;
  }

  .ReactModal__Content {
    opacity: 0;
    transform: translate(0,-25%);
    transition: all .15s ease-out;

    border: 0;
    max-width: 640px;
    margin: 0 auto;
    position: absolute;
    background: ${colors.lightest};
    outline: none;
    padding: 20px;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;

    @media (min-width: 600px) {
      border-radius: 4px;
      box-shadow: 0 0 90px -24px ${colors.brand};
      top: 40px;
      left: 40px;
      right: 40px;
    }
  }
  
  .ReactModal__Content--after-open {
    opacity: 1;
    transition: all 150ms;
    transform: translate(0,0);
  }
  
  .ReactModal__Content--before-close {
    opacity: 0;
    transform: translate(0,-25%);
  }
`;

const headline = css`
  font-family: ${fonts.heading};
  font-weight: 500;
  line-height: 1.1;
  color: #000;
`;

const ModalCloseButton = styled('button')`
  border: 0;
  color: ${colors.brand};
  cursor: pointer;
  position: fixed;
  left: auto;
  top: 0;
  right: 0;
  height: 40px;
  width: 40px;
  background: rgb(224, 214, 235);
  font-size: 1.125rem;
  border-bottom-left-radius: 2px;

  :hover {
    background: ${colors.brand};
    color: ${colors.lightest};
  }

  @media (min-width: 600px) {
    border-top-right-radius: 2px;
    position: absolute;
  }
`;

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement(`#___gatsby`);
  }

  handleOpenModal() {
    document.querySelector(`html`).style.overflowY = `hidden`;
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    document.querySelector(`html`).style.overflowY = `auto`;
    this.setState({ showModal: false });
  }

  render() {
    return (
      <>
        <button
          onClick={this.handleOpenModal}
          style={{
            cursor: 'pointer',
            color: colors.brand,
            border: 0,
            background: 'transparent',
            fontSize: '1rem',
            padding: 0,
            marginTop: '1rem',
            borderBottom: `1px solid ${colors.brand}`
          }}
        >
          Care Instructions & Size Chart
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Care Instructions & Size Chart Modal"
          onRequestClose={this.handleCloseModal}
          closeTimeoutMS={150}
          className="ReactModal__Modal"
          overlayClassName="ReactModal__Overlay"
        >
          <h1
            className={headline}
            style={{
              color: colors.brand,
              fontWeight: 'bold',
              margin: 0,
              // make room for the close button
              paddingRight: 60
            }}
          >
            Care Instructions & Size Chart
          </h1>
          <h2 className={headline}>Care Instructions</h2>
          <h3 className={headline}>Socks</h3>
          <p>
            Keep those socks comfy on your feet and looking bright by washing
            them in cold water with darker colors. Tumble dry on low so they
            don't shrink!
          </p>
          <h3 className={headline}>T-Shirts</h3>
          <p>
            Machine wash cold and tumble dry only. These shirts can’t take the
            heat (literally)! We want to make sure you’re happy with our shirts,
            but they require a little TLC.
          </p>
          <h2 className={headline}>Size Chart</h2>
          <p>All measurements in inches (1 inch = 2.54 centimeters).</p>
          <SizeChartTable />
          <p>
            <strong style={{ color: colors.brand }}>
              Don't see your size?
            </strong>{' '}
            Send us an email team@gatsbyjs.com and we'll see if we can help!
          </p>
          <ModalCloseButton onClick={this.handleCloseModal}>
            <MdClose />
          </ModalCloseButton>
        </ReactModal>
      </>
    );
  }
}
