import React from 'react';
import styled, { injectGlobal, css } from 'react-emotion';
import ReactModal from 'react-modal';
import MdClose from 'react-icons/lib/md/close';
import SizeChartTable from './SizeChartTable';
import { Heading, Subheading } from '../shared/Typography';
import { button, colors, fonts } from '../../utils/styles';

injectGlobal`
  .ReactModal__Overlay {
    background-color: ${colors.lightest};
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    min-width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

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

const SubSubheading = styled('h4')`
  font-family: ${fonts.heading};
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 0;
  color: #333;
`;

const ModalOpenButton = styled('button')`
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${colors.brand};
  color: ${colors.brand};
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0;
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
  background: ${colors.brandBright};
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
        <ModalOpenButton onClick={this.handleOpenModal}>
          Care Instructions & Size Chart
        </ModalOpenButton>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Care Instructions & Size Chart Modal"
          onRequestClose={this.handleCloseModal}
          closeTimeoutMS={150}
          className="ReactModal__Modal"
          overlayClassName="ReactModal__Overlay"
        >
          <div style={{ paddingRight: 60 }}>
            <Heading>Care Instructions & Size Chart</Heading>
          </div>
          <Subheading>Care Instructions</Subheading>
          <SubSubheading>Socks</SubSubheading>
          <p>
            Keep those socks comfy on your feet and looking bright by washing
            them in cold water with darker colors. Tumble dry on low so they
            don't shrink!
          </p>
          <SubSubheading>T-Shirts</SubSubheading>
          <p>
            Machine wash cold and tumble dry only. These shirts can’t take the
            heat (literally)! We want to make sure you’re happy with our shirts,
            but they require a little TLC.
          </p>
          <Subheading>Size Chart</Subheading>
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
