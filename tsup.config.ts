import type { Options } from "tsup";

export const tsup: Options = {
  entry: ["src/**/*.ts", "!**/*.spec.ts"],
  format: "esm",
  platform: "node",
  target: "node22",
  clean: true,
  minify: true,
  env: {
    NODE_ENV: "production",
  },
};
