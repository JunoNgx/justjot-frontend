import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: [
            "postcss.config.cjs",
        ],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
    },
    {
        languageOptions: { globals: globals.browser },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        settings: {
            react: {
                "version": "detect",
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/no-unescaped-entities": [
                "warn",
                {
                    "forbid": [ ">", "}", "\""]
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
        },
    },
];
