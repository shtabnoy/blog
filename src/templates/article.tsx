import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
// import SEO from "../components/seo"
import Article, { Translation } from "../types/Article"

interface ArticlePageProps {
  data: any // TODO: proper
  location: {
    pathname: string
  }
}

const defaultLang: string = "en"

const ArticlePage = ({
  data: { strapiArticle: article },
  location,
}: ArticlePageProps) => {
  // console.log(data)
  const [language, setLanguage] = React.useState(defaultLang)
  const translation = article.translations.find(
    (tr: Translation) => tr.language === language
  )
  return <Layout pathname={location.pathname}>{translation.content}</Layout>
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
