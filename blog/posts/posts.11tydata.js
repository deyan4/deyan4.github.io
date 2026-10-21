module.exports = {
  layout: "blog.njk",
  tags: "posts",
  permalink: (data) => `/blog/${data.page.fileSlug}/`,
};
