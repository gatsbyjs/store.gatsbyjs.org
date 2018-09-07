import React from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import { css } from 'react-emotion';
import { colors } from '../../utils/styles';

const bodyStyles = css`
  color: ${colors.text};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  margin: 0 auto;
  line-height: 1.375;
`;

export default () => (
  <StaticQuery
    query={graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            siteUrl
            title
            description
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: {
          siteUrl,
          title,
          description,
        },
      },
    }) => (
      <Helmet
        defaultTitle={title}
        titleTemplate={`%s · ${title}`}
      >
        <html lang="en" />
        <body className={bodyStyles} />

        <link rel="canonical" href={siteUrl} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#663399" />
        <meta name="msapplication-TileColor" content="#663399" />
        <meta name="theme-color" content="#663399" />

        <meta name="description" content={description} />

        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <meta name="twitter:site" content="@gatsbyjs" />
      </Helmet>
    )}
  />
)