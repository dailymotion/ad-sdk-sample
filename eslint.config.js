import js from "@eslint/js"
import globals from "globals"
import tseslint from 'typescript-eslint'
import css from "@eslint/css"
import {defineConfig} from "eslint/config"

export default defineConfig([
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,ts}"],
    plugins: {js},
    extends: ["js/recommended"],
    rules: {
      semi: ["error", "never"],
    },
  },
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {globals: globals.browser}
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["**/*.css"],
    plugins: {css},
    language: "css/css",
    extends: ["css/recommended"]
  },
])
