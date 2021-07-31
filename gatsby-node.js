const path = require('path');

exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect }
}) => {
  const pages = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
          }
        }
      }
    }
  `);

  pages.data.allShopifyProduct.edges.forEach(edge => {
    createPage({
      path: `/product/${edge.node.handle}`,
      component: path.resolve('./src/templates/ProductPageTemplate.js'),
      context: {
        id: edge.node.id,
        handle: edge.node.handle
      }
    });
  });

  // Redirects for old product slugs.
  [
    {
      oldSlug: 'purple-logo-tee-w-natural-process-print',
      newSlug: 'vintage-purple-tee'
    },
    {
      oldSlug: 'copy-of-gatsby-full-zip-sweatshirt-horizontal-logo',
      newSlug: 'all-purple-everything-hoodie'
    },
    {
      oldSlug: 'gatsby-full-zip-sweatshirt',
      newSlug: 'all-purple-everything-hoodie-vertical'
    },
    { oldSlug: 'black-socks', newSlug: 'space-socks' },
    { oldSlug: 'dark-deploy-t-shirt', newSlug: 'dark-deploy-tee' },
    { oldSlug: 'gatsby-trucker-hat', newSlug: 'monogram-trucker-hat' },
    { oldSlug: 'gatsby-water-bottle', newSlug: '12oz-travel-mug' },
    { oldSlug: 'purple-gatsby-hat', newSlug: 'blazig-purple-hat' }
  ].map(({ oldSlug, newSlug }) => {
    const config = {
      toPath: `/product/${newSlug}`,
      isPermanent: true,
      redirectInBrowser: true
    };
    createRedirect({ fromPath: `/product/${oldSlug}`, ...config });
    createRedirect({ fromPath: `/product/${oldSlug}/`, ...config });
  });
};

exports.onCreatePage = async ({ page, actions: { createPage } }) => {
  /*
   * The dashboard (which lives under `/account`) is a client-only route. That
   * means that we don’t want to build it server-side because it depends on data
   * that we won’t have until a user logs in. By using `matchPath`, we’re able
   * to specify the entire `/account` path as a client-only section, which means
   * Gatsby will skip any `/account/*` pages during the build step.
   *
   * Take a look at `src/pages/account.js` for more details.
   */
  if (page.path.match(/^\/account/)) {
    page.matchPath = '/account/*';

    createPage(page);
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    /*
     * During the build step, `auth0-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};
