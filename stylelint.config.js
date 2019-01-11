module.exports = {
  processors: [`stylelint-processor-styled-components`],
  extends: [
    `stylelint-config-recommended`,
    `stylelint-config-styled-components`
  ],
  plugins: ['stylelint-order'],
  rules: {
    'no-descending-specificity': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [`webkit-font-smoothing`]
      }
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: [`/-styled-mixin/`]
      }
    ],
    'order/properties-alphabetical-order': [
      true,
      {
        disableFix: true
      }
    ]
  }
};
