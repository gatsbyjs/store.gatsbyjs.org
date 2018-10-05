import React from 'react';
import styled, { css } from 'react-emotion';
import Image from 'gatsby-image';
import { colors, radius, spacing } from '../../utils/styles';

const ImageBox = styled('div')`
  display: flex;

  > .gatsby-image-outer-wrapper {
    flex: 5 100%;
    width: 100%;
  }

  .gatsby-image-wrapper {
    width: 100%;
  }
`;

const PreviewWrapper = styled('div')`
  display: flex;
  margin-top: ${spacing.xs}px;
`;

const ImageLink = styled('a')`
  border: 2px solid transparent;
  border-radius: ${radius.default}px;
  box-sizing: border-box;
  display: block;
  flex: 1 40px;
  margin-right: ${spacing['3xs']}px;
  max-width: 40px;
  text-decoration: none;
  transition: 200ms border-color linear;

  img {
    border-radius: 1px;
  }

  &:focus,
  &:hover {
    background: ${colors.accent};
    border-color: ${colors.accent};
  }
`;

const selectedImage = css`
  background: ${colors.accent};
  border-color: ${colors.accent};
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
