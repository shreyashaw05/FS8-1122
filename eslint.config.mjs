import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "src/generated/**/*",
      "**/generated/**/*", 
      "prisma/generated/**/*",
      "**/*.wasm.js",
      "**/wasm-engine-edge.js",
      "node_modules/**/*",
      ".next/**/*",
      "out/**/*",
      "build/**/*"
    ]
  },
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
       "@typescript-eslint/no-explicit-any": "off",
    }
  }
];

export default eslintConfig;