import React from 'react';
import Helmet from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';

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
        siteMetadata: { siteUrl, title, description }
      }
    }) => (
      <Helmet defaultTitle={title} titleTemplate={`%s · ${title}`}>
        <html lang="en" />

        <link rel="preconnect" href="https://gatsby-swag.myshopify.com" />
        <link rel="preconnect" href="https://api.gatsbyjs.org" />

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
        <meta property="og:site_name" content={title} />
        <meta property="og:description" content={description} />

        <meta
          property="og:image"
          content={`${siteUrl}/instagram-doraforscale.jpg`}
        />
        <meta
          property="og:image:alt"
          content="Gatsby Socks using Dora for scale."
        />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="686" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gatsbyjs" />
      </Helmet>
    )}
  />
);
