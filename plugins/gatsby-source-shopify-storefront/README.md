# gatsby-source-shopify-storefront

Source plugin for pulling product data into [Gatsby](https://github.com/gatsbyjs) from the [Shopify](https://www.shopify.com/) Storefront API.

## Install

`npm install --save gatsby-source-shopify-storefront`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-shopify-storefront',
    options: {
      // Your Shopify instance name (e.g. 'shopify-store-name',
      // if your shopify shop is located at https://shopify-store-name.myshopify.com/)
      siteName: 'shopify-store-name',
      // Your Shopify Storefront API access token
      // generated in the private apps section of your store admin.
      // Refer to Shopify's Storefront API Documentation for more information
      // https://help.shopify.com/api/storefront-api/getting-started
      accessToken: 'STOREFRONT_ACCESS_TOKEN'
    }
  }
];
```

### GraphQL query to get all products

```graphql
  allShopifyProducts {
    edges {
      node {
        id
        title
        description
        descriptionHtml
        variants {
          edges {
            node {
              id
              title
              price
              selectedOptions {
                name
                value
              }
            }
          }
        }
        images {
          edges {
            node {
              id
              src
            }
          }
        }
      }
    }
  }
```

## Site's `gatsby-node.js` example

If you wish to create Gatsby Pages for each Shopify product, you can modify your `gatsby-node.js`.

```javascript
const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Shopify graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== PAGES (SHOPIFY PRODUCTS) ====
    graphql(
      `
        {
          allShopifyProducts {
            edges {
              node {
                id
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create product pages.
        const pageTemplate = path.resolve('./src/templates/page.js');
        // We want to create a detailed page for each
        // lever node. We'll just use the ID for the slug.
        _.each(result.data.allShopifyProducts.edges, edge => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.id}/`,
            component: slash(pageTemplate),
            context: {
              id: edge.node.id
            }
          });
        });
      })
      // ==== END PAGES ====

      // resolve() must be called at the end so Gatsby knows that we're done adding pages.
      .then(resolve());
  });
};
```
