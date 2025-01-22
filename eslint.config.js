import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  prettier,
  ...svelte.configs["flat/prettier"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.svelte"],

    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    plugins: {
      "@stylistic/js": stylisticJs
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
      semi: ["error", "always"],
      "no-console": 0,
      // Just for interfaces
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^I[A-Z]",
          ignoreRestSiblings: true
        }
      ]
    }
  }
);
