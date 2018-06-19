const crypto = require('crypto');
const productQuery = require('./product-query');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const {
  ProductNode,
  ProductImageNode,
  ProductVariantNode
} = require('./nodes');

exports.sourceNodes = async (
  { actions: { createNode, touchNode }, store, cache },
  { siteName, accessToken }
) => {
  const client = require('graphql-client')({
    url: `https://${siteName}.myshopify.com/api/graphql`,
    headers: {
      'X-Shopify-Storefront-Access-Token': accessToken
    }
  });

  const response = await client.query(productQuery);

  if (
    response &&
    response.data &&
    response.data.shop &&
    response.data.shop.products &&
    response.data.shop.products.edges
  ) {
    await Promise.all(
      response.data.shop.products.edges.map(({ node }) => {
        const productNode = ProductNode(node);
        createNode(productNode);

        const createChildNode = fn => edge => {
          const node = fn(edge.node, { parent: productNode.id });
          createNode(node);
        };

        node.variants.edges.map(createChildNode(ProductVariantNode));

        return Promise.all(
          node.images.edges.map(async edge => {
            try {
              const image = edge.node;
              const fileNode = await createRemoteFileNode({
                url: image.src.split('?').shift(),
                store,
                cache,
                createNode,
                createNodeId: id => `Shopify__Image__${id}`
              });

              if (fileNode) {
                edge.node.localFile___NODE = fileNode.id;
              }
            } catch (e) {
              // Ignore errors.
              console.log(e);
            }

            createChildNode(ProductImageNode)(edge);
          })
        );
      })
    );
  }

  return;
};
