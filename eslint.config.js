import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default ts.config(
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },

      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      indent: [
        "error",
        2,
        {
          SwitchCase: 1
        }
      ],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: "off", // ts already handles this
      "no-console": 0,
      // Just for Interface method definitions
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^I[A-Z]",
          ignoreRestSiblings: true
        }
      ]
    }
  },
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  eslintConfigPrettier,
  ...svelte.configs["flat/prettier"],
  {
    files: ["**/*.svelte"],

    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    ignores: ["build/", ".svelte-kit/", "dist/"]
  }
);
