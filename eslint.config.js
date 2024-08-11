import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

const baseConfig = [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

export default [
  ...baseConfig.map(ruleErrorToWarn),
  // custom config
  {
    rules: {
      "@typescript-eslint/parameter-properties": "error",
    },
  },
];

function ruleErrorToWarn(rule) {
  if ("rules" in rule) {
    return {
      ...rule,
      rules: Object.fromEntries(
        Object.entries(rule.rules).map(([key, value]) => [
          key,
          value === "error" ? "warn" : value,
        ])
      ),
    };
  }

  return rule;
}
