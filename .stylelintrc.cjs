module.exports = {
  extends  : ['stylelint-config-standard-scss'],
  overrides: [
    {
      files       : ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files       : ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  /*
   * see https://github.com/stylelint/stylelint/blob/15.11.0/docs/user-guide/rules.md
   * see https://github.com/stylelint-scss/stylelint-scss/tree/v5.3.2
   */
  rules: {
    'declaration-property-value-no-unknown'      : true,
    'media-feature-name-value-no-unknown'        : true,
    'no-unknown-animations'                      : true,
    'selector-no-qualifying-type'                : true,
    'font-weight-notation'                       : 'named-where-possible',
    'color-function-notation'                    : 'legacy',
    'font-family-name-quotes'                    : 'always-unless-keyword',
    'scss/block-no-redundant-nesting'            : true,
    'scss/selector-no-redundant-nesting-selector': true,
    'at-rule-empty-line-before'                  : ['always',
      {ignore: ['first-nested'], ignoreAtRules: ['import']}],
    'no-invalid-position-at-import-rule': null,
    'no-empty-source'                   : null,
    'selector-pseudo-class-no-unknown'  : [true,
      {ignorePseudoClasses: ['deep']}],

    // formatting
    'indentation'                     : 2,
    'no-empty-first-line'             : true,
    'no-eol-whitespace'               : true,
    'no-extra-semicolons'             : true,
    'no-missing-end-of-source-newline': true,
    'color-hex-case'                  : 'upper',
    'unit-case'                       : 'lower',
    'property-case'                   : 'lower',
    'selector-pseudo-class-case'      : 'lower',
    'selector-pseudo-element-case'    : 'lower',
    'media-feature-name-case'         : 'lower',
    'at-rule-name-case'               : 'lower',
    'string-quotes'                   : 'double',
    'unicode-bom'                     : 'never',
  },
}
