import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Markdown from "markdown-to-jsx"
import * as MathJax from "@nteract/mathjax"
import { Article, Translation } from "../types"
import css from "@emotion/css"
import ArticleHeader from "../components/articleHeader"
import colors from "../utils/colors"
// import SEO from "../components/seo"

interface ArticlePageProps {
  data: {
    strapiArticle: Article
  }
  location: {
    pathname: string
  }
}

const defaultLang: string = "en"

const MathComponent = ({ children, inline }: any) => {
  return (
    <MathJax.Provider
      options={{
        styles: {
          ".MJXc-display": {
            color: `${colors.shakespeare}`,
            "font-size": "20px !important",
            "border-top": `1px solid ${colors.shakespeare} !important`,
            "border-bottom": `1px solid ${colors.shakespeare} !important`,
            padding: "15px 0px !important",
            outline: "none",
          },
          ".MathJax_CHTML": {
            color: `${colors.shakespeare}`,
            outline: "none",
          },
        },
      }}
    >
      <MathJax.Node inline={inline}>{children}</MathJax.Node>
    </MathJax.Provider>
  )
}

const md = css`
  p:first-child::first-letter {
    color: ${colors.mountainMeadow};
    font-size: 45px;
    line-height: 53px;
    float: left;
    padding-right: 0.5rem;
    font-family: serif;
  }
  p > img {
    margin-left: 50%;
    transform: translateX(-50%);
  }
`

const ArticlePage = ({
  data: { strapiArticle: article },
  location,
}: ArticlePageProps) => {
  const [language, setLanguage] = React.useState(defaultLang)
  const translation = article.translations.find(
    (tr: Translation) => tr.language === language
  )
  const languages = article.translations.map((tr: Translation) => tr.language)
  return (
    <Layout pathname={location.pathname}>
      <ArticleHeader
        id={article.id}
        title={translation.title}
        categories={article.categories}
        author={article.author}
        published={article.published}
        languages={languages}
      />
      <Markdown
        css={md}
        options={{
          overrides: {
            Math: {
              component: MathComponent,
            },
          },
        }}
      >
        {translation.content}
      </Markdown>
    </Layout>
  )
}

export default ArticlePage

export const query = graphql`
  query($id: String!) {
    strapiArticle(id: { eq: $id }) {
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
`
