module.exports = {
  siteMetadata: {
    siteUrl: 'https://store.gatsbyjs.org',
    title: 'Gatsby Store',
    description: 'Get Gatsby Swag!'
  },
  plugins: [
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-shopify2',
      options: {
        shopName: 'gatsby-swag',
        accessToken: '9aa73c089d34741f36edbe4d7314373a'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-lodash'
  ]
};
