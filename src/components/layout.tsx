/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import Header from "./header"

const Content = styled.div`
  margin: 0 auto;
  padding: 0 1.5rem;
  max-width: 960px;
`

interface LayoutProps {
  pathname: string
  children: React.ReactNode
}

const Layout = ({ pathname, children }: LayoutProps) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Content>
        <Header pathname={pathname} />
        {children}
      </Content>
    )}
  />
)

export default Layout
