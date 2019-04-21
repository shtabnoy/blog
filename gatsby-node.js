/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      })
    )
  })

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const getArticles = makeRequest(
    graphql,
    `
      {
        allStrapiArticle {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  ).then(result => {
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve("src/pages/article.tsx"),
        context: {
          id: node.id,
        },
      })
    })
  })

  const getAuthors = makeRequest(
    graphql,
    `
      {
        allStrapiUser {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  ).then(result => {
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `authors/${node.id}`,
        component: path.resolve("src/pages/user.tsx"),
        context: {
          id: node.id,
        },
      })
    })
  })

  return Promise.all([getArticles, getAuthors])
}
