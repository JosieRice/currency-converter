import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import perfectionist from "eslint-plugin-perfectionist";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      {
        languageOptions: {
          parserOptions: {
            project: ["./tsconfig.node.json", "./tsconfig.app.json"],
            // projectService: true,
            tsconfigRootDir: import.meta.dirname,
          },
        },
      },
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-objects": ["error", { type: "natural" }],
      "perfectionist/sort-interfaces": ["error", { type: "natural" }],
      "perfectionist/sort-object-types": ["error", { type: "natural" }],
      "perfectionist/sort-named-imports": ["error", { type: "natural" }],
      "perfectionist/sort-jsx-props": ["error", { type: "natural" }],
      "perfectionist/sort-imports": ["error", { type: "natural" }],
    },
    settings: {
      perfectionist: {
        type: "line-length",
        partitionByComment: true,
      },
    },
  },
]);
