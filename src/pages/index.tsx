import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import colors from "../utils/colors"
import { css } from "@emotion/core"

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
    }
    p {
      font-size: 20px;
    }
  }
`

const IndexPage = ({ data, location }: IndexPageProps) => (
  <Layout pathname={location.pathname}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <List>
      {data.allStrapiArticle.edges
        // .filter(({ node }) => Object.keys(selectedCategories)
        //     .every(category => node.categories.map(c => c.id).includes(category)))
        .map(({ node }: { node: any }) => {
          console.log(node.translations)
          const translation =
            node.translations.find((tr: any) => tr.language === defaultLang) ||
            {}

          // return translation.title.toLowerCase()
          //     .indexOf(searchtext.toLowerCase()) > -1 &&
          return (
            <li key={node.id}>
              {/* <ArticleHeader
                          article={node}
                          addCategoryToTheFilter={this.addCategoryToTheFilter}
                      /> */}
              <h2>
                <Link
                  to={node.id}
                  css={css`
                    color: ${colors.mountainMeadow};
                    text-decoration: none;
                    &:hover {
                      text-decoration: underline;
                    }
                    /* display: block; */
                  `}
                >
                  {translation.title}
                </Link>
              </h2>
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
