import summary from "rollup-plugin-summary";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";

export default {
  input: "my-element.js",
  output: {
    file: "dist/my-element.bundled.js", 
    format: "esm",
  },
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({ preventAssignment: false, "Reflect.decorate": "undefined" }),
    resolve(),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
    copy({
      targets: [
        { src: "index.html", dest: "_site" }, // ✅ copies index.html into _site
        { src: "assets/*", dest: "_site/assets" } // optional: static assets
      ]
    }),
  ],
};
