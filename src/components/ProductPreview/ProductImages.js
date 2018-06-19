import React from 'react';
import styled, { css } from 'react-emotion';
import Image from 'gatsby-image';
import { colors } from '../../utils/styles';

const ImageBox = styled('div')`
  display: flex;

  > .gatsby-image-outer-wrapper {
    flex: 5 100%;
    width: 100%;
  }
`;

const PreviewWrapper = styled('div')`
  display: flex;
`;

const ImageLink = styled('a')`
  border: 2px solid transparent;
  box-sizing: border-box;
  display: block;
  flex: 1 58px;
  max-width: 58px;
  text-decoration: none;
  transition: 200ms border-color linear;

  &:focus,
  &:hover {
    border-color: ${colors.brand}40;
  }
`;

const selectedImage = css`
  border-color: ${colors.brand}22;
`;

export default class ProductImages extends React.Component {
  state = {
    currentImage: 0
  };

  handleImageClick(index) {
    return event => {
      event.preventDefault();
      this.setState({ currentImage: index });
    };
  }

  render() {
    const { alt, images } = this.props;
    const currentImage = images[this.state.currentImage];

    if (!currentImage) {
      return;
    }

    return (
      <>
        <ImageBox>
          <Image
            fluid={currentImage.localFile.childImageSharp.fluid}
            alt={alt}
          />
        </ImageBox>
        <PreviewWrapper>
          {images.map((image, index) => {
            return (
              <ImageLink
                key={image.id}
                className={
                  index === this.state.currentImage ? selectedImage : ''
                }
                onClick={this.handleImageClick(index)}
                href={image.localFile.childImageSharp.fluid.src}
              >
                <Image
                  fluid={image.localFile.childImageSharp.fluid}
                  alt={alt}
                />
              </ImageLink>
            );
          })}
        </PreviewWrapper>
      </>
    );
  }
}
