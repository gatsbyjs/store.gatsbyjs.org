const createNodeHelpers = require('gatsby-node-helpers').default;

const {
  createNodeFactory,
  generateNodeId,
  generateTypeName
} = createNodeHelpers({ typePrefix: 'Shopify' });

const PRODUCT_TYPE = 'Product';
const PRODUCT_IMAGE_TYPE = 'ProductImage';
const PRODUCT_VARIANT_TYPE = 'ProductVariant';

exports.ProductNode = createNodeFactory(PRODUCT_TYPE, node => {
  if (node.variants) {
    const variants = node.variants.edges.map(edge =>
      generateNodeId(PRODUCT_VARIANT_TYPE, edge.node.id)
    );
    const images = node.images.edges.map(edge =>
      generateNodeId(PRODUCT_IMAGE_TYPE, edge.node.id)
    );

    node.children = [...variants, ...images];

    delete node.images;
    delete node.variants;
  }

  return node;
});

exports.ProductImageNode = createNodeFactory(PRODUCT_IMAGE_TYPE);

exports.ProductVariantNode = createNodeFactory(PRODUCT_VARIANT_TYPE);
