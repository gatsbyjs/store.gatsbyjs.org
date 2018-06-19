module.exports = {
  siteMetadata: {
    title: 'Gatsby Store'
  },
  plugins: [
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-shopify-storefront',
      options: {
        siteName: 'gatsby-swag',
        accessToken: '9aa73c089d34741f36edbe4d7314373a'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion'
  ]
};
