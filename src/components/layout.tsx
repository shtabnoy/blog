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
import colors from "../utils/colors"

const Content = styled.div`
  margin: 0 auto;
  padding: 0 32px;
  max-width: 960px;
  box-sizing: border-box;

  &,
  input {
    font-family: "Quattrocento Sans", sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Work Sans", sans-serif;
  }

  h2 {
    font-size: 28px;
    font-weight: 600;
  }

  a {
    color: ${colors.mountainMeadow};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  p,
  ol {
    font-size: 20px;
    line-height: 28px;
    color: hsla(0, 0%, 0%, 0.8);
  }

  ol {
    padding: 0;
    margin-left: 28px;
    margin-bottom: 28px;
    margin-top: 0;
    li {
      margin-bottom: 14px;
    }
  }

  blockquote {
    font-style: italic;
    color: hsla(0, 0%, 0%, 0.65);
    border-left: 2px solid ${colors.mountainMeadow};
    margin: 0;
    padding-left: 20px;
  }
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
