import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import colors from "../utils/colors"
import { css } from "@emotion/core"
import Article from "../types/Article"

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
    padding: 24px 0;
    h2 {
      margin-top: 0;
      margin-bottom: 4px;
    }
    p {
      font-size: 20px;
    }
  }
`

const ALink = styled(Link)`
  color: ${colors.mountainMeadow};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const IndexPage = ({ data, location }: IndexPageProps) => (
  <Layout pathname={location.pathname}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <List>
      {data.allStrapiArticle.edges
        // .filter(({ node }) => Object.keys(selectedCategories)
        //     .every(category => node.categories.map(c => c.id).includes(category)))
        .map(({ node: article }: { node: Article }) => {
          console.log(article.translations)
          const translation = article.translations.find(
            (tr: any) => tr.language === defaultLang
          )

          if (!translation) return

          const languages = article.translations.map(tr => tr.language)
          // return translation.title.toLowerCase()
          //     .indexOf(searchtext.toLowerCase()) > -1 &&
          return (
            <li key={article.id}>
              {/* <ArticleHeader
                          article={article}
                          addCategoryToTheFilter={this.addCategoryToTheFilter}
                      /> */}
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 4px;
                `}
              >
                <h2>
                  <ALink to={article.id}>{translation.title}</ALink>
                </h2>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                  `}
                >
                  {article.categories.map(category => (
                    <span
                      key={category.id}
                      css={css`
                        font-size: 16px;
                        background-color: ${colors.shakespeare};
                        color: white;
                        padding: 2px 12px;
                        border-radius: 12px;
                        cursor: pointer;
                        white-space: nowrap;
                        &:not(:first-child) {
                          margin-left: 10px;
                        }
                      `}
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                `}
              >
                <div
                  css={css`
                    color: ${colors.mountainMeadow};
                  `}
                >
                  <ALink
                    to={article.author.id}
                    css={css`
                      margin-right: 16px;
                    `}
                  >
                    {article.author.fullName}
                  </ALink>
                  <span>{article.published}</span>
                </div>
                <div
                  css={css`
                    color: ${colors.shakespeare};
                  `}
                >
                  &#123; {languages.join(", ")} &#125;
                </div>
              </div>
              <p>{translation.description}</p>
            </li>
          )
        })}
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
