import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import Article, { Translation } from "../types/Article"
import ArticleHeader from "../components/articleHeader"

interface IndexPageProps {
  data: any // TODO: make proper interface
  location: {
    pathname: string
  }
}

const defaultLang: string = "en"

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    padding-top: 24px;
    p {
      font-size: 20px;
    }
  }
`

const IndexPage = ({ data, location }: IndexPageProps) => (
  <Layout pathname={location.pathname}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <List>
      {data.allStrapiArticle.edges.map(
        ({ node: article }: { node: Article }) => {
          const translation = article.translations.find(
            (tr: Translation) => tr.language === defaultLang
          )

          if (!translation) return

          const languages = article.translations.map(tr => tr.language)

          return (
            <li key={article.id}>
              <ArticleHeader
                id={article.id}
                title={translation.title}
                categories={article.categories}
                author={article.author}
                published={article.published}
                languages={languages}
              />
              <p>{translation.description}</p>
            </li>
          )
        }
      )}
    </List>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          published(formatString: "MMMM Do, YYYY")
          author {
            id
            fullName
          }
          categories {
            id
            name
          }
          translations {
            id
            language
            title
            description
            content
          }
        }
      }
    }
  }
`
