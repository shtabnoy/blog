import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

interface IndexPageProps {
  data: any // TODO: make proper interface
  location: {
    pathname: string
  }
}

const IndexPage = ({ data, location }: IndexPageProps) => (
  <Layout pathname={location.pathname}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <ul>
      {data.allStrapiArticle.edges.map((document: any) => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.title}</Link>
          </h2>
        </li>
      ))}
    </ul>
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
        }
      }
    }
  }
`
