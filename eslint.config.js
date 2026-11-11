import js from "@eslint/js"
import vuePlugin from "eslint-plugin-vue"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import vueParser from "vue-eslint-parser"
import globals from "globals"

export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "books/.vuepress/artifacts/",
    ],
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.vue"],
    
    plugins: {
      "vue": vuePlugin,
      "@typescript-eslint": tsPlugin,
    },

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node16,
        process: 'readonly',
      },
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".vue"],
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      ...vuePlugin.configs["vue2-essential"].rules,
      ...tsPlugin.configs["recommended"].rules,
      
      "no-undef": "off", 
      // Custom VuePress Development Rule Comforts
      // "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-var-requires": "off",
      "vue/multi-word-component-names": "off",
    },
  },
]
