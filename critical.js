const critical = require("critical");

critical.generate({
  // Inline the generated critical-path CSS
  // - true generates HTML
  // - false generates CSS
  inline: true,

  // Your base directory
  base: "build/",

  // HTML source file
  src: "index.html",

  target: "index.html",

  dimensions: [
    { width: 1900, height: 900 },
    { width: 360, height: 640 },
  ],

  // Minify critical-path CSS when inlining
  minify: true,

  // Extract inlined styles from referenced stylesheets
  extract: true,

});
