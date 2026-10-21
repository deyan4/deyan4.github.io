module.exports = function (eleventyConfig) {
  eleventyConfig.ignores.add("index.html");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("rfc822", (d) => new Date(d).toUTCString());
  eleventyConfig.addFilter("latest", (posts, n) => [...posts].reverse().slice(0, n));

  return { markdownTemplateEngine: false, htmlTemplateEngine: false, dir: { input: ".", includes: "_includes", output: "_site" } };
};
