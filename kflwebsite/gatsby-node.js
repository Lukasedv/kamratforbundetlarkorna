const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.js')
  const Page = path.resolve('./src/templates/page.js')

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  const pageresult = await graphql(
    `
      {
        allContentfulPage {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  if (pageresult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      pageresult.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.nodes
  const pages = pageresult.data.allContentfulPage.nodes
  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }

  if (pages.length > 0) {
    pages.forEach((page, index) => {
      const previousPageSlug = index === 0 ? null : pages[index - 1].slug
      const nextPageSlug =
        index === pages.length - 1 ? null : pages[index + 1].slug

      createPage({
        path: `/${page.slug}/`,
        component: Page,
        context: {
          slug: page.slug,
          previousPageSlug,
          nextPageSlug,
        },
      })
    })
  }
}
