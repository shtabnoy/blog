import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Markdown from "markdown-to-jsx"
import * as MathJax from "@nteract/mathjax"
// import SEO from "../components/seo"
import { Translation } from "../types/Article"
import css from "@emotion/css"
import ArticleHeader from "../components/articleHeader"

interface ArticlePageProps {
  data: any // TODO: proper
  location: {
    pathname: string
  }
}

const defaultLang: string = "en"

const MathComponent = ({ children, inline }: any) => {
  console.log(children)
  return (
    <MathJax.Provider>
      {/* <MathJax.Context> */}
      <MathJax.Node inline={inline}>{children}</MathJax.Node>
      {/* </MathJax.Context> */}
    </MathJax.Provider>
  )
}

const md = css`
  p:first-child::first-letter {
    color: #1d9c81;
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
  // console.log(data)
  const [language, setLanguage] = React.useState(defaultLang)
  const translation = article.translations.find(
    (tr: Translation) => tr.language === language
  )
  const languages = article.translations.map((tr: Translation) => tr.language)
  console.log(translation.content)
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
        {/* {`...
sd

        <Math>x^2</Math>

        ...
        `} */}
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
